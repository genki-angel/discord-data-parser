<!--
 Copyright (C) 2022 genki_angel
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
    <div class="menubar">
        <button >Import from ZIP</button>
        <button @click="generateAbout()">About</button>
        <button @click="gotoHelp()">Help</button>
        <button class="right" @click="exitApp()">Exit</button>
    </div>
</template>

<script setup lang="ts">
    import { generateAbout } from "@/typescript/generateAbout";
    import { gotoHelp } from "@/typescript/gotoHelp";
    import { exitApp } from "@/typescript/exitApp";   
</script>

<style lang="scss">
    .right {
        float: right;
    }
</style>
