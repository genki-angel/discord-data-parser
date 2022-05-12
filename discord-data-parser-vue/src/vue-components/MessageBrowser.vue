<template>
	<div class="browsergrid">
    	<div class="tablist backpanel">
      		<div class="tabs">
        		<div id="serverTab" class="button unselectable tab highlight" @click="tab(1)">Servers</div>
        		<div id="dmTab" class="button unselectable tab" @click="tab(2)">DMs</div>
        		<div id="groupTab" class="button unselectable tab" @click="tab(3)">Groups</div>
      		</div>
      		<div class="list">
        		<div v-if="selectedTab == 1">
          			<div v-for="server in index?.servers" :key="server.id" class="unselectable group">
            			<h1>{{ server.name }}</h1>
            			<h2 v-for="[key, value] in server.channels" :key="key" class="unselectable item" @click="loadChannel(key, false, server.id)">
              				# {{ value }}
            			</h2>
          			</div>
        		</div>

        		<div v-if="selectedTab == 2" class="group">
          			<div v-for="[key, value] in index?.dms" :key="key" class="unselectable message">
            			<h2 @click="loadChannel(key, true, '')">
							{{ value }}
						</h2>
          			</div>
        		</div>

        		<div v-if="selectedTab == 3" class="group">
					<div v-for="[key, value] in index.groups" :key="key" class="unselectable message">
						<h2 @click="loadChannel(key, true, '')">
							{{ value }}
						</h2>
					</div>
				</div>
    		</div>
    	</div>
    	<div class="messagedata backpanel">
			<div>
				<h2 class="data">Channel ID: {{selectedChannel}}</h2>
				<div class="data button unselectable" @click="openDiscordLink(selectedChannel, '')">Open</div>
				<div class="data button unselectable" @click="copyToClipboard(selectedChannel)">Copy</div>
			</div>
			<div>
				<h2 class="data tab">Message ID: {{selectedMessage}}</h2>
				<div class="data button unselectable" @click="openDiscordLink(selectedChannel, selectedMessage)">Open</div>
				<div class="data button unselectable" @click="copyToClipboard(selectedMessage)">Copy</div>
			</div>
			
			
			<div class="button unselectable" @click="goto(2)" style="font-size: 1.5em">
      			Go back
    		</div>
		</div>
    	<div class="messageview backpanel">
			<div v-for="message in messages" :key="message['id']" class="message" @click="selectMessage(message['id'])">
				<p> {{message['content']}} </p>
			</div>
		</div>
  	</div>
</template>

<script lang="ts">
import { loadMessages } from "@/typescript/loadMessages";
import { defineComponent } from "vue";

declare let Neutralino: any;
declare let NL_OS: string;
export default defineComponent({
	props: ["index"],
	data() {
    	return {
      		selectedTab: 1,
			currentGuild: "",
	  		selectedChannel: "",
			isDM: false,
			selectedMessage: "",
			messages: {},
    	};
  	},
  	methods: {
    	tab(tab: number) {
      		const tabs = document.getElementsByClassName("tab");
      		for (let item of tabs) {
        		item.classList.remove("highlight");
      		}
      		switch(tab) {
        		case 1: {
          			document.getElementById("serverTab")?.classList.add("highlight");
          			this.selectedTab = 1;
          			break;
        		}
        		case 2: {
          			document.getElementById("dmTab")?.classList.add("highlight");
          			this.selectedTab = 2;
          			break;
        		}
        		case 3: {
          			document.getElementById("groupTab")?.classList.add("highlight");
          			this.selectedTab = 3;
          			break;
        		}
      		}
    	},
		async loadChannel(id: string, dm: boolean, guild: string) {
			if(this.selectedChannel == id) {
				return;
			}
			this.selectedChannel = id;
			this.isDM = dm;
			this.currentGuild = guild
			const loadedMessages = await loadMessages(this.selectedChannel, this.index.data);
			this.messages = loadedMessages!
		},
		goto(goto: number) {
      		this.eventbus.emit("goto", goto);
    	},
		selectMessage(id: string){
			this.selectedMessage = id;
		},
		async openDiscordLink(channel: string, message: string) {
			const at = this.isDM ? "@me/" : this.currentGuild + "/"
      		if(NL_OS == "Linux") {
        		await Neutralino.os.execCommand(`discord --url -- "discord://discord.com/channels/${at}${channel}/${message}"`)
				console.log(`discord --url -- "discord://discord.com/channels/${at}${channel}/${message}"`)
      		} else {
				await Neutralino.os.open(`discord://discord.com/channels/${at}${channel}/${message}`)
				console.log(`discord://discord.com/channels/${at}${channel}/${message}`)
			  }
    	},
		async copyToClipboard(content: string) {
			await Neutralino.clipboard.writeText(content);
		}
	},
	// computed: {
	// 	messages() {
	// 		return await loadMessages(this.selectedChannel, this.index.data )
	// 	}
	// },
});
</script>

<style lang="scss">
@import "../scss/variables";

.browsergrid {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1em 1em;
  grid-auto-flow: row;
  grid-template-areas:
    "tablist messageview messageview"
    "tablist messageview messageview"
    "tablist messagedata messagedata";
}

.tablist {
  grid-area: tablist;
  box-sizing: border-box;
}

.messagedata {
  grid-area: messagedata;
}

.messageview {
  grid-area: messageview;
}
.tabs {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab {
  flex-grow: 1;
  font-size: 1.5em;
}
.list {
  height: 90%;
  color: $fg-dark;
  overflow-x: hidden;
  overflow-y: scroll;
}
.group {
  border-radius: 0.5em;
  padding: 1em;
  margin: 1em;
  background-color: $accent3-dark;
}

.messageview {
	overflow-x: hidden;
  	overflow-y: scroll;
}

.data{
	display: inline-block;
	color: $fg-dark;
}


.message {
	color: $fg-dark;
	padding: 0.5em;
	transition: 0.2s;
  	&:hover {
    	background-color: $accent1-dark;
    	cursor: pointer;
  	}
}
</style>
