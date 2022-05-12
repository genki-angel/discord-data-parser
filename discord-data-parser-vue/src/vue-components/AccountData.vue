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
    <div id="accountdata" class="backpanel">
      <div class="key unselectable">ID:</div>
      <div>{{ index.user.id }}</div>
      <div class="key unselectable">Username:</div>
      <div>
        {{ index.user.name }}#{{ index.user.tag}}
      </div>
      <div class="key unselectable">Email:</div>
      <div>{{ index.user.email }}</div>
      <div class="key unselectable">Is Verified?:</div>
      <div>{{ index.user.isVerified }}</div>
      <div class="key unselectable">Has Mobile?:</div>
      <div>{{ index.user.hasMobile }}</div>
      <div class="key unselectable">Phone:</div>
      <div>{{ index.user.mobile }}</div>
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
#accountdata {
  color: $fg-dark;
  padding-left: 2em;
  padding-right: 2em;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  div {
    font-size: 1.5em;
    margin: 0.2em;
  }
  .key {
    opacity: 0.4;
  }
}
</style>
