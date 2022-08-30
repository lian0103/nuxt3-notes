# Nuxt3 APP

## 建立一個nuxt3 app

**node版本: 16.13.0**
**套件使用版本**

```javascript
{
  "devDependencies": {
    "autoprefixer": "^10.4.7",
    "nuxt": "3.0.0-rc.6",
    "postcss": "^8.4.14",
    "sass": "^1.53.0",
    "sass-loader": "10.1.1",
    "tailwindcss": "^3.1.6"
  }
}
```


官方建議使用 
1.vscode
2.volor套件
```shell=
npx nuxi init {nuxt-app-name}
```


---

## 配置tailwind

**package:tailwindcss、postcss、autoprefixer**
```shell
npm install -D tailwindcss postcss@latest autoprefixer@latest
```

**tailwind.config.js**
```shell
npx tailwindcss init
```

```javascript
module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**tailwind.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**postcss.config.js**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**nuxt.config.js**
```javascript
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
});

```

---


## 配置scss
**package:sass-loader、sass**
```shell
npm i -D sass-loader@10.1.1 --save-exact && npm i -D sass
```

## 完成
![](https://i.imgur.com/JyBBAGo.png)

```vue
<script setup>
import '@/assets/css/tailwind.css';
</script>
<template>
    <div>
        <h1 class="title">
            Hello~~
            <span>World</span>
        </h1>
    </div>
</template>

<style lang="scss">
.title {
    @apply font-bold text-2xl text-red-600;
    span {
        @apply text-purple-600;
    }
}
</style>

```