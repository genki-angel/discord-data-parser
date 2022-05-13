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
    <div class="backpanel">
        <div>Account data</div>
        <div class="grid">
            <div class="unselectable">User ID:&nbsp;</div>
            <div>...</div>
            <div class="unselectable">Username:&nbsp;</div>
            <div>...</div>
            <div class="unselectable">Email:&nbsp;</div>
            <div>...</div>
            <div class="unselectable">Is verified:&nbsp;</div>
            <div>...</div>
            <div class="unselectable">Mobile Number:&nbsp;</div>
            <div>...</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
	export default defineComponent({});
</script>

<style scoped lang="scss">
@import "../scss/variables";
    .grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        color: $fg-dark;
    }
    .grid div:nth-child(odd) {
        text-align: right;
        opacity: 0.6;
    }
    .backpanel {
        margin: 4px;
    }
</style>