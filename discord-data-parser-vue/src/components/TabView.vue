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
	<div class="container">
		<MenuBar />
		<div class="loading" v-if="appState.isLoading">IMPORTING DATA....</div>
		<div class="tabs">
			<button @click="changeTab(1, $event)"> Account Data</button>
			<button @click="changeTab(2, $event)"> Message Browser</button>
			<!-- <button class="button" @click="changeTab(3)" > Message Search</button> -->
		</div>
		<div v-if="selectedTab == 1" id="accountData" class="tabContent">
			<AccountData />
		</div>
		<div v-if="selectedTab == 2" id="messageBrowser" class="tabContent">
			<MessageBrowser />
		</div>
		<div v-if="selectedTab == 3" id="messageSearch" class="tabContent">MESSAGE SEARCH</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import AccountData from "./AccountData.vue";
	import MessageBrowser from "./MessageBrowser.vue";
	import MenuBar from "./MenuBar.vue";
	import { appState } from "@/store/appState";

	const selectedTab = ref(2)

	function changeTab(tab: number, event: MouseEvent) {
		selectedTab.value = tab;
	}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	color: $fg-dark;
}

.tabs button {
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
  flex: 1;
  overflow: auto;
}
.loading {
	color: $bg-dark;
}
</style>