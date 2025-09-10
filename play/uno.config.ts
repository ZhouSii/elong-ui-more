// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons
} from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  presets: [
    presetUno(), // 基础预设
    presetAttributify(), // 属性化模式支持
    presetIcons() // 图标支持
  ],
  transformers: [
    transformerDirectives(), // @apply, @screen 等指令支持
    transformerVariantGroup() // 样式组变体支持，如 hover:(bg-gray-100 text-gray-900)
  ],
  // 自定义规则
  rules: [
    // 支持 p-10px, m-20px 等精确像素值
    [/^p-(\d+)px$/, ([, d]) => ({ padding: `${d}px` })],
    [/^pt-(\d+)px$/, ([, d]) => ({ 'padding-top': `${d}px` })],
    [/^pr-(\d+)px$/, ([, d]) => ({ 'padding-right': `${d}px` })],
    [/^pb-(\d+)px$/, ([, d]) => ({ 'padding-bottom': `${d}px` })],
    [/^pl-(\d+)px$/, ([, d]) => ({ 'padding-left': `${d}px` })],
    [
      /^px-(\d+)px$/,
      ([, d]) => ({ 'padding-left': `${d}px`, 'padding-right': `${d}px` })
    ],
    [
      /^py-(\d+)px$/,
      ([, d]) => ({ 'padding-top': `${d}px`, 'padding-bottom': `${d}px` })
    ],

    [/^m-(\d+)px$/, ([, d]) => ({ margin: `${d}px` })],
    [/^mt-(\d+)px$/, ([, d]) => ({ 'margin-top': `${d}px` })],
    [/^mr-(\d+)px$/, ([, d]) => ({ 'margin-right': `${d}px` })],
    [/^mb-(\d+)px$/, ([, d]) => ({ 'margin-bottom': `${d}px` })],
    [/^ml-(\d+)px$/, ([, d]) => ({ 'margin-left': `${d}px` })],
    [
      /^mx-(\d+)px$/,
      ([, d]) => ({ 'margin-left': `${d}px`, 'margin-right': `${d}px` })
    ],
    [
      /^my-(\d+)px$/,
      ([, d]) => ({ 'margin-top': `${d}px`, 'margin-bottom': `${d}px` })
    ],

    // 自定义类名规则示例
    ['custom-rule', { color: 'red' }]
  ],
  // 自定义快捷方式
  shortcuts: {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-primary': 'text-white bg-blue-500 hover:bg-blue-700'
  },
  // 主题配置
  theme: {
    colors: {
      primary: '#4f46e5',
      secondary: '#2dd4bf'
    }
  },
  // 确保 UnoCSS 在开发模式下正常工作
  safelist: 'prose prose-sm m-auto text-left'.split(' ')
});
