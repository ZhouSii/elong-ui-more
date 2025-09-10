import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';
import dts from 'vite-plugin-dts';
import vueJSX from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';

export default defineConfig(({ mode }) => {
  const isWatch = mode === 'development';

  return {
    base: './',
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      UnoCSS(), // 添加 UnoCSS 插件
      vue(),
      vueJSX(),
      VueSetupExtend(),
      dts({
        entryRoot: './src',
        //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
        tsConfigFilePath: '../../tsconfig.json',
        // 排除测试和示例文件
        exclude: ['**/node_modules/**', '**/ui/**', '**/dist/**'],
        // 避免重复生成
        insertTypesEntry: true,
        // watch 模式下跳过类型检查以提高性能
        skipDiagnostics: isWatch,
        // watch 模式下只输出到 es 目录
        outputDir: isWatch ? ['./ui/es'] : ['./ui/es', './ui/lib']
      })
    ],
    build: {
      target: 'modules',
      //打包文件目录 - 设置为相对路径避免嵌套
      outDir: './ui/es',
      //压缩
      minify: !isWatch,
      //css分离
      cssCodeSplit: false,
      // watch 模式下的优化
      watch: isWatch
        ? {
            include: ['src/**'], // 只监听src目录
            exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts'] // 排除测试文件
          }
        : null,
      rollupOptions: {
        external: [
          'vue',
          'element-plus',
          '@element-plus/icons-vue',
          // 确保图标库的路径也被外部化
          /^@element-plus\/icons-vue/
        ],
        input: ['./src/index.ts'],
        output: isWatch
          ? [
              // watch 模式下只输出 ES 格式以提高速度
              {
                format: 'es',
                entryFileNames: '[name].mjs',
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'named',
                dir: './ui/es'
              }
            ]
          : [
              // 生产模式下输出两种格式
              {
                format: 'es',
                entryFileNames: '[name].mjs',
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'named',
                dir: './ui/es'
              },
              {
                format: 'cjs',
                entryFileNames: '[name].js',
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'named',
                dir: './ui/lib'
              }
            ]
      },
      lib: {
        entry: './src/index.ts',
        name: 'elongElement',
        formats: isWatch ? ['es'] : ['es', 'cjs']
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
  };
});
