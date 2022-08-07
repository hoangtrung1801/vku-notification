import { JSDOM } from "./jsdom.js";

const VKUUrls = [
    {
        name: "dt",
        url: "https://daotao.vku.udn.vn/vku-thong-bao-chung",
    },
    {
        name: "ktdbcl",
        url: "https://daotao.vku.udn.vn/vku-thong-bao-ktdbcl",
    },
    {
        name: "ctsv",
        url: "https://daotao.vku.udn.vn/vku-thong-bao-ctsv",
    },
    {
        name: "khtc",
        url: "https://daotao.vku.udn.vn/vku-thong-bao-khtc",
    },
];
const daotaoUrl = "https://daotao.vku.udn.vn";
const khmtUrl = "https://cs.vku.udn.vn/thong-bao";
const ktsUrl = "https://de.vku.udn.vn/thong-bao";

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed");

    fetchData().then((data) => {
        const listNotifies = getListNotifies(data);
        chrome.storage.local.set({ listNotifies });
    });
});

chrome.alarms.create("crawl", {
    periodInMinutes: 0.1,
    // periodInMinutes: 2,
});

chrome.alarms.onAlarm.addListener((alarm) => {
    // showNotification();
});

const showNotification = () => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "/images/vku.png",
        title: "notification",
        message: "this is a notification",
    });
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

    // const rawKts = data["kts"];
    // result.push(getNotifiesFromPage(rawKts, "kts", ktsUrl));

    /*
        out: List[]

        List:
            name: string,
            url: list.url,
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
            .querySelector(".panel-body > div")
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
