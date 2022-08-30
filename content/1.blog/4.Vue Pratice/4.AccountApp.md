---
tags: 實作
categories: 開發 
---

# vue3 花費紀錄 APP
這次主要想測試以Vue為基底的UI庫"Quasar"，搭配Google Firebase9平台的API，來實現記帳的應用。Quasar的Tab、Dialog、Form、和Dialog在使用上和ElementUI的風格有不少差異，Quasar在可控的參數上有更多選項，在熟悉的情況下開發是很便利的。另外，這個專案是使用Quasar提供的CLI工具，而不是使用vue-cli或vite，在官方文檔中雖然是有提供這些工具的配置方式，但官方推薦是自家的工具。

[github](https://github.com/lian0103/quasar-accountApp)

## Stacks
Firebase 9:權限、realtimeDB、hosting
Vue3
Pinia:替代Vuex為全域的資料管控
Quasar v2.0.0 & Quasar cli
Tailwindcss
Vue3apexchart 

## 權限
1. 註冊user
2. 登入/登出

### 記帳
1. 新/刪/查/改 消費紀錄
2. 新/刪/查/改 記帳Tag
3. 消費紀錄統計圖表

## PWA
在佈署的版本，這次透過Quasar cli打包出PWA的版本，所以在桌機chrome和移動端sarfari中可以下載成APP。
<div style='{display:"flex"}'>
    <img src="https://i.imgur.com/WA6H8s5.jpg" width="250" alt='' />
    <img src="https://i.imgur.com/eAxLq5P.jpg" width="250" alt='' />
    <img src="https://i.imgur.com/4oMvR5Z.jpg" width="250" alt='' />
    <img src="https://i.imgur.com/kWiwl2m.jpg" width="250" alt='' />
</div>


### email註冊/登入
在權限部分有多種可以註冊的方式，這個APP是使用email來註冊，註冊後的uid也可以拿來識別使用者。
![](https://i.imgur.com/mzBvQUZ.jpg)

### 專案中的配置
必須在專案中引入Firebase提供的SDK，並使用後台提供的資訊做APP跟Firebase服務的綁定。

```javascript
//src/firebase/index.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBncSexDmqEHo1V_SgpHsi6FUdiNiiayoA",
  authDomain: "account-app-f70c0.firebaseapp.com",
  projectId: "account-app-f70c0",
  storageBucket: "account-app-f70c0.appspot.com",
  databaseURL:
    "https://account-app-f70c0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "893886700460",
  appId: "1:893886700460:web:fbcc5bd3fc95013714f809",
  measurementId: "G-J6SMYP2MZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

```

### API
firebase後台提供的API可以註冊/登入/登出使用者和對DB的操作。DB的資料結構是一個JSON格式，所以每一層的設計要思考一下key/value的對應關係。
```javascript
//auth.js
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

...(略)

//spend.js
import { getDatabase, ref, set, push, remove } from "firebase/database";
export const getMemberSpendRef = (uid) => {
  if (!uid) return false;

  return ref(db, `spend/${uid}`);
};

export function pushSpend(obj = {}, uid) {
  if (!uid) return false;

  const newPostRef = push(ref(db, `spend/${uid}`));
  const timeId = new Date().valueOf();
  set(newPostRef, {
    ...obj,
    time: timeId,
    tag:!!obj.tag?obj.tag:"無tag"
  });
}

export function removeSpend(uid, key) {
  if (!uid || !key) return false;

  remove(ref(db, `spend/${uid}/${key}`));
}
```

### DB
在spend紀錄中，我把user uid作為key。每一個user會對應多筆花費的紀錄，資料的uid則是透過API自動生成，而在更新/刪除時也可以去組出該筆資料的路徑做操作。
![](https://i.imgur.com/2Z29kaZ.jpg)


### PWA換icon
在換icon的過程，可能遇到錯誤會導致chrome和safari不能把APP作為PWA來下載，此時要確認dev tool中的錯誤訊息。

![](https://i.imgur.com/9qlFnQJ.jpg)

