# 快速开始

本节将介绍如何在项目中使用 EvUI

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue';
import elongVant from '@elong-ui/vant';
import App from './App.vue';

const app = createApp(App);

app.use(elongVant);
app.mount('#app');
```

### 按需导入 <van-tag type="primary" style="vertical-align: middle;" effect="dark" size="small">推荐</van-tag>

```typescript
// main.ts
import { createApp } from 'vue';
import { EvInput, EvSelect, EvRadio } from '@elong-ui/vant';
import App from './App.vue';

const app = createApp(App);

app.use(EvInput).use(EvSelect).use(EvRadio);
app.mount('#app');
```

::: tip 注意

EvUI 并未集成Vant4 ，当前所有操作都应在安装完成 vant4 后进行。详细方法请参考[Vant4](https://vant-contrib.gitee.io/vant/#/zh-CN/home)官方文档。

:::

<!-- ## 用法

<van-button type="primary">主要按钮</van-button>
<van-button type="success">成功按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>

::: details 显示代码

```js
<van-button type="primary">主要按钮</van-button>
<van-button type="success">成功按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
```

:::

<EvInput required maxlength="3" label="elong-vant" />
<EvInput required maxlength="3" label="elong-vant" />
<EvInput required maxlength="3" label="elong-vant" />
<EvInput required maxlength="3" label="elong-vant" /> -->

<script setup>
    // import { Button } from 'vant';
    import { EvInput } from '@elong-ui/vant'
</script>
