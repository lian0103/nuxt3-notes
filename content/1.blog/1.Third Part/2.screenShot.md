---
title: web畫面截圖
tags: 學習
categories: 技術 
--- 
# web畫面截圖功能實作
把渲染在web畫面上指定的Dom，轉成一張圖片後下載。在實作上需要使用Html5 Canvas物件(理解成畫布)來繪製指定的Dom，再把Canvas物件轉換成Blob，再轉換成可供瀏覽器觸發下載的ObjectURL格式，並執行觸發下載動作。


<img src='https://i.imgur.com/kp0HP5v.png' width='300'/>


## lib
1.html2canvas.js
把web畫面上指定的Dom，轉成一個Canvas物件。

```javascript
// in vue3 .vue
import html2canvas from "html2canvas";
//...(略)
html2canvas(instance.refs.targetDom).then((canvas) => {
    //...
});

```
[官方doc](https://www.npmjs.com/package/html2canvas)

2.FileSaver.js
把Canvas物件轉成Blob格式，並呼叫FileSaver的API saveAs。而在SaveAs的實作中，則是把Blob格式轉換成可下載的ObjectURL格式。
```javascript
import { saveAs } from "file-saver";
//...(略)
canvas.toBlob((blob) => {
    saveAs(
      blob,
      `imageName.png`
    );
});

```

```javascript
//lib FileSaver.js saveAs
function saveAs(blob, name, opts) {
  var URL = _global.URL || _global.webkitURL;
  var a = document.createElement("a");
  name = name || blob.name || "download";

  a.download = name;
  a.rel = "noopener";

  if (typeof blob === "string") {
     // 略
  } else {
    a.href = URL.createObjectURL(blob);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 4e4); // 40s
    setTimeout(function () {
      click(a);
    }, 0);
  }
}

```

[官方doc](https://github.com/eligrey/FileSaver.js)

## 實作code
```javascript

//實作時有先將畫面一些不需要截圖的部分先隱藏 再擷取重新選染後的Dom
const isCapturing = ref(false);

const generatorImage = () => {
  isCapturing.value = true; 

  setTimeout(() => {
    html2canvas(instance.refs.row2).then((canvas) => {
      isCapturing.value = false;
      canvas.toBlob((blob) => {
        saveAs(
          blob,
          `${curDepInfoDateStr.value} ${curDepInfo.value.depName}.png`
        );
      });
    });
  }, 200);
};

```

## Blob
二進位大型物件（英語：binary large object ，或英語：basic large object，縮寫為Blob、BLOB、BLOb），在資料庫管理系統中，將二進位資料儲存為一個單一個體的集合。Blob通常是影像、聲音或多媒體檔案。

## 物件資料轉換關係圖
Image、DataURL、ObjectURL、Blob、Canvas、ImageData、ArrayBuffer、ImageURL。


<img src='https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/112c6956ee734162bccebae8547ec061~tplv-k3u1fbpfcp-zoom-1.image'/>

---
學習資源
[聊一聊 15.5K 的 FileSaver，是如何工作的](https://www.gushiciku.cn/pl/gmpt/zh-tw)

