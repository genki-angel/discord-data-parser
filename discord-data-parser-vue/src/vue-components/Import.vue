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
  <div class="flex">
    <div class="loading" v-if="isLoading">{{ loadingState }}</div>
    <div class="flex" v-else>
      <div
        class="button unselectable"
        style="font-size: 2.5em"
        @click="importTest()"
      >
        Click to import data
      </div>
      <!-- <div class="button unselectable disable" style="font-size: 1.5em">
        Import options [WIP]
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { indexPackage } from "../typescript/indexPackage";
import { defineComponent } from "vue";

declare let Neutralino: any;

export default defineComponent({
  data() {
    return {
      isLoading: false,
      loadingState: "Indexing data...",
    };
  },
  methods: {
    importTest() {   
      Neutralino.os.showOpenDialog('Open a file', {
        filters: [
          {name: 'package.zip', extensions: ['zip']},
        ]
      }).then(async (result: any) => {
        const path = result[0];
        this.isLoading = true;
        this.loadingState = "Loading data...";
        await Neutralino.filesystem.readBinaryFile(path).then(async (result: any) => {
          this.loadingState = "Indexing data...";
          const index = await indexPackage(result);
          if (index != null) {
            this.eventbus.emit("importFile", index); // sends data back
            this.eventbus.emit("goto", 2);
          }
          this.isLoading = false;
        });
      });
    }
  },
});
</script>

<style lang="scss">
@import "../scss/variables";
.loading {
  font-size: 2em;
  color: $fg-dark;
  padding: 0.5em;
}
</style>
