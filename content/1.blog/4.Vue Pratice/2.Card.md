---
tags: 學習
---

# vue3 slot & Card組件實作


## 畫面需求
1.圖片寬高比16:9
```css
.img {
  max-width: '100%';
  aspect-ratio: 16 / 9;
}
```

2.使用vue3 props & slot
在vue3的template中可以直接使用不具名或具名的slot標籤。
```javascript
//子層  
<slot name="dics"></slot>

//父層
<template v-slot:dics>
    <p v-for="key in Object.keys(item.dics)" :key="key">
      <span>{{ key }}:</span>{{ item.dics[key] }}
    </p>
</template> 
    
``` 
    
3.子層註冊事件並回傳操作父層資料
-> 我在父層定義fn傳給子層做呼叫，達到callback作用

4.排版使用flex & grid

![](https://i.imgur.com/poCoY2t.jpg)

## Card.vue
```javascript
<script setup>
const props = defineProps({
  img: String,
  isClick: Boolean,
  handleBtnClick: Function,
});
</script>

<template>
  <div class="card">
    <div class="ratioBox"><img class="img" :src="props.img" alt="" /></div>
    <div class="dics">
      <slot name="dics"></slot>

      <div class="btnP">
        <button
          class="btn"
          :class="props.isClick ? 'btnDelete' : 'btnPrimary'"
          @click="handleBtnClick"
        >
          {{ props.isClick ? "DELETE" : "ADD" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  display: flex;
  flex-direction: column;
  background: #333;
  padding: 0px 10px;
  max-width: 350px;
}

.img {
  max-width: 100%;
  aspect-ratio: 16 / 9;
}

.dics {
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 10px 0;
}
p {
  padding: 6px 10px;
  display: grid;
  grid-template-columns: 1fr 3fr;
}

span {
  color: #ccc;
}
.btnP {
  padding: 6px 10px;
  text-align: right;
}

.btn {
  padding: 6px 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
}

.btnPrimary {
  background-color: paleturquoise;
}

.btnDelete {
  background-color: red;
}
</style>



```
