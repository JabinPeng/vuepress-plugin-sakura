<!--
 * @Author: Jabin
 * @Date: 2022-03-08 21:16:42
 * @LastEditors: Jabin
 * @LastEditTime: 2022-03-08 21:38:16
 * @Descripttion: 
-->
## 💌 vuepress-plugin-sakura

> 项目地址：[http://www.zpzpup.com/blog]

> vue vuepress vuepress-theme-reco  感谢各位大佬 😁

## 📢 说明

***放到开头，这里重点说明下，大家如果有啥问题咱就直接提‘Issues’吧，后面朋友遇到相同问题大家也可以参考***

## 🏠 项目截图
<p align="center">
  <img width="900" src="http://www.zpzpup.com/assets/image/blog04.png">
</p>


## 📎 项目配置也是很简单
> npm install vuepress-plugin-sakura -D

or

>cnpm install vuepress-plugin-sakura -D

## 版本更新
> 1.1.0 修复打包报错

> 1.2.0 更改图片逻辑 避免重复请求 感谢[hahaxiaowai](https://github.com/hahaxiaowai)的pr


```js
// 只要把这个放进 config的plugins中就可以了 有木有很简单
 ["sakura", {
        num: 20,  // 默认数量
        show: true, //  是否显示
        zIndex: -1,   // 层级
        img: {
          replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: '...'     // 绝对路径
        }     
    }]
```
如果觉得很省事，帮到你了可以点个 ⭐ star 感激不尽 😁😁😁  ***github***[链接：🚀](https://github.com/JabinPeng/vuepress-plugin-sakura).



