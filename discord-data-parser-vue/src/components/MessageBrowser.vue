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
	<div class="grid">
		<div class="channelList">
			<div class="container">
				<div class="tabs">
					<button class="button" @click="changeTab(1)">Servers</button>
					<button class="button" @click="changeTab(2)">DMs</button>
					<button class="button" @click="changeTab(3)">Groups</button>
				</div>
				<div v-if="selectedTab == 1" id="serverList" class="tabContent">
					Server data...
				</div>
				<div v-if="selectedTab == 2" id="dmList" class="tabContent">
					DM data...
				</div>
				<div v-if="selectedTab == 3" id="groupList" class="tabContent">
					Group data...
				</div>
			</div>
		</div>
		<div class="messageList">
			
		</div>
		<div class="controlBar backpanel">
			<div class="channelControls">
				<div class="displayID"> <span>Channel ID:&nbsp;</span>...</div>
				<div class="controls">
					<button>Copy</button>
					<button>Export to Text file</button>
					<button>Open in Browser</button>
					<button>Open in Client</button>
				</div>
			</div>
			<div class="messageControls">
				<div class="displayID"> <span>Message ID:&nbsp;</span>...</div>
				<div class="controls">
					<button>Copy ID</button>
					<button>Copy Contents</button>
					<button>Copy Timestamp</button>
					<button>Open in Browser</button>
					<button>Open in Client</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
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
	});
</script>

<style scoped lang="scss">
@import "../scss/variables";

.grid {  
	height: 100%;
	padding: 1em;
	display: grid;
	box-sizing: border-box;
 	grid-template-columns: 1fr 2fr;
  	grid-template-rows: 2fr 1fr;
  	gap: 1em 1em;
  	grid-auto-flow: row;
  	grid-template-areas:
    	"channelList messageList"
    	"channelList controlBar";
}

.channelList { grid-area: channelList; padding: 0;}

.messageList { grid-area: messageList; border: 2px solid $accent3-dark;}

.controlBar { grid-area: controlBar; 
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 1em;
}

.container {
	display: flex;
	flex-direction: column;
	color: $fg-dark;
	height: 100%;
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

.controls button {
	cursor: pointer;
	color: $fg-dark;
	background-color: $accent3-dark;
	border: none;

	&:hover {
		background-color: $accent1-dark;
	}
}
.displayID {
	padding: 2px;
	background-color: $accent3-dark;
	opacity: 0.7;
}
.displayID span {
	opacity: 0.6;
	user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-o-user-select: none;
}
.tabs {
	overflow: hidden;
	background-color: $bg-dark;
}
.tabContent {
	border: 2px solid $accent3-dark;
	background-color: $bg-dark;
	flex: 1;
	overflow: auto;
}


</style>