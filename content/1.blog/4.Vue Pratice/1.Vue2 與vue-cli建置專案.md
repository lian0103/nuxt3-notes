---
tags: 學習
---
# Vue2 與vue-cli建置專案

## [安裝流程](https://cli.vuejs.org/guide/installation.html)
```
npm install -g @vue/cli

vue --version

vue create ${app-name}
```

## .env檔
* .env設定要有VUE_APP 作為變數命名的開頭。添加後，需要重啟專案。 
```.env
#VUE_APP開頭
VUE_APP_BASEURL="http://sibase.sample.com"
```

## tailwind設定

在需要客製的css樣式上用tailwind來添加，方便日後管理，只要在tailwind.config.js中修改定義值。
[參考官網設定](https://tailwindcss.com/docs/installation)
```javascript
module.exports = {
  mode: "jit", //只編譯有使用到的樣式
  purge: ["./index.html", "./src/**/*.{vue,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      100: ["100px", { lineHeight: "1" }], //自行添加的定義
    },
  },
  variantOrder: [],
  variants: {},
  plugins: [],
};
```


## Vue config設定

* 參照vue-admin的設定做打包優化，在build production版時，會處理lib的分割，像是elementUI和vuejs。
[參考開源專案vue-admin](https://github.com/PanJiaChen/vue-element-admin)
[官方配置說明](https://cli.vuejs.org/zh/config/#vue-config-js)

```javascript
module.exports = {
      publicPath: "/",
      outputDir: "dist",
      assetsDir: "static",
      lintOnSave: process.env.NODE_ENV !== "production",
      productionSourceMap: false,
      configureWebpack: {
        name: "SIapp",
        resolve: {
          alias: {
            "@": resolve("src"),
          },
        },
      },
      chainWebpack(config) {
        config.plugin("preload").tap(() => [
          {
            rel: "preload",
            // to ignore runtime.js
            // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: "initial",
          },
        ]);

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete("prefetch");

        config.when(process.env.NODE_ENV !== "development", (config) => {
          config.optimization.splitChunks({
            chunks: "all",
            cacheGroups: {
              vue: {
                name: "chunk-vuejs",
                test: /[\\/]node_modules[\\/]_?vue(.*)/,
                priority: 20,
              },
              elementUI: {
                name: "chunk-elementUI", // split elementUI into a single    package
                priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
              },
              commons: {
                // split async commons chunk
                name: "chunk-async-commons",
                minChunks: 2,
                priority: 40,
                chunks: "async",
              },
            },
          });

          // config
          //   .plugin("webpack-bundle-analyzer")
          //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
        });
      },
};

```

## axios封裝
* axios封裝初版。透過axios建立請求實例，並設置request和response的攔截，API定義時可使用該實例下有定義的呼叫方式。
[axios怎么封装，才能提升效率？](https://zhuanlan.zhihu.com/p/136035219)

```javascript
 //request.js
import axios from "axios";
import { Message } from "element-ui";

//todo
//console.log(process.env.NODE_ENV)

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  timeout: 10000,
});

//請求攔截
instance.interceptors.request.use(config => {
    // console.log("config",config)
    config.headers.token = 'token';
    return config;
});

//回傳攔截
instance.interceptors.response.use((response)=>{
    console.log("response",response);
    //todo 錯誤處理
    return response;
},()=>{
    Message.error('請求有誤');
});

export default function(method, url, data = null, config) {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data, config);
    case "get":
      return instance.get(url, { params: data });
    case "delete":
      return instance.delete(url, { params: data });
    case "put":
      return instance.put(url, data);
    case "patch":
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
};
```


## 路由
* 佈署在server需要在server端做路由指向的調整，應把請求都指向前端路由去處理。
[參考Vue路由解說](https://book.vue.tw/CH4/4-1-vue-router-intro.html)
 
 
## vscode vetur
情境:在.vue file中若出現scss的語法，vscode vetur套件會檢查.vue file可能出現警告訊息，原因推測是vetur無法認得scss的語法。

![警告訊息](https://i.imgur.com/SL4En2X.jpg)

:::info
解決方法:在vscode vetur 套件的設定中 取消對style tag內容的驗證。
:::

![關閉驗證](https://i.imgur.com/zHGjiiq.jpg)

