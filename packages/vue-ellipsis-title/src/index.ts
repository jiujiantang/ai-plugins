import { App } from "vue";
import { vEllipsisTitle } from "./core/TitleCore";

export default {
  install(app: App) {
    app.directive("ellipsis-title", vEllipsisTitle);
  },
};