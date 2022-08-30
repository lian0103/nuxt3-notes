---
title: websocket 和 socketIO
tags: 學習
categories: 開發
---
## websocket
websocket是一種連線server端的方式，用來傳送和接收資料。從client端發起連結的請求，是從一般的http request"升級"成websocket，這種連線方式也是被w3c認可的技術。
[MDN WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)


socketIO是一種處理雙向(client和server端)、即時性的、事件導向的js套件，它包含websocket的技術，但封裝更多管理/操作websocket的API提供client端/server端使用。

:::warning
在client端，要使用socketIO去建立的連線，server端也必須使用socketIO提供的API，client端並不能直接使用socketIO去連接單純的(plant)websocket。
[socketIO官方文件](https://socket.io/docs/v4/)
:::

## 詳細比較
在這篇的討論中，可以知道使用socketIO是較容易就能去建立資料交換的流程和管理機制，且支援更多的client端使用情境。

[differences-between-socket-io-and-websockets](https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets)

## 使用教學

教學影片切入socketIO在實務上有前後端分離時，要透過API io("url")建立連線以及server端處理cors的設定。

[socket io crash course | easy way](https://www.youtube.com/watch?v=BAZ-tJOYhlA&ab_channel=HiteshChoudhary)

## 實作review
簡言之，建立websocket是希望client端即時和有效率的取得server端管理的資料，像是多個client端同時使用聊天功能，有需要"被通知"新的聊天資料。

2021年實作作品

[chatroom](https://github.com/lian0103/node_chatroom)

[demo](http://jason-node-chatroom.herokuapp.com/)

devtool ws 建立
![](https://i.imgur.com/bOmTOAK.jpg)

