---
title: Vite build config
---
# Vite build config

## 情境一:vite build的chunk體積過大
隨著專案內容的增加，在打包/分檔的策略上必須自行添加，否則會出現像截圖的錯誤訊息，單一個的chunk體積過大。

![](https://i.imgur.com/WLC92uq.jpg)

### 對應的優化
依照提示的build.rollupOptions.output.manualChunks來建立規則。當倚賴的id包含node_modules時可以理解為這是專案中使用到的其他npm開源package，所以可以獨立成一個chunk，並只擷取其package name作為其[name]，這樣就不會把倚賴的package打包在一起。

```javascript
//vite.config.js
export default ({ mode }) => {
    const config ={
        build : {
          outDir: './dist',
          chunkSizeWarningLimit: 1600,
          rollupOptions: {
            output: {
              chunkFileNames: 'assets/js/[name]-[hash].js',
              assetFileNames: 'assets/static/[name]-[hash].[ext]',
              manualChunks(id) {
                //也可以依據需求，再把指定的倚賴做分檔
                if (id.includes('node_modules')) {
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
              },
            },
          },
        };
    }
    
}
```

[參考文章](https://juejin.cn/post/7119455615840092173)

### 切分後的結果
![](https://i.imgur.com/FSL45my.jpg)

