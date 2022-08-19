---
tags: 學習
---

# 資料爬取與儲存

參考鐵人賽的系列文章，使用 NodeJS 來實作網頁資料爬取和儲存於 google 表單，在嘗試過程中把系列文的 selenium-webdriver 套件改用 puppeteer 和 cheerio，而該系列文主要針對的是臉書和 IG 的追蹤數爬取，我則針對 yahoo 入口頁面的新聞和 momo 購物網的商品搜尋資訊。

## 工具

- [puppeteer](https://www.npmjs.com/package/puppeteer)
  提供基於瀏覽器操作行為的 API，也可以截取圖片、產生 PDF。使用概念上要瞭解瀏覽器渲染 DOM 的生命週期，以及對於網站 url 的規則去分析。在資料公開的網站，url 的 path 和 query 部份，通常就指向對應的資料內容。

> momo 搜尋產品頁
> https://www.momoshop.com.tw/search/searchShop.jsp?keyword=$keyword
>
> google 搜尋頁
> https://www.google.com.tw/search?q=$keyword

- [cheerio](https://www.npmjs.com/package/cheerio)
  用來處理網頁的 dom 結構，功能和 jQuery 的選取和操作相近。在這次嘗試過程中，是拿來抓取 dom 的資料。

- [googleapis](https://www.npmjs.com/package/googleapis)
  用來使用線上 google 表單的操作，官方提供的 API 相當龐雜。這次有使用的部分是基本的寫入資料、新增 sheet。在概念上，它可以做為一個線上儲存資料的載體。
  > 使用重點是在[google developer console](https://console.cloud.google.com/apis/dashboard?project=node-crawler-359702)要先開通 google sheet api 服務，並設定服務權限，取得憑證(credentials.json)

## 實作重點

- [puppet.js](https://github.com/lian0103/nodeServices/blob/main/services/puppet.js)
  可以理解為瀏覽器操作流程

```javascript
() => {
  const puppeteer = require('puppeteer');

  async function puppetGetWebContent(webUrl) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(webUrl);
    const content = await page.content();
    await browser.close();

    return content;
  }
};
```

- [momoCrawler.js](https://github.com/lian0103/nodeServices/blob/main/services/momoCrawler.js)
  爬取 momo 產品搜尋頁，並把前五項的商品連結記下，再前往商品頁中爬取商品資訊。
  ![](https://i.imgur.com/ebt53Gi.png)

- [yahooCrawler.js](https://github.com/lian0103/nodeServices/blob/main/services/yahooCrawler.js) & [googleSheets.js](https://github.com/lian0103/nodeServices/blob/main/services/googleSheets.js)
  爬取資料後，將它存放到線上 google 表單。
  ![](https://i.imgur.com/brb2Pfj.png)

## 後續目標

- 利用 express 啟 API 服務
- 部署到主機
- 使用排程

## 參考資源

- [行銷廣告、電商小編的武器，FB & IG 爬蟲專案從零開始](https://ithelp.ithome.com.tw/users/20103256/ironman/2940)
