import { createApp } from "vue";
import App from "./App.vue";
import EllipsisTitle from "@/index";

const app = createApp(App);
app.use(EllipsisTitle);
app.mount("#app");
