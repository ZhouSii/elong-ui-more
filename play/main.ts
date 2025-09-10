import { createApp } from 'vue';
import App from './app.vue';
import './src/styles/global.css';
// 导入完整的 Element Plus 样式
import 'element-plus/dist/index.css';
// 先加载 UnoCSS
import 'virtual:uno.css';
// 组件
import ElongUI from '@elong-ui/element';

const app = createApp(App);
app.use(ElongUI);
app.mount('#app');
