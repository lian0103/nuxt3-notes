---
tags: 技術
---

# Heroku部署Web Application

## 佈署node application到Heroku 

step1 先在個人總覽頁新增app項目
* [登入 heroku ](https://id.heroku.com/login)
先前建立的Heroku帳密
* 假設我使用的app項目名稱是:jason-node

step2 佈署設定
* server佈署時預設是執行 npm start 所對應的腳本。所以在package.json需要有對應的在專案的啟動指令
```json
//package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node appHeroku.js " // appHeroku.js 作為應用的進入點
  }
```

## 使用heroku指令
要先下載heroku在本機後安裝 [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

```shell
#本機登入
heroku login 

#把專案跟heroku的app server名稱綁定
heroku git:remote -a ${heroku-app-name} #jason-node  

#佈署
git push heroku ${分支名稱} #main  

```

[佈署上線結果 Heroku jason-node](https://line-bot-doope.herokuapp.com/)


---
參考資源
[神Q超人 heroku佈署基礎教學](https://medium.com/enjoy-life-enjoy-coding/heroku-%E6%90%AD%E9%85%8D-git-%E5%9C%A8-heroku-%E4%B8%8A%E9%83%A8%E7%BD%B2%E7%B6%B2%E7%AB%99%E7%9A%84%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E5%AD%B8-bf4fd6f998b8)



