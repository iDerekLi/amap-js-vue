# amap-js-vue

[![Build Status](https://travis-ci.org/iDerekLi/amap-js-vue.svg?branch=master)](https://github.com/iderekli/amap-js-vue)
[![npm version](https://img.shields.io/npm/v/amap-js-vue.svg?style=flat-square)](https://www.npmjs.com/package/amap-js-vue)
[![npm downloads](https://img.shields.io/npm/dt/amap-js-vue.svg?style=flat-square)](https://www.npmjs.com/package/amap-js-vue)
[![npm downloads](https://img.shields.io/npm/dm/amap-js-vue.svg?style=flat-square)](https://www.npmjs.com/package/amap-js-vue)
[![JS Gzip Size](https://img.badgesize.io/https://unpkg.com/amap-js-vue/lib/amap-js-vue.min.js?compression=gzip&style=flat-square&label=JS%20gzip%20size)](https://github.com/iderekli/amap-js-vue)
[![npm license](https://img.shields.io/npm/l/amap-js-vue.svg?style=flat-square)](https://github.com/iderekli/amap-js-vue)


`amap-js-vue` 是基于 Vue.js 和 高德地图 AMap JavaScript API 的地图组件。

开发者在使用高德地图API更加得心应手。

## 安装

npm:

```shell
$ npm install amap-js-vue --save
```

Yarn:

```shell
$ yarn add amap-js-vue
```

## 引入组件

### 方式一.导入所有组件

```javascript
import Vue from 'vue';
import AMapJS from 'amap-js-vue';
import 'amap-js-vue/lib/index.css';

// 安装并添加配置
// 如果在添加配置可以调用 AMapJS.config({});
Vue.use(AMapJS, {
  AMap: 'https://webapi.amap.com/maps?key=您申请的高德key值&v=1.4.15&plugin=[]',
  AMapUI: 'https://webapi.amap.com/ui/1.0/main-async.js', // default: false
});
```

### 方式二.手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件

```javascript
import config from 'amap-js-vue/config';
import Map from 'amap-js-vue/lib/map';
import 'amap-js-vue/lib/map/style';

// 添加配置
config({
  AMap: 'https://webapi.amap.com/maps?key=您申请的高德key值&v=1.4.15&plugin=[]',
  AMapUI: 'https://webapi.amap.com/ui/1.0/main-async.js', // default: false
});
```

### 方式三.自动按需引入组件 (推荐)

# 安装插件
npm i babel-plugin-import -D

```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'amap-js-vue',
      libraryDirectory: 'es',
      style: true
    }, 'amap-js-vue']
  ]
};
```

```javascript
// 接着你可以在代码中直接引入 Vant 组件
// 插件会自动将代码转化为方式二中的按需引入形式
import { config, Map } from 'amap-js-vue';

// 添加配置
config({
  AMap: 'https://webapi.amap.com/maps?key=您申请的高德key值&v=1.4.15&plugin=[]',
  AMapUI: 'https://webapi.amap.com/ui/1.0/main-async.js', // default: false
});
```

## 快速上手

### 地图组件

```vue
<template>
  <am-map :init-map-options="options" style="width: 300px; height: 300px;"></am-map>
</template>

<script>
export default {
  data() {
    return {
      options: {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [116.397428, 39.90923] //初始化地图中心点
      },
    };
  },
};
</script>
```

### 自定义组件

开发者根据需要定制组件满足自身需求。这里提供一个 `createComponent` 方法来创建组件;

my-component.vue
```vue
<template>
  <div>{{ msg }}</div>
</template>

<script>
import { createComponent } from 'amap-js-vue';

export default createComponent({
  name: 'AmMyComponent',
  data() {
    return {
      msg: 'Hello, MyComponent',
    };
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
  },
  ready() {
    console.log('ready');
    const { AMap, AMapUI, map } = this.$maproot;
  },
  destroyed() {
    console.log('destroyed');
  },
});
</script>

<style></style>
```

以上是个简单当例子。 
由于高德地图API的特殊性，所以除了Vue自身的Options API以外主要扩展了一个关键的生命周期`ready`，
它的主要特性是在地图 API 和 `map` 实例都创建好并且自身组件mounted生命周期之后所调用。

`$maproot`: 是指向 `am-map` 组件实例。包含 `AMap`、 `AMapUI`(可选)、 `map`。

## 链接

[AMap JavaScript API](https://lbs.amap.com/api/javascript-api/summary)

[AMap UI JavaScript API](https://lbs.amap.com/api/javascript-api/guide/amap-ui/intro)

# License

Licensed under [MIT](https://opensource.org/licenses/mit)

Copyright (c) 2019-present [Derek Li](https://github.com/iDerekLi)

