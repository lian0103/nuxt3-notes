# Nuxt3 features

## 概念
打通web後端到前端的開發方式，優勢上是語言的一致，資料類型即的一致。在NuxtJS也提供各種功能，來做到SSR(Server Side Render)機制，並利用專案的資料夾結構去綁定這些功能。

功能資料夾包含:

├─page     
├─layouts      
├─components     
├─composable     
├─public     
├─server     
├─content     
└─middleware     

以上這些我將依據前後端的使用情境，將它們歸類，並就我理解的使用方式作補充。

使用版本 "nuxt": "^3.0.0-rc.3"

---

## 前端

### ├─page
在前端每個頁面路徑(path)都能在這個資料夾內找到對應的頁面檔。比如'/'對應'index.vue，'/about'對應'about.vue'。

nuxt也支援path上帶有動態的參數，page的檔名命名方式為"[paramName].vue"。

[nuxt page doc](https://v3.nuxtjs.org/guide/directory-structure/pages)

### ├─layouts
而在各頁面中可以使用共用的佈局模板，在這個資料夾預設使用為default.vue，搭配slot特性與頁面去做嵌套。

```html
#default.vue
<div>
    <Nav />
    <div class="content-wrapper">
      <slot />
    </div>
</div>
```
### ├─components
而不管是在page、layouts中還可以切分出更多共用的單位組件時，比如Nav組件使用在不同layout組件時，就會在這個資料夾下新增Nav.vue。

同時，在Nuxt框架下，也提供各種組件來使用，比如，NuxtLink組件，來實作連結。
```vue
#Nav.vue
<template>
  <header
    class="flex items-center justify-between h-20 px-[5%] lg:px-[15%] nav-header"
  >
    <NuxtLink to="/" class="font-bold text-2xl lg:text-4xl">
      <span class="text-primary">N</span>otes
    </NuxtLink>
  </header>
</template>
```

[Nuxt3 components doc](https://v3.nuxtjs.org/guide/directory-structure/components)

### ├─public
在資料夾下放置的靜態檔案，可以讓客戶端直接訪問取得。比如放置favicon.ico，在部署後可以透過 https://nuxt3-notes.vercel.app/favicon.ico 訪問。

目前nuxt3文件示意參照nuxt2 static說明。
[Nuxt2 static doc](https://nuxtjs.org/docs/directory-structure/static/)

### ├─composable
在資料夾結構中的每支檔案可以管理目前頁面間的共同狀態，使用方式是會自動import到page、layout的vue檔來呼叫，這也包含nuxt本身提供的方法，比如useHead()、useAsyncData()...等等。

[nuxt composable doc](https://v3.nuxtjs.org/api/composables/use-async-data)

範例:
```javascript
// composables/useAuth.js
const decode = (cookie = 'null') => JSON.parse(cookie);
const encode = (cookie) => JSON.stringify(cookie);

export const useAuth = () => {
  const authCookie = useCookie('auth', {
    encode,
    decode,
    default: () => null,
  });

  const deleteCookie = async (guessWord) => {
    authCookie.value = await $fetch(`/api/auth`, {
      method: 'DELETE',
    });
  };

  return { authCookie, deleteCookie };
};

```

```javascript
//使用
const { authCookie, deleteCookie } = useAuth();
```

### ├─middleware
在資料夾中可定義路由的中間層，作為像是訪問權限的確認。
範例:
```javascript
//auth.global.js
export default defineNuxtRouteMiddleware((to, from)=>{
  console.log('in nuxt middleware auth.js')
  const { authCookie, deleteCookie } = useAuth();
  if(to.path === '/'){
      return navigateTo('/')
  }else if(!authCookie.value){
      return navigateTo('/')
  }else{
      return navigateTo(to.path)
  }
})
```


## 後端

### ├─server
在server/api資料夾下，nuxt提供前端呼叫API server的模擬機制，來把資料回應給前端。
以範例來解說，defineEventHandler是nuxt定義的事件函式，event模擬的request中包含了呼叫請求的資訊。
```javascript
//server/api/user/index.js
import { v4 as uuid } from 'uuid';
import { sendError } from 'h3';

//模擬使用
const db = {
  users: [],
};

export default defineEventHandler(async (event) => {
  switch (event.req.method) {
    
    //GET http://localhost:3000/api/user
    case 'GET': {
      return db.users;
    }
    //POST http://localhost:3000/api/user
    case 'POST': {
      const body = await useBody(event);
      if (!body.userName) {
        const badRequestErr = createError({
          statusCode: 400,
          statusMessage: 'userName is not found',
        });
        sendError(event, badRequestErr);
      }
      const newUser = {
        id: uuid(),
        item: body.userName,
        online: true,
      };

      db.users.push(newUser);
      return newUser;
    }
  }
});

```

前端部分，使用$fetch()、useFetch()呼叫server/api對應結構的檔案
```javascript

const resultGet = await $fetch("/api/user",{method:"GET"});

const resultPost = await $fetch("/api/user",{method:"POST"});

```

### ├─content
在這個資料夾中可放置各種文檔和資料，如.md、.json，概念在客戶端不能直接透過路徑去訪問到這些檔案，而是需要透過nuxt提供的queryContent()來調取檔案。
範例:
```shell
#加入一個lineBot串接.md
content
├─1.blog
  ├─1.Third Part Tools
    ├─1.lineBot串接.md
```
```javascript
//透過檔案路徑取得檔案 (目前版本中文字元會被取代掉)
const filePath = "blog/third-part-tools/lineBot";
const { data: blog } = await useAsyncData(filePath, () => {
  return queryContent(filePath).findOne();
});
```
[nuxt quertyContent doc](https://content.nuxtjs.org/api/composables/query-content/#findone)

## nuxt.config.js

[nuxt config doc](https://v3.nuxtjs.org/api/configuration/nuxt.config)

---

[範例內容](https://github.com/lian0103/nuxt3-notes)