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
					<div class="serverGroup" v-for="server in messageStore.servers" :key="server.id">
						<span class="serverName"> {{server.name}} </span>
						<span @click="openChannel(channel.id)" class="serverChannel" v-for="channel in server.channels" :key="channel.id"> {{channel.name}} </span>
					</div>
				</div>
				<div v-if="selectedTab == 2" id="dmList" class="tabContent">
					<div @click="openChannel(channel.id)" class="channel" v-for="channel in messageStore.dms" :key="channel.id">
						{{channel.name}}
					</div>
				</div>
				<div v-if="selectedTab == 3" id="groupList" class="tabContent">
					<div @click="openChannel(channel.id)" class="channel" v-for="channel in messageStore.groups" :key="channel.id">
						{{channel.name}}
					</div>
				</div>
			</div>
		</div>
		<div class="messageList">
			<div v-if="channelViewer.isLoading">IMPORTING MESSAGES.....</div>
			<div @click="selectMessage(message)" class="message" v-for="message in channelViewer.messages" :key="message.id" v-else>
				{{message.content}}
				<span style="display: block;" v-if="message.attachment != ''">Attachment: {{message.attachment}}</span>
			</div>
		</div>
		<div class="controlBar backpanel">
			<div class="channelControls">
				<div class="displayID"> <span>Channel Tools - ID:&nbsp;</span> {{appState.selectedChannel}} </div>
				<div class="controls">
					<button @click="copyToClipboard(appState.selectedChannel)" >Copy ID</button>
					<!-- <button>Export to Text file</button> -->
					<button @click="openDiscord(appState.selectedChannel, '', false)" >Open in Browser</button>
					<button @click="openDiscord(appState.selectedChannel, '', true)" >Open in Client</button>
				</div>
			</div>
			<div class="messageControls">
				<div class="displayID"> <span>Message Tools - ID:&nbsp;</span> {{channelViewer.selectedMessage.id}} </div>
				<div class="controls">
					<button @click="copyToClipboard(channelViewer.selectedMessage.id)">Copy ID</button>
					<button @click="copyToClipboard(channelViewer.selectedMessage.content)">Copy Contents</button>
					<button @click="copyToClipboard(channelViewer.selectedMessage.timestamp)">Copy Timestamp</button>
					<button @click="copyToClipboard(channelViewer.selectedMessage.attachment)">Copy Attachment</button>
					<button @click="openDiscord(appState.selectedChannel, channelViewer.selectedMessage.id, false)">Open in Browser</button>
					<button @click="openDiscord(appState.selectedChannel, channelViewer.selectedMessage.id, true)"> Open in Client </button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { appState } from '@/store/appState';
	import { messageStore } from '@/store/messageStore';
	import { channelViewer } from "@/store/channelViewer";
	import { loadChannelZip } from '@/typescript/loadChannelZip';
	import { copyToClipboard } from "@/typescript/copyToClipboard";
	import { openDiscordLink } from "@/typescript/openDiscordLink";
	import { ref } from 'vue';
	const selectedTab = ref(2)

	function changeTab(tab: number) {
		selectedTab.value = tab;
	}

	function openChannel(id: string) {
		if(appState.selectedChannel == id) {
			return;
		}
		appState.selectedChannel = id;
		if(appState.mode == "zip") {
			loadChannelZip(id);
		}
	}

	function selectMessage(item: any) {
		if(channelViewer.selectedMessage.id == item.id) {
			return;
		}
		channelViewer.selectedMessage = item;
	}

	function openDiscord(channelID: string, messageID: string ,client: boolean) {
		let found = false;
		messageStore.servers.forEach(server => {
			if(found){return};
			server.channels.forEach(channel => {
				if(channelID == channel.id) {
					openDiscordLink(channelID, messageID, server.id+"/", client)
					found = true
					return;
				}
			})
		})
		if(found){return};
		openDiscordLink(channelID, messageID, "@me/", client);
	}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.grid {  
	height: 100%;
	padding: 2px;
	display: grid;
	box-sizing: border-box;
 	grid-template-columns: 1fr 2fr;
  	grid-template-rows: 2fr 1fr;
  	gap: 2px 2px;
  	grid-auto-flow: row;
  	grid-template-areas:
    	"channelList messageList"
    	"channelList controlBar";
}

.channelList { grid-area: channelList; padding: 0;}

.messageList { grid-area: messageList; 
	border: 2px solid $accent3-dark; 
	overflow: auto;
	overflow-wrap: break-word;
	padding: 4px;
	background-color: $accent3-dark;
}

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
	padding: 2px;
}

.serverGroup {
	background-color: $accent3-dark;
	padding: 2px;
	margin-bottom: 4px;
}

.serverName {
	font-size: 1.5em;
	display: block;
	margin: 4px;
}

.serverChannel {
	display: block;
	margin: 4px;
	padding: 4px;
	background-color: $accent2-dark;
	cursor: pointer;

	&:hover {
		background-color: $accent1-dark;
	}
}

.channel {
	margin-bottom: 4px;
	padding: 4px;
	background-color: $accent3-dark;
	cursor: pointer;

	&:hover {
		background-color: $accent1-dark;
	}
}

.message {
	padding: 4px;
	margin-bottom: 2px;
	background-color: $accent2-dark;
	cursor: pointer;

	&:hover {
		background-color: $accent1-dark;
	}
}

</style>