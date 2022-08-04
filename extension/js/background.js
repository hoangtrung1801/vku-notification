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

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed");
    fetchData().then((data) => {
        chrome.storage.local.set({ data });
    });
});

// chrome.runtime.sendMessage({ message: "test" }, function (respone) {
//     console.log(respone);
// });

// async function crawl(url) {
//     const result = [];

//     const respone = await fetch(url);
//     const data = await respone.text();

//     const parser = new DOMParser();
//     const root = parser.parseFromString(data, "text/html");
//     const list = root.querySelectorAll(".item-list li");
//     list.forEach((item) => {
//         const href = item.querySelector("a").attributes.href;
//         const title = item.querySelector("a").textContent.trim();
//         const date = item.querySelector("span").textContent.trim().slice(2);
//         result.push({
//             title,
//             href,
//             date,
//         });
//     });
//     return result;
// }

const fetchData = async () => {
    const fetchFromUrl = (url) => fetch(url).then((res) => res.text());

    let data = [];
    await Promise.all(VKUUrls.map((item) => fetchFromUrl(item.url))).then(
        (result) => {
            for (let i = 0; i < VKUUrls.length; i++)
                data.push({
                    ...VKUUrls[i],
                    data: result[i],
                });
            // data[VKUUrls[i].name] = result[i];
        }
    );
    return data;
};
