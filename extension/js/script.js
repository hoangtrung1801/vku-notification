const daotaoUrl = "https://daotao.vku.udn.vn";
const khmtUrl = "https://cs.vku.udn.vn/thong-bao";
const ktsUrl = "https://de.vku.udn.vn/thong-bao";

window.onload = () => {
    readUnreadNotices();
    let listNotifies;
    chrome.storage.local.get(["listNotifies"], (data) => {
        listNotifies = data.listNotifies;
        console.log(listNotifies);

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

        currentList.notifies.forEach((notice) => {
            listHtml += `
                <li class="list-group-item" style="cursor: pointer">
                    <span class="stretched-link"  data-path="${notice.href}"></span>
                    <p class="mb-0" style="color: #152536; font-weight: 600">
                        ${notice.title}
                    </p class='mb-0'>
                    <small style="color: #6C757D">${notice.date}</small>
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

const readUnreadNotices = () => {
    chrome.storage.local.set({ amountUnreadNotices: 0 });
};
