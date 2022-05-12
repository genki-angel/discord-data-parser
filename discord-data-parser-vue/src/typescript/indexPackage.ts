// Copyright (C) 2022 genki
//
// This file is part of discord-data-reader-vue.
//
// discord-data-reader-vue is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// discord-data-reader-vue is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with discord-data-reader-vue.  If not, see <http://www.gnu.org/licenses/>.

import JSZip from "jszip";
import dpChannel from "./classes/dpChannel";

import dpIndex from "./classes/dpIndex";
import dpServer from "./classes/dpServer";
import dpUser from "./classes/dpUser";

declare let Neutralino: any;

export async function indexPackage(file: File | any){
    Neutralino.debug.log("Indexing file...");

    if(file == null){
        Neutralino.debug.log("File undefined...", "ERROR");
        return;
    }

    const data = new JSZip().loadAsync(file);
    let isValid = true;

    const dms:Map<string, string> = new Map<string, string>();
    const groups:Map<string, string> = new Map<string, string>();

    // load user data
    const user = await data.then(function (userData) {
        return userData.file("account/user.json")?.async("string");
    }).then(function (result) {
        if (result == undefined) {
            Neutralino.debug.log("No user.json was found", "ERROR");
            isValid = false;
            return;
        }
        const parsed = JSON.parse(result);
        const userData = new dpUser(
            parsed["id"],
            parsed["username"],
            parsed["discriminator"],
            parsed["email"],
            !parsed["verified"], // Is inverted as original is "Need to be verified?"
            parsed["has_mobile"],
            parsed["phone"]
        );
        return userData;
    })

    // load friend data --TODO (group functions together to avoid reading same files twice)
    const friendlist: Map<string, string> = new Map<string, string>();
    const friends = await data.then(function (friendData) {
        
        return friendData.file("account/user.json")?.async("string");
    }).then(function (result) {
        const parsed = JSON.parse(result!);
        if (parsed["relationships"] !== undefined) {
            parsed["relationships"].forEach(function (relationship: any) {
                friendlist.set(relationship["user"]["id"], (relationship["user"]["username"] + "#" + relationship["user"]["discriminator"]))
            })
            return friendlist;
        } else {
            Neutralino.debug.log("No data found in relations, ignoring...", "Warning");
        }       
    })

    // index all servers
    const servers = await data.then(function (serverFolder) {
        const serverlist: dpServer[] = new Array<dpServer>();
        serverFolder.folder("servers")?.forEach(async function (path) {
            if(path.substring(path.length - 1) == "/") {
                await data.then(function (serverData) {
                    return serverData.file("servers/" + path + "guild.json")?.async("string");
                }).then(function (result) {
                    if (result == undefined) {
                        Neutralino.debug.log(path + " does not exist, ignoring...", "Warning");
                        return;
                    }
                    const parsed = JSON.parse(result);
                    const serverData = new dpServer(
                        parsed["id"],
                        parsed["name"]
                    )
                    serverlist.push(serverData);
                })
            }
        })
        return serverlist;
    })

    // index all channels
    const channels = await data.then(function (channelFolder) {
        const channellist: dpChannel[] = new Array<dpChannel>();
        channelFolder.folder("messages")?.forEach(async function (path) {
            if(path.substring(path.length - 1) == "/") {
                await data.then(function (channelData) {
                    return channelData.file("messages/" + path + "channel.json")?.async("string");
                }).then(function (result) {
                    if (result == undefined) {
                        Neutralino.debug.log(path + " does not exist, ignoring...", "Warning");
                        return;
                    }
                    const parsed = JSON.parse(result);
                    const channelData = new dpChannel(
                        parsed["id"],
                        parsed["type"]
                    )
                    switch (channelData.type) {
                        case 0: { // server message
                            if (parsed["guild"]) { // check if belongs to active server
                                const guildID = parsed["guild"]["id"];
                                servers.forEach(function (server: dpServer) {
                                    if(server.id == guildID){
                                        server.channels.set(parsed["id"], parsed["name"]);
                                    }
                                })
                            }
                            break;
                        }
                        case 1: { // dm message
                            if (parsed["recipients"]) {
                                const recipientID = parsed["recipients"][0];
                                let isFriend = false;
                                if(friends){
                                    friends.forEach(function (value, key) {
                                        if(key == recipientID) { // check if dm comes from a user in the friends list
                                            dms.set(parsed["id"], value);
                                            isFriend = true;
                                        }
                                    })
                                }
                                if(!isFriend){dms.set(parsed["id"], "Unknown user#0000")}
                            }
                            break;
                        }
                        case 3: { // group message
                            if(parsed["name"]){
                                groups.set(parsed["id"], parsed["name"]);
                            } else {
                                groups.set(parsed["id"], "Unknown Group");
                            }
                            break;              
                        }
                    }
                    channellist.push(channelData);
                })
            }
        })
        return channellist;
    })

    if (!isValid) {
        Neutralino.debug.log("Index failed, file is not valid", "ERROR");
        return null;
    }
    const index = new dpIndex(data, user!, null, channels, servers, friends, dms, groups)
    Neutralino.debug.log("Index completed.");
    return index;
}