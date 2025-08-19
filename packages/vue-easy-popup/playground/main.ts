import { createApp } from 'vue';
import App from './App.vue';
import VuePopupPlugin from "@/index";

const app = createApp(App);
app.use(VuePopupPlugin)
app.mount('#app');