import { createApp } from "vue";
import App from "./App.vue";


createApp(App).mount("#app");

window.addEventListener("unhandledrejection", (e) => {
   console.log("addEventListener error", e);
});
