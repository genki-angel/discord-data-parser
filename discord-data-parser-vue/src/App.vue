<!--
Copyright (C) 2022 genki-ai

This file is part of discord-data-reader-vue.

discord-data-reader-vue is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

discord-data-reader-vue is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with discord-data-reader-vue.  If not, see <http://www.gnu.org/licenses/>.
-->
<template>
  <div id="container" class="flex">
    <component :is="componentView" :index="index"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dpIndex from "./typescript/classes/dpIndex";
import AccountData from "./vue-components/AccountData.vue";
import FriendList from "./vue-components/FriendList.vue";
import Import from "./vue-components/Import.vue";
import Menu from "./vue-components/Menu.vue";
import ServerList from "./vue-components/ServerList.vue";
import MessageBrowser from "./vue-components/MessageBrowser.vue";

export default defineComponent({
  data() {
    return {
      componentState: 1,
      // 1 - Import
      // 2 - Menu
      // 3 - Account Data
      // 4 - Server List
      // 5 - Friend List
      // 6 - Message Browser
      index: {},
    };
  },
  components: {
    Import,
    Menu,
    AccountData,
    ServerList,
    FriendList,
    MessageBrowser,
  },
  computed: {
    componentView() {
      switch (this.componentState) {
        case 2: {
          return Menu;
        }
        case 3: {
          return AccountData;
        }
        case 4: {
          return ServerList;
        }
        case 5: {
          return FriendList;
        }
        case 6: {
          return MessageBrowser;
        }
        default: {
          return Import; // default back to import if any errors occur
        }
      }
    },
  },
  mounted() {
    this.eventbus.on("importFile", (data: dpIndex) => {
      this.index = data;
    });
    this.eventbus.on("goto", (goto: number) => {
      this.componentState = goto;
    });
    this.eventbus.on("requestIndex", () => {
      this.eventbus.emit("sendIndex", this.index);
    });
  },
});
</script>

<style lang="scss">
@import "./scss/variables";
@import "./scss/global";

#container {
  height: 100vh;
  padding: 2em;
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  background: $bg-dark;
}
</style>
