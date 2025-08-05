import { createApp } from 'vue';
import App from './App.vue';
import {imageDBPlugin} from '../src';

const app = createApp(App);
app.use(imageDBPlugin);
app.mount('#app');