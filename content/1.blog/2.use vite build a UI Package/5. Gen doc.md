---
tags: node 工具
---

# 自動生成demo文件

在新的 GT UI 檔案結構中，packages 資料夾內包含了各元件的資料夾，這相對之前的改變是要讓展示的代碼分割出來，同時也是為了能自動化生成匯出檔做的安排，這能讓日後對相關的維護和開發容易。
這裡的匯出檔(packages/insex.js)，即是透過模板和 list.json 的資料去生成。
![](https://i.imgur.com/BZSxXhV.jpg)

展示頁的畫面，元件的效果和開發者的代碼可以一同顯示，也是透過路由參數改變後去對應該元件的 dmeo.vue 檔。
![](https://i.imgur.com/INe38rl.jpg)

> 概念來自:https://github.com/jrainlau/MY-Kit
> 主要調整的部分在於該專案使用一些方法要去動態 import md 檔，本地開發能正常，但打包後需要調整成 fetch 的作法，這部分我在使用 gitgub page 測試時未能成功。
> 因此，我改成在打包前就去生成 demo 檔的內容，也就不用把 md 檔一併佈署在 web server。

## 工具一 inquirer

很強大的輸入工具，可以自定義各種類型的問題，並做驗證、過濾、預設值、清單等等功能，最後會回傳一個回答的物件。

[inquirer npm](https://www.npmjs.com/package/inquirer#reactive)

[gt UI 使用部分](https://github.com/lian0103/vue-ui/blob/main/script/genNewComp/infoCollector.js)

基本範例:

```javascript
()=>{
  const inquirer = require("inquirer");
  const prompt = inquirer.createPromptModule();
  const questions = [
    {
      type: "input",
      name: "Q1",
      message: "Q1回答:",
      default: "2",
      filter: (input) => {
        return "filter-" + input;
      },
      validate: function (input) {
        const done = this.async();
        if (input == 1) {
          done("答案不能是1");
          return;
        }
        done(null, true);
      },
    },
    {
      type: "confirm",
      name: "Q2",
      message: "Q2回答:",
    },
    {
      type: "list",
      name: "Q3",
      message: "Q3回答:",
      choices: ["a", "b", "c"],
    },
    {
      type: "input",
      name: "Q4",
      message: "身份證字號:",
      default: "a123456789",
      validate: function (input) {
        const done = this.async();
        const idReg = /^[a-zA-Z][0-9]{9}$/;

        if (!idReg.test(input)) {
          done("身分證錯誤");
          return;
        }

        done(null, true);
      },
    },
  ];

  const answersCollect = async () => {
    const result = await prompt(questions);
    return result;
  };

  module.exports = {
    answersCollect,
  };
}

```

## 工具二 fs-extra

讀取檔案與寫入檔案的工具。

[fs-extra npm](https://www.npmjs.com/package/fs-extra)

[gt UI 使用部分](https://github.com/lian0103/vue-ui/blob/main/script/genGtDoc/index.js)

基本範例:

```javascript
()=>{
const fs = require('fs-extra');
const path = require('path');

function read() {
  const filePath = path.resolve(__dirname, '../.template/demo.vue');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  //   console.log(fileContent);
  return fileContent;
}

function write(fileContent) {
  const destFilePath = path.resolve(__dirname, '../output/demo.txt');
  fs.outputFile(destFilePath, fileContent, (err) => {
    console.log(err);
  });
}

write(read());
}
```

## 工具三 handlebars

把.tpl 格式的模板檔案中，有用{{}}括號包起的變數替換掉，編譯成要匯出的檔案。
[handlebars npm](https://www.npmjs.com/package/handlebars)

[gt UI 使用部分](https://github.com/lian0103/vue-ui/blob/main/script/genGtDoc/index.js)

```javascript
// /.template/obj.js.tpl
export const obj = {
    {{objContent}}
}
```

```javascript
const fs = require('fs-extra');
const handlebars = require('handlebars');
const { resolve, join } = require('path');

function genObjFile() {
  const answerFileContent = JSON.parse(
    fs.readFileSync(join(process.cwd(), '/output/answers.json'), 'utf-8')
  );

  //讀取模板檔案
  const tempFilePath = join(process.cwd(), '/.template/obj.js.tpl');
  const tempFile = fs.readFileSync(tempFilePath, 'utf-8');

  //產生模板檔案對應的字串 ex. {{objContent}}
  const objContent = answerFileContent
    .map((obj, idx) => {
      return `answer${idx}:${JSON.stringify(obj)},`;
    })
    .join('\n    ');

  //透過handlebar將模板產生
  const contentCompiled = handlebars.compile(tempFile, {
    noEscape: true,
  })({ objContent: objContent });

  //寫出檔案
  fs.outputFile(
    join(process.cwd(), '/output/obj.js'),
    contentCompiled,
    (err) => {
      if (err) console.log(err);
    }
  );
}

module.exports = {
  genObjFile,
};
```
