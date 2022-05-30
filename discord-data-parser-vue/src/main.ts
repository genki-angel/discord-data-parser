import { createApp } from "vue";
import Main from "./Main.vue";
import { appState } from "./store/appState";
import { channelViewer } from "./store/channelViewer";

Neutralino.init();
const app = createApp(Main);

Neutralino.events.on('ready', () => {
    channelViewer.messages = [];
    app.mount("#app");
});
