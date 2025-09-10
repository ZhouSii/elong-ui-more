import { createApp } from 'vue';
import App from './App.vue';

// import { EvInput, EvSelect } from '@elong-ui/vant';
import elongVant from '@elong-ui/vant';

const app = createApp(App);

// console.log('EvInput:', EvInput);
// console.log('EvSelect:', EvSelect);

// app.use(EvInput).use(EvSelect);
app.use(elongVant);
app.mount('#app');
