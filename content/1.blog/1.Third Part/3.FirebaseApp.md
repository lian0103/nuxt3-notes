---
title: Firebase features
tags: 技術
categories: 開發 
---

Google開發全家餐系列預計包含Google Firebase、Google AdSense、Google Analytics..。本篇主要在記錄使用Firebase部分功能。

實作部分，我有兩個小專案應用放在Firebase上:
1.Portfolio 作品集 [github link](https://github.com/lian0103/portfolio)
2.Hexo-blog 部落格 [github link](https://github.com/lian0103/hexo-blog)

## Firebase Realtime Database
每筆資料會像是文件檔一樣各自獨立地儲存，而DB可以視為很多文件的集合物件。前端/APP端在使用時，也會隨著DB內的文件更新，也會即時將有該筆資料的訂閱端做推送更新，也就是不同使用者和應用程式可以同時共享最新的資料。

### 應用實作:留言板
在這裡呈現的留言板即是將資料存放在Realtime DB。多個使用者/視窗同時留言，會同步推送給其他人的畫面。
![](https://i.imgur.com/NtHhZMK.jpg)




## Firebase Hosting
和github pages類似，這個服務可以把部屬應用程式到它的主機上，Hosting預設會給兩種domain的網址。
![](https://i.imgur.com/pYy4vm4.jpg)



### 應用實作:部屬上線
以這個部落格的專案為例，我是使用Hexo的架站模組，會用到的指令如下。流程上是需要可以先建置好部落格的專案，後續再使用Hosting即可。


## 指令
```shell
#Hexo cli指定
#清除cache並生產靜態檔
hexo clean && hexo g

#Firebase cli指令

firebase login --interactive

firebase init --hosting

firebase deploy

```


