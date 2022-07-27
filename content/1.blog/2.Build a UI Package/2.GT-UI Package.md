---
tags: npm git
title: GT-UI Package指令 
---
# GT-UI Package指令 

## 倉庫
[Github](https://github.com/lian0103/vue-ui)

[GitLab](https://gitlab.greattree.com.tw/Jason0103/gt-ui/-/tree/main)

## 流程
### 打包指令
```shell
npm run build-GT 
npm run build-Qua
npm run build-Ele
```

### 發佈指令

```shell
## 需要輸入帳號 密碼 電子信箱
npm login

npm publish
```

## 版本控制
發佈版本的commit，也打上對應的版本號tag

### Tag指令
```shell
## tag目錄
git tag -l

## tag新增
git tag -a v0.0.xx

## tag刪除
git tag -d v0.0.xx

```
![](https://i.imgur.com/3aPVxxB.jpg)

### 關於私有庫文章
1. [私有倉的選項](https://zhaomenghuan.js.org/blog/npm-private-repository-verdaccio.html#npm-%E7%A7%81%E6%9C%89%E4%BB%93%E5%BA%93%E7%9A%84%E5%A5%BD%E5%A4%84)
2. [NPM: verdaccio](https://ithelp.ithome.com.tw/articles/10205616)