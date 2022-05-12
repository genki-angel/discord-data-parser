import { createApp } from "vue";
import App from "./App.vue";

import mitt from "mitt";
const eventbus = mitt();

declare let Neutralino: any;
Neutralino.init();

const app = createApp(App);
app.config.globalProperties.eventbus = eventbus;
app.mount("#app");