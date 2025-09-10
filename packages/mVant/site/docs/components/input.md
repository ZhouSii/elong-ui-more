# EvInput 输入框

基于 `van-filed` 二次封装的输入框

## 用法

<ev-input label="默认" v-model="input" placeholder="Please input" />
<ev-input label="禁用" disabled v-model="input" placeholder="Please input" />
<ev-input label="只读" readonly v-model="input" placeholder="Please input" />


<script setup>
    import { ref } from 'vue'
    import { EvInput } from '@elong-ui/vant'
    const input = ref('')
</script>

::: details 显示代码

```vue
<template>
  <ev-input label="输入框" v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>
```

:::

::: tip 提示

ev-input 属性全部支持 `van-filed `的属性，以下属性仅展示了部分，具体可查看[van-filed](https://vant-contrib.gitee.io/vant/#/zh-CN/field)官方文档。

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入的值 | _number \| string_ | - |
| label | 输入框左侧文本 | _string_ | - |
| name | 名称，作为提交表单时的标识符 | _string_ | - |
| id | 输入框 id，同时会设置 label 的 for 属性 | _string_ | `van-field-n-input` |
| type | 输入框类型, 支持原生 input 标签的所有 [type 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types)，额外支持了 `digit` 类型 | _FieldType_ | `text` |
| size | 大小，可选值为 `large` | _string_ | - |
| maxlength | 输入的最大字符数 | _number \| string_ | - |
| placeholder | 输入框占位提示文字 | _string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法输入内容 | _boolean_ | `false` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| center | 是否使内容垂直居中 | _boolean_ | `false` |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | _boolean_ | `false` |
| clear-icon `v3.0.12` | 清除图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | `clear` |
| clear-trigger | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | _FieldClearTrigger_ | `focus` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| autofocus | 是否自动聚焦，iOS 系统不支持该属性 | _boolean_ | `false` |
| show-word-limit | 是否显示字数统计，需要设置 `maxlength` 属性 | _boolean_ | `false` |
| error | 是否将输入内容标红 | _boolean_ | `false` |
| error-message | 底部错误提示文案，为空时不展示 | _string_ | - |
| error-message-align | 错误提示文案对齐方式，可选值为 `center` `right` | _FieldTextAlign_ | `left` |
| formatter | 输入内容格式化函数 | _(val: string) => string_ | - |
| format-trigger | 格式化函数触发的时机，可选值为 `onBlur` | _FieldFormatTrigger_ | `onChange` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | _string_ | `right` |
| label-class | 左侧文本额外类名 | _string \| Array \| object_ | - |
| label-width | 左侧文本宽度，默认单位为 `px` | _number \| string_ | `6.2em` |
| label-align | 左侧文本对齐方式，可选值为 `center` `right` `top` | _FieldTextAlign_ | `left` |
| input-align | 输入框对齐方式，可选值为 `center` `right` | _FieldTextAlign_ | `left` |
| autosize | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | _boolean \| FieldAutosizeConfig_ | `false` |
| left-icon | 左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | - |
| right-icon | 右侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | - |

### Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| update:model-value | 输入框内容变化时触发 | _value: string (当前输入的值)_ |
| focus | 输入框获得焦点时触发 | _event: Event_ |
| blur | 输入框失去焦点时触发 | _event: Event_ |
| clear | 点击清除按钮时触发 | _event: MouseEvent_ |
| click | 点击组件时触发 | _event: MouseEvent_ |
| click-input | 点击输入区域时触发 | _event: MouseEvent_ |
| click-left-icon | 点击左侧图标时触发 | _event: MouseEvent_ |
| click-right-icon | 点击右侧图标时触发 | _event: MouseEvent_ |

### 方法




