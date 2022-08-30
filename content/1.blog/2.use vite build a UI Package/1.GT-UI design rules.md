---
tags: 學習
title: 前端UI設計規範引入
---
# 前端UI設計規範引入

使用背景:     
UI設計規範通常包含字體、字級、主配色與客製組件的樣式(style)。

在專案中，也經常會引入已經完善的樣式庫來妥善管理全站的樣式，像是tailwindCSS。同時，也會在使用前端框架的情況下，導入其他UI庫，像是vue3的Element plus，且這些UI組件通常也有自己需要倚賴的樣式庫。

而這些需要倚賴的樣式庫，如果在專案有要求設計規範時，可以很方便產出符合UI設計規範的專案樣式庫。

以下是預設使用sass的專案中，配置tailwindCSS和Element plus來增加或覆寫預設的樣式。

## 對tailwindCSS增加定義

依照官方文檔建立tailwind.config.js中，加入需要客製定義的元素，tailwind就能在編譯後建立出相依這些元素的樣式。
```javascript

module.exports = {
    mode: 'jit', //只編譯有使用到的樣式
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        //...(略)
        colors:{
            //...(略) 
            pressing: '#DBE9D8', //定義顏色與對應的色碼
            pressing2: '#E0F2DE',
            mainGreen: '#3bb071',
            mainGreenDarker: '#b8d8c9',
            secondColor: '#b8d8c9',
        }
    }
}

```

在class中，就能使用如text-mainGreen的樣式改變字體顏色，也能使用from-pressing to-pressing2來讓背景的漸層樣式去對應到上段新定義的顏色。
```html
<template>
    <div class="... bg-gradient-to-r from-pressing to-pressing2 text-mainGreen">
        <Login />
    </div>
</template>
```

## 對Element plus覆寫定義

這部分可以分為兩個情況做處理


### 在UI庫產生樣式庫前，先修改定義的元素
比如要修改顏色中定義為primary的色碼。依照官方文檔去覆寫定義，在專案使用sass的情況下，可以獨立建立一支scss檔案。
```css
//elementPlusInit.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
    $colors: (
        'primary': (
            'base': #3bb071
        )
    )
);
```
而必須確保在專案在掛載Element plus樣式庫前，先執行這段scss檔的內容，在我目前使用Vite的情況下，是在vite.config.js中，設定如下。在理解上，是把這支scss檔指令/資料加到vite打包css的預處理流程中，而改變element-plus產生的樣式庫的結果。

```javascript
export default ({ mode }) => defineConfig({
    //...(略) 
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/elementPlusInit.scss" as *;`
            }
        }
    }
})

```


>  在vite ^2.3.7上打包後
>  這支預載scss定義的樣式會被重複在每一個分割的組件css中
>  所以目前先採取只先把定義修改的指令在這支檔案，否則會有大量的重複樣式產生在開發和打包結果中。


### 在UI庫產生樣式庫後，覆寫已經定義好的樣式
這部分的實作，就是打開dev tool找到畫面上element-plus給組件配的樣式名稱，再做一次覆寫。而這邊的覆寫，還嘗試加入深/淺模式變化上，強制(!important)讓組件的樣式換上自定義的顏色(但可能還有更漂亮的作法?)。

```css
.el-table {
    background: var(--bg) !important;
    color: var(--font-color) !important;
    --el-table-bg-color: var(--bg) !important;
    --el-table-tr-bg-color: var(--bg) !important;
    --el-table-row-hover-bg-color: var(--bgHover) !important;
}

.el-table__expanded-cell[class*='cell'] {
    padding: 10px 20px;
}

.el-table td,
.el-table th {
    padding: 4px;
    font-weight: 400;
}

.el-breadcrumb__inner a {
    color: var(--font-color) !important;
}

```
