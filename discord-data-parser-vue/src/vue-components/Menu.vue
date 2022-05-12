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
  <div class="flex backpanel" style="font-size: 1.5em">
    <div class="button unselectable" @click="goto(3)">Account Data</div>
    <div class="button unselectable" @click="goto(4)">Servers</div>
    <div class="button unselectable" @click="goto(5)">Friends</div>
    <div class="button unselectable" @click="goto(6)">Message Browser</div>
    <div class="button unselectable disable">Search Messages</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    goto(goto: number) {
      this.eventbus.emit("goto", goto);
    },
  },
});
</script>

<style lang="scss"></style>
