import { createApp } from 'vue';
import App from './App.vue';
import IconCachePlugin from '@/index';

const app = createApp(App);
app.use(IconCachePlugin);
app.mount('#app');
