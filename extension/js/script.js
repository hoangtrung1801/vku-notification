window.onload = () => {
    let listNoties;
    chrome.storage.local.get(["data"], ({ data }) => {
        listNoties = getListNoties(data);

        initNavTab();
        initCurrentTab();
    });

    let currentTab = "dt";
    const listItemInTab = document.querySelector(".list-items-in-tab");
    const navTabs = document.querySelector(".nav-tabs");

    const initNavTab = () => {
        listNoties.forEach((list) => {
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
        const currentList = listNoties.find((list) => list.name === currentTab);
        console.log(currentList);

        currentList.noties.slice(0, 10).forEach((noty) => {
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
        default:
            return;
    }
};

const getListNoties = (data) => {
    // return Object.keys(data).map((name) => ({
    //     name,
    //     noties: getInfoFromHtml(data[name]),
    // }));
    return data.map((list) => ({
        name: list.name,
        url: list.url,
        noties: getInfoFromHtml(list.data),
    }));
};

const getInfoFromHtml = (html) => {
    const parser = new DOMParser();
    const root = parser.parseFromString(html, "text/html");
    const list = root.querySelectorAll(".item-list li");

    let result = [];
    list.forEach((item) => {
        const href = item.querySelector("a").getAttribute("href");
        const title = item.querySelector("a").textContent.trim();
        const date = item.querySelector("span").textContent.trim().slice(2);
        result.push({
            title,
            href,
            date,
        });
    });

    return result;
};
