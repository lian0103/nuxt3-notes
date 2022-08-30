# UI元件單元測試

## 概念
在給予特定條件的情形下，有期待的對應產出。例如，對函式的回傳、元件的渲染結果進行確認。優點是可以把規格轉換成測試腳本，確保修改/迭代過程的正確性。

## 工具
常見的單元測試的庫:Jest、vitest

## 安裝vitest


1.安裝指令 
```shell
npm install -D vitest
```
[vitest doc](https://vitest.dev/guide/#adding-vitest-to-your-project)

2.新增指令與參數

```json
//package.json
  "scripts": {
    "test:unit": "vitest --environment jsdom --coverage"
  },
```
設定為測試UI元件的參數  [vitest --environment doc](https://vitest.dev/config/#environment)

設定為測試相關連的檔案模式 [vitest --coverage](https://vitest.dev/config/#coverage)


3.新增測試腳本檔
在__test__資料夾下，以xxx.spec.js命名
![](https://i.imgur.com/UasFjlM.jpg)   


在vite設定中也要把測試檔案的路徑加入。
```javascript
//vite.confit.js
import { defineConfig } from 'vite';
export default ({mode}) => {
    return defineConfig({
        test: {
          global: true,
          environment: 'jsdom',
          includeSource: ['src/components/__test__/*.spec.js'],
        },
    })
}
```

## 語法
常見的單元測試語法
```javascript
import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import GButton from '../GButton.vue';
describe('測試GButton', () => {
    it('項目1 渲染是否正常',async()=>{
        const wrapper = render(GButton);
        expect(wrapper.html()).toContain('gt-btn');
    })
})
```
>
>describe 用來描述測試項目的群組
>
>it 測試項目
>
>render 渲染函式
>

## 範例測試

這個範例中，是以GT UI的按鈕原件作為測試對象。預期它渲染在畫面後，html結構中正常情況在class包含了"gt-btn"。

![](https://i.imgur.com/FM3ePmy.jpg)

---

假如，日後在修改該元件檔案時，不小心把class名稱變更gt-btnrrr，則會在測試時提示錯誤。
![](https://i.imgur.com/7wbHHNf.jpg)

---

延伸，當元件可以依據傳入的屬性有更多渲染的情境出現，比如要渲染一個有屬性yellow的按鈕，同時預設是沒有邊框線的，這時就有兩個預期的渲染結果。
```javascript

it('項目2 渲染屬性yellow按鈕', async () => {
    const wrapper = render(GButton, {
      props: { type: 'yellow' },
    });
    expect(wrapper.html()).toContain('gt-btn-yellow');
    expect(wrapper.html()).toContain('gt-btn-round-no-border');
});
```

## 測試覆蓋率
在gt-button.spec.js中，共計我寫了5個測試項目，vitest也會列出在這個測試過程使用到的檔案中，語句覆蓋率為91.5，且其他沒被覆蓋的行數(紅字)。

![](https://i.imgur.com/9M4jfxt.jpg)

::info
**覆蓋率報告**
- % Stmts (語句覆蓋率) 程式碼中的每個語句是否皆有執行。
- % branch(分支覆蓋率) 當程式碼中有分支時，例如 if-else，分支內容是否皆有執行。
- % Funcs(功能覆蓋率) 程式碼中的每個功能是否皆有執行。
- % Lines(行覆蓋率) 指的是程式碼文件中的每個可執行行，是否皆有執行。
- Uncovered Line #s 未執行程式碼於檔案中的行數
::
