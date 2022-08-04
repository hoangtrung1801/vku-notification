import fetch from "node-fetch";
import parse from "node-html-parser";
import { VKUUrls } from "./config/constant";
import * as fs from "node:fs/promises";

(async () => {
    const data = {};
    await Promise.all(VKUUrls.map((item) => crawl(item.url))).then((result) => {
        for (let i = 0; i < VKUUrls.length; i++) {
            data[VKUUrls[i].name] = result[i];
        }
    });
    await fs.writeFile("./data.json", JSON.stringify(data));
})();

async function crawl(url) {
    const result = [];

    const respone = await fetch(url);
    const data = await respone.text();

    const root = parse(data);
    const list = root.querySelectorAll(".item-list li");
    list.forEach((item) => {
        const href = item.querySelector("a").attributes.href;
        const title = item.querySelector("a").textContent.trim();
        const date = item.querySelector("span").textContent.trim().slice(2);
        result.push({
            title,
            href,
            date,
        });
    });
    return result;
}
