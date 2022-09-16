---
tags: 學習
---

# D3.js 畫甘特圖

以SVG標籤為技術基礎的D3.js，d3提供各種API庫來操作SVG，它是功能很多的一個函示庫。而理解SVG的核心，需要現有圖層、定位(x,y)的認知，在操作的過程就是把每個圖層疊加在一起，並在內的標籤上綁定監聽事件，就可以實現交互的效果。

## svg結構
從渲染結果來看，一個svg中會包含多個\<g\>\</g\>的內容，一個\<g\>即可以理解為圖層，每個圖層內所繪製的部分在d3中分開處理，也表示每個圖層有它各自的資料。
![](https://i.imgur.com/OVKNZV9.png)

## 圖層疊加
![](https://i.imgur.com/uhIyg14.png)

## 代碼

```
const svg = d3
.select('#d3-container')
.append('svg')
.attr('width', width)
.attr('height', height + 20);

const xAxisLayer = svg.append('g');
const titleLayer = svg.append('g');
const barlineLayer = svg.append('g');
const categoryLayer = svg.append('g');
const barsLayer = svg.append('g').attr('id', 'barsRects');
const barsTextLayer = svg.append('g').attr('id', 'barsTexts');

```
[完整代碼](https://github.com/lian0103/nuxt3-notes/blob/main/components/GanttChart.vue)