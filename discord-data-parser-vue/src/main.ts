import { createApp } from "vue";
import Main from "./Main.vue";

const app = createApp(Main);


declare let Neutralino: any;
Neutralino.init();

Neutralino.events.on('ready', () => {
    app.mount("#app");
});