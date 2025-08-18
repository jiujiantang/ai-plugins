import { createApp } from 'vue';
import App from './App.vue';
import VuePopupPlugin from "@/index";
import PopupContentPlugin from "../src/plugins/HtmlContentPlugin.vue";

const app = createApp(App);
app.use(VuePopupPlugin).use(PopupContentPlugin);
app.mount('#app');