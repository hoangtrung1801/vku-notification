import { JSDOM } from "./jsdom.js";

const daotaoUrl = "https://daotao.vku.udn.vn";
const khmtUrl = "https://cs.vku.udn.vn/thong-bao";
const ktsUrl = "https://de.vku.udn.vn/thong-bao";

const showNotification = (title, message) => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "/images/vku-128.png",
        title,
        message,
    });
};

const convertSigToName = (name) => {
    switch (name) {
        case "ctsv":
            return "CTSV";
        case "dt":
            return "Đào tạo";
        case "khtc":
            return "Kế hoạch tài chính";
        case "ktdbcl":
            return "KT và ĐBCL";
        case "khmt":
            return "KHMT";
        case "kts":
            return "KTS và TMĐT";
        default:
            return;
    }
};

let firstInstall = true;

// Listener
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed");
    // chrome.tabs.create({
    //     url: chrome.runtime.getURL("about.html"),
    // });
    doCrawl();
});

chrome.alarms.create("crawl", {
    // 12h / 1 crawl
    periodInMinutes: 60 * 12,
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "crawl") {
        doCrawl();
    }
});

chrome.storage.onChanged.addListener((changed, areaName) => {
    if (changed.amountUnreadNotices) {
        const { newValue, oldValue } = changed.amountUnreadNotices;
        showUnreadNotices(!!newValue && newValue != 0 ? newValue : "");
    }
});

// function
const doCrawl = () => {
    fetchData().then((data) => {
        const listNotifies = getListNotifies(data);

        chrome.storage.local.get(["listNotifies"], (data) => {
            const diff = compareOldAndNewListNotices(
                data.listNotifies,
                listNotifies
            );

            console.log("diff", diff);
            if (diff.length > 0) {
                chrome.storage.local.set({ listNotifies });

                // show notifications
                diff.forEach((listNotices) => {
                    const title = `${convertSigToName(listNotices.name)} có ${
                        listNotices.diffNotifies.length
                    } thông báo mới!`;
                    const message = listNotices.diffNotifies
                        .map((x) => `+ ${x.title}`)
                        .join("\n");
                    if (!firstInstall) showNotification(title, message);
                });

                // save new notices
                // if it is first installing, then don't save new notices into local
                if (firstInstall) {
                    firstInstall = false;
                } else {
                    const newNotices = diff.reduce(
                        (prev, cur) => [
                            ...prev,
                            ...cur.diffNotifies.map((e) => e.href),
                        ],
                        []
                    );
                    chrome.storage.local.set({ newNotices });

                    // show badge
                    const amountNotices = diff.reduce(
                        (prev, cur) => prev + cur.diffNotifies.length,
                        0
                    );
                    chrome.storage.local.set({
                        amountUnreadNotices: amountNotices,
                    });
                }
            }
        });
    });
};

const compareOldAndNewListNotices = (oldListNotifies, newListNotifies) => {
    console.log(new Date().toISOString());
    console.log("old", oldListNotifies);
    console.log("new", newListNotifies);

    // oldListNotifies is empty
    if (!oldListNotifies)
        return newListNotifies.map(({ notifies, ...rest }) => ({
            ...rest,
            diffNotifies: notifies,
        }));

    const result = [];
    for (let i = 0; i < newListNotifies.length; i++) {
        if (
            JSON.stringify(oldListNotifies[i].notifies) !==
            JSON.stringify(newListNotifies[i].notifies)
        ) {
            const diffNotifies = newListNotifies[i].notifies.filter((x) => {
                return !oldListNotifies[i].notifies.some(
                    (y) => x.title === y.title
                );
            });

            // have diff notifies then push into result, otherwise don't push
            if (diffNotifies.length > 0) {
                const { notifies, ...rest } = newListNotifies[i];
                result.push({
                    ...rest,
                    diffNotifies: diffNotifies,
                });
            }
        }
    }

    return result;
};

const fetchData = async () => {
    const fetchFromUrl = (url) => fetch(url).then((res) => res.text());

    let data = {};
    await Promise.all([
        fetchFromUrl(daotaoUrl),
        fetchFromUrl(khmtUrl),
        // fetchFromUrl(ktsUrl),
    ]).then((result) => {
        data["daotao"] = result[0];
        data["khmt"] = result[1];
        // data["kts"] = result[2];
    });
    return data;
};

const getListNotifies = (data) => {
    /*
        daotao
            dt
            ctsv
            khtc
            ktdbcl
        khmt
    */
    let result = [];
    const rawDaotao = data["daotao"];
    result.push(...getListNotifiesFromDaotao(rawDaotao));

    const rawKhmt = data["khmt"];
    result.push(getNotifiesFromPage(rawKhmt, "khmt", khmtUrl));

    /*
        out: List[]

        List:
            name: string,
            url: string,
            noties: Notify[]

        Notify:
            title
            href
            date
    */
    return result;
};

const getListNotifiesFromDaotao = (html) => {
    // const parser = new DOMParser();
    // const root = parser.parseFromString(html, "text/html");
    const root = new JSDOM(html);

    const lists = root.window.document.querySelectorAll(".item-list");
    // DT -> lists[0]
    // KT DBCL -> lists[1]
    // CTSV -> lists[4]
    // KHTC -> lists[5]
    return [
        {
            name: "dt",
            url: daotaoUrl,
            notifies: getNotifiesFromDaotao(lists[0]),
        },
        {
            name: "ktdbcl",
            url: daotaoUrl,
            notifies: getNotifiesFromDaotao(lists[1]),
        },
        {
            name: "ctsv",
            url: daotaoUrl,
            notifies: getNotifiesFromDaotao(lists[4]),
        },
        {
            name: "khtc",
            url: daotaoUrl,
            notifies: getNotifiesFromDaotao(lists[5]),
        },
    ];
};

const getNotifiesFromDaotao = (root) => {
    const list = root.querySelectorAll("li");

    let result = [];
    list.forEach((item) => {
        const href = item.querySelector("a").getAttribute("href");
        const title = item.querySelector("a").textContent.trim();
        const date = item
            .querySelector("span")
            .textContent.trim()
            .slice(2)
            .replaceAll("-", "/");
        result.push({
            title,
            href: `${daotaoUrl}${href}`,
            date,
        });
    });

    return result;
};

const getNotifiesFromPage = (html, name, url) => {
    // const parser = new DOMParser();
    // const root = parser.parseFromString(html, "text/html");
    const root = new JSDOM(html);

    const list = Array.from(
        root.window.document.querySelectorAll(".panel-default")
    ).slice(0, 10);

    let notifies = [];
    list.forEach((item) => {
        const title = item.querySelector(".panel-heading").textContent.trim();
        const date = item
            .querySelector(".panel-body small")
            .textContent.trim()
            .slice(11)
            .replaceAll("-", "/");
        const href = item.querySelector("a").getAttribute("href");
        notifies.push({
            title,
            href,
            date,
        });
    });

    return {
        name,
        url,
        notifies,
    };
};

const showUnreadNotices = (amount) => {
    chrome.action.setBadgeBackgroundColor({ color: "#fdfd96" }, () => {
        chrome.action.setBadgeText({
            text: `${amount}`,
        });
    });
};
