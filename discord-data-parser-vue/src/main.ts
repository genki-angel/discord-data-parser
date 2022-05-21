import { createApp } from "vue";
import Main from "./Main.vue";
import { appState } from "./store/appState";
import { channelViewer } from "./store/channelViewer";
import { messageStore } from "./store/messageStore";

Neutralino.init();
const app = createApp(Main);

Neutralino.events.on('ready', () => {
    channelViewer.messages = [];
    messageStore.dms = [];
    messageStore.groups = [];
    messageStore.servers = [];
    app.mount("#app");
});
