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
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    filesystem: [
      './src/**/*.{vue,ts,tsx,js,jsx}',
      './src/**/*.vue',
      './src/**/*.tsx'
    ]
  }
});
