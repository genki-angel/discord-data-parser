import { createApp, ref} from "vue";
import Main from "./Main.vue";

Neutralino.init();
const app = createApp(Main);

Neutralino.events.on('ready', () => {
    app.mount("#app");
});