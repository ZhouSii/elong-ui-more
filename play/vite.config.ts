import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [
    UnoCSS(), // 添加 UnoCSS 插件
    AutoImport({
      imports: ['vue']
    }),
    Components({
      // 移除 ElementPlusResolver，因为对二次封装组件无效
      dts: true
    }),
    vue(),
    vueJSX(), // 添加 JSX 支持
    VueSetupExtend()
  ]
});
