import { createApp } from 'vue';
import App from './App.vue';
import VuePopupPlugin from "@/index";

const app = createApp(App);
app.use(VuePopupPlugin);
if(typeof window !== 'undefined') {
    window.easyPop = VuePopupPlugin;
}
app.mount('#app');