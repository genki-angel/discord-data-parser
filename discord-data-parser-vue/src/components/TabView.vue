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
	<div class="tabs">
		<button class="button" @click="changeTab(1)" > User Data</button>
		<button class="button" @click="changeTab(2)" > Message Browser</button>
		<button class="button" @click="changeTab(3)" > Message Search</button>
	</div>
	<div v-if="selectedTab == 1" id="userData" class="tabContent">
		<UserData />
	</div>
	<div v-if="selectedTab == 2" id="messageBrowser" class="tabContent">MESSAGE BROWSER</div>
	<div v-if="selectedTab == 3" id="messageSearch" class="tabContent">MESSAGE SEARCH</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import UserData from "./UserData.vue";
	export default defineComponent({
    data() {
        return {
            selectedTab: 1
        };
    },
    methods: {
        async changeTab(tab: number) {
            this.selectedTab = tab;
        }
    },
    components: { UserData }
});
</script>

<style scoped lang="scss">
@import "../scss/variables";
button {
	cursor: pointer;
	color: $fg-dark;
	background-color: $accent2-dark;
	padding: 1em;
	margin: 0;
	text-align: center;
	width: fit-content;
	border: none;

	transition: 0.2s;
	&:hover {
		background-color: $accent1-dark;
	}
}
.tabs {
  overflow: hidden;
  border: 1px solid $accent3-dark;
  background-color: $bg-dark;
}
.tabContent {
  border: 1px solid $accent3-dark;
  background-color: $bg-dark;
}
</style>