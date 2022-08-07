const daotaoUrl = "https://daotao.vku.udn.vn";
const khmtUrl = "https://cs.vku.udn.vn/thong-bao";
const ktsUrl = "https://de.vku.udn.vn/thong-bao";

window.onload = () => {
    let listNotifies;
    chrome.storage.local.get(["listNotifies"], (data) => {
        listNotifies = data.listNotifies;

        initNavTab();
        initCurrentTab();
    });

    let currentTab = "dt";
    const listItemInTab = document.querySelector(".list-items-in-tab");
    const navTabs = document.querySelector(".nav-tabs");

    const initNavTab = () => {
        listNotifies.forEach((list) => {
            let name = convertSigToName(list.name);
            navTabs.innerHTML += `
                <li class="nav-item" >
                    <a href="#" class="nav-link fw-bold ${
                        currentTab === list.name && "nav-active active"
                    }" data-tab-name="${
                list.name
            }" style="color: #6C757D;">${name}</a>
                </li>
            `;
        });

        document.querySelectorAll(".nav-item").forEach((item) => {
            item.addEventListener("click", (e) => {
                onClickTab(e);
            });
        });
    };

    const initCurrentTab = () => {
        let listHtml = "";
        const currentList = listNotifies.find(
            (list) => list.name === currentTab
        );

        currentList.notifies.forEach((noty) => {
            listHtml += `
                <li class="list-group-item" style="cursor: pointer">
                    <span class="stretched-link"  data-path="https://daotao.vku.udn.vn${noty.href}"></span>
                    <p class="mb-0" style="color: #152536; font-weight: 600">
                        ${noty.title}
                    </p class='mb-0'>
                    <small style="color: #6C757D">${noty.date}</small>
                </li>
            `;
        });

        listItemInTab.innerHTML = listHtml;
        document.querySelectorAll(".list-group-item").forEach((item) => {
            item.addEventListener("click", (e) => {
                onClickNoty(e);
            });
        });
    };

    const onClickTab = (e) => {
        e.preventDefault();
        const tabName = e.target.dataset.tabName;

        document
            .querySelector(".nav-active")
            .classList.remove("nav-active", "active");
        e.target.classList.add("nav-active", "active");

        currentTab = tabName;

        initCurrentTab();
    };

    const onClickNoty = (e) => {
        const path = e.target.dataset.path;
        createNewTab(path);
    };
};

const createNewTab = (path) => {
    chrome.tabs.create({
        url: path,
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
    const parser = new DOMParser();
    const root = parser.parseFromString(html, "text/html");

    const lists = root.querySelectorAll(".item-list");
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

const getNotifiesFromKhmt = (html) => {
    const parser = new DOMParser();
    const root = parser.parseFromString(html, "text/html");

    const list = Array.from(root.querySelectorAll(".panel-default")).slice(
        0,
        10
    );

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
        name: "khmt",
        url: khmtUrl,
        notifies,
    };
};

const getNotifiesFromPage = (html, name, url) => {
    const parser = new DOMParser();
    const root = parser.parseFromString(html, "text/html");

    const list = Array.from(root.querySelectorAll(".panel-default")).slice(
        0,
        10
    );

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
