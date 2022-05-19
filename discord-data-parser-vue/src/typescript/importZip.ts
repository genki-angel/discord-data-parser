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
import { accountDataStore } from "@/store/accountDataStore";
import { messageStore } from "@/store/messageStore";

export async function importZip() {

    appState.isLoading = true;

    const data = await Neutralino.os.showOpenDialog("Open package.zip", {
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

        return await Neutralino.filesystem.readBinaryFile(path);
    });

    console.log("File loaded. processing...")
    const dataPackage = new JSZip().loadAsync(data);

    // user.json
    await dataPackage.then(function (userData) {
        return userData.file("account/user.json")?.async("string");
    })
    .then(function (result: any) {
        console.log("validating...")
        if (result == undefined) {
            Neutralino.debug.log("No user.json was found", "ERROR");
            return;
        }

        // This should be added to the store as this will be repeated when importing folder
        const parsed = JSON.parse(result);
        accountDataStore.userID = parsed["id"]
        accountDataStore.userName = parsed["username"] + "#" + parsed["discriminator"]
        accountDataStore.userEmail = parsed["email"]
        accountDataStore.userVerified = String(!parsed["verified"])
        accountDataStore.userMobile = parsed["phone"]
    });
    ///

    // messages/index.json
    const channels = await dataPackage.then(function (messageIndex) {
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

    for (const [key, value] of channels!) {
        await dataPackage.then((channelData) => {
            console.log(`going to... messages/c${key}/channel.json`)
            return channelData.file(`messages/c${key}/channel.json`)?.async("string");
        })
        .then((result) => {
            console.log("validating...");
            if (result == undefined) {
                Neutralino.debug.log(`could not find c${key}/channel.json... skipping`, "ERROR");
                return;
            }
        
            const parsed = JSON.parse(result);
            const type = parsed["type"];
            switch (type) {
                case 0: {
                    break;
                }
                case 1: {
                    const name = value.substring(20);
                    messageStore.dms.push( {id: key, name: name} );
                    break;
                }
                case 3: {
                    let name;
                    if(value == null) {
                        name = "Unnamed Group"
                    } else { name = value};
                    messageStore.groups.push( {id: key, name: name} )
                    break;
                }
            }
        });
    };

    if(!(messageStore.dms[0].id.length > 1)) {
        messageStore.dms.shift();
    }
    if(!(messageStore.groups[0].id.length > 1)) {
        messageStore.groups.shift();
    }
    appState.isLoading = false;
    console.log("Finished importing...")
}