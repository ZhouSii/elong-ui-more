declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
