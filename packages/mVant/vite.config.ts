/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';
import dts from 'vite-plugin-dts';
// import pluginUnocss from 'unocss/vite';
// import unocssOptions from './unocssOptions';
import vueJSX from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  base: './',
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'happy-dom'
  },
  plugins: [
    // pluginUnocss(unocssOptions),
    vue(),
    vueJSX(),
    VueSetupExtend(),
    dts({
      entryRoot: './src',
      outputDir: ['./ui/es', './ui/lib'],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: './tsconfig.json'
    })
  ],
  build: {
    target: 'modules',
    // //打包文件目录
    outDir: 'es',
    //压缩
    minify: false,
    //css分离
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'vant'],
      input: ['./src/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          //配置打包根目录
          dir: path.resolve(__dirname, './ui/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          //配置打包根目录
          dir: path.resolve(__dirname, './ui/lib')
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      name: 'elongVant',
      formats: ['es', 'cjs']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 启用 CSS 模块化
        modules: true
      }
    }
  }
});
