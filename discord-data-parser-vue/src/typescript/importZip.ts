// Copyright (C) 2022 genki_angel
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import JSZip from "jszip";
import { appState } from "@/store/appState";
import { dataStore } from "@/store/dataStore";
import { Channel } from "./classes/Ichannel";

export let zipPackage: Promise<JSZip>;

export async function importZip() {

    appState.isLoading = true;
    let ready = false

    await Neutralino.os.showOpenDialog("Open package.zip", {
        filters: [
            {name: "zip", extensions: ["zip"]},
        ]
    }).then(async (result: any) => {
        const path = result[0]

        if(!path){
            console.log("Nothing selected...")
            return;
        }
        console.log(`Loading file: ${path}`)

        const fileData = await Neutralino.filesystem.readBinaryFile(path);
        zipPackage = new JSZip().loadAsync(fileData);
        console.log("File loaded. processing...")
        ready = true
    });    

    if(!ready){
        appState.isLoading = false;
        return;
    }

    // user.json
    await zipPackage.then(function (userData) {
        return userData.file("account/user.json")?.async("string");
    })
    .then(function (result: any) {
        console.log("validating...")
        if (result == undefined) {
            Neutralino.debug.log("No user.json was found", "ERROR");
            return;
        }

        const parsed = JSON.parse(result);
        dataStore.accountID = parsed["id"]
        dataStore.accountName = parsed["username"]
        dataStore.accountDescriminator = parsed["discriminator"]
        dataStore.accountEmail = parsed["email"]
        dataStore.accountIsVerified = parsed["verified"]
        dataStore.accountPhoneNo = parsed["phone"]
    });
    ///

    // messages/index.json
    const channels = await zipPackage.then(function (messageIndex) {
        return messageIndex.file("messages/index.json")?.async("string");
    })
    .then(function (result: any) {
        console.log("validating...")
        if (result == undefined) {
            Neutralino.debug.log("No index.json was found", "ERROR");
            return;
        }

        const parsed = JSON.parse(result);
        const index = new Map<string, string>();
        Object.keys(parsed).forEach(async function(key) {
            index.set(key, parsed[key]);
        });
        return index;
    });

    const loneChannel: string[] = [];
    for (const [channelID, channelName] of channels!) {
        await zipPackage.then((channelData) => {
            return channelData.file(`messages/c${channelID}/channel.json`)?.async("string");
        })
        .then((result) => {
            console.log("validating...");
            if (result == undefined) {
                Neutralino.debug.log(`could not find c${channelID}/channel.json... skipping`, "ERROR");
                return;
            }
        
            const parsed = JSON.parse(result);
            const type = parsed["type"];
            switch (type) {
                case 0: {
                    
                    if(!Object.prototype.hasOwnProperty.call(parsed, "guild")) {
                        dataStore.channels.set(channelID, {name: channelID, type: parsed["type"]})
                        loneChannel.push(channelID);
                        break;
                    }
                    dataStore.channels.set(channelID, {name: channelName, type: parsed["type"]})
                    if(dataStore.guilds.has(parsed["guild"]["id"])){
                        console.log("Guild found!")
                        dataStore.guilds.get(parsed["guild"]["id"])?.channels.push(channelID);
                        break;
                    }
                    dataStore.guilds.set(parsed["guild"]["id"], {name: parsed["guild"]["name"], channels: [channelID]})
                    break;
                }
                case 1: {
                    const name = channelName.substring(20);
                    // messageStore.dms.push( {id: channelID, name: name} );
                    dataStore.channels.set(channelID, {name: name, type: parsed["type"]})
                    break;
                }
                case 3: {
                    let name;
                    if(channelName == null) {
                        name = channelID
                    } else { name = channelName};
                    // messageStore.groups.push( {id: channelID, name: name} )
                    dataStore.channels.set(channelID, {name: name, type: parsed["type"]})
                    break;
                }
            }
        });
    };

    // messageStore.servers.push( {id: "NULL", name: "Unknown Server", channels: loneChannel} );
    dataStore.guilds.set("NULL", {name: "Unknown Server", channels: loneChannel});

    // if(!(messageStore.servers[0].id.length > 1)) {
    //     messageStore.servers.shift();
    // }
    // if(!(messageStore.dms[0].id.length > 1)) {
    //     messageStore.dms.shift();
    // }
    // if(!(messageStore.groups[0].id.length > 1)) {
    //     messageStore.groups.shift();
    // }
    appState.isLoading = false;
    appState.mode = "zip"
    console.log("Finished importing...")
}