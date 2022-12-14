const daotaoUrl = "https://daotao.vku.udn.vn";
const khmtUrl = "https://cs.vku.udn.vn/thong-bao";
const ktsUrl = "https://de.vku.udn.vn/thong-bao";

window.onload = () => {
    const aboutButton = document.querySelector("#about-button");
    aboutButton.addEventListener("click", (e) => {
        e.preventDefault();
        createNewTab(chrome.runtime.getURL("about.html"));
    });

    readUnreadAmountNotices();
    let listNotifies, newNotices;
    chrome.storage.local.get(["listNotifies", "newNotices"], (data) => {
        listNotifies = data.listNotifies;
        newNotices = data.newNotices || [];

        if (!listNotifies) {
            waitUntilListNotifications();
        }

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
        const currentListId = listNotifies.findIndex(
            (list) => list.name === currentTab
        );
        const currentList = listNotifies[currentListId];

        currentList.notifies.forEach((notice) => {
            const isNew = newNotices.some((e) => e === notice.href);
            listHtml += `
                <li class="list-group-item" style="">
                    <p class="notice-title mb-0 position-relative" style="color: #152536; font-weight: 600">
                        <span class="stretched-link" style="cursor: pointer" data-path="${
                            notice.href
                        }"></span>
                        ${notice.title}
                        ${
                            isNew
                                ? `<span class="badge rounded-pill bg-danger" style="font-size: 0.6rem">M???I</span>`
                                : ""
                        }
                    </p class='mb-0'>
                    <div class="d-flex">
                            <small style="color: #6C757D">${notice.date}</small>
                        <!--
                        <small style="color: #6C757D" class="notice-read ms-3 d-flex">
                            ????nh d???u ???? ?????c ???
                            <span class="ms-1 d-flex align-items-center">
                                <svg  style="width: 16px; height: 16px; color: #6C757D" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="216 72 104 184 48 128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
                            </span>
                        </small>
                        -->
                    </div>
                </li>
            `;
        });

        listItemInTab.innerHTML = listHtml;
        document.querySelectorAll(".notice-title").forEach((item) => {
            item.addEventListener("click", (e) => {
                onClickNoty(e);
            });
        });

        document.querySelector("#see-all").addEventListener("click", (e) => {
            e.preventDefault();
            createNewTab(convertSigToUrl(currentList.name));
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
        newNotices = newNotices.filter((e) => e !== path);
        chrome.storage.local.set({ newNotices });
        createNewTab(path);
    };

    const waitUntilListNotifications = () => {
        document.querySelector(".list-items-in-tab").textContent =
            "Vui l??ng ?????i 5s sau ???? b???t l???i ????? extension c?? th??? t???i d??? li???u v???!";
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
            return "????o t???o";
        case "khtc":
            return "K??? ho???ch t??i ch??nh";
        case "ktdbcl":
            return "KT v?? ??BCL";
        case "khmt":
            return "KHMT";
        case "kts":
            return "KTS v?? TM??T";
        default:
            return;
    }
};

const convertSigToUrl = (name) => {
    switch (name) {
        case "ctsv":
            return "https://daotao.vku.udn.vn/vku-thong-bao-ctsv";
        case "dt":
            return "https://daotao.vku.udn.vn/vku-thong-bao-chung";
        case "khtc":
            return "https://daotao.vku.udn.vn/vku-thong-bao-khtc";
        case "ktdbcl":
            return "https://daotao.vku.udn.vn/vku-thong-bao-ktdbcl";
        case "khmt":
            return "https://cs.vku.udn.vn/thong-bao/";
        case "kts":
            return "#";
        default:
            return;
    }
};

const readUnreadAmountNotices = () => {
    chrome.storage.local.set({ amountUnreadNotices: 0 });
};

const readSpectificUnreadNotices = (currentTab) => {
    chrome.storage.local.set({});
};
