import { createApp } from "vue";
import language from "./language";
import App from "./App.vue";

createApp(App)
  .use(language)
  .mount("#app");
