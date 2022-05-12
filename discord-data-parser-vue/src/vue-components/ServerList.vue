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
    <div id="serverlist" class="backpanel">
      <div
        v-for="item in index?.servers"
        :key="item.id"
        class="unselectable item"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="button unselectable" @click="goto(2)" style="font-size: 1.5em">
      Go back
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["index"],
  methods: {
    goto(goto: number) {
      this.eventbus.emit("goto", goto);
    },
  },
});
</script>

<style lang="scss">
@import "../scss/variables";
#serverlist {
  max-height: 70vh;
  padding: 1em;
  text-align: center;
  overflow-x: hidden;
  overflow-y: scroll;
  color: $fg-dark;
}
.item {
  padding: 1em;
  font-size: 1.5em;
  transition: 0.2s;
  border-radius: 0.5em;
  &:hover {
    background-color: $accent1-dark;
    cursor: pointer;
  }
}
</style>
