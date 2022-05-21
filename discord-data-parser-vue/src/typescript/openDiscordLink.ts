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

export async function openDiscordLink(channelID: string, messageID: string, at: string, client: boolean) {
    console.log("call 1")
    if(client){
        console.log("call 2")
        if(NL_OS == "Linux") {
            console.log("call 3")
            await Neutralino.os.execCommand(`discord --url -- "discord://discord.com/channels/${at}${channelID}/${messageID}"`)
        } else {
            console.log("call 4")
            await Neutralino.os.open(`discord://discord.com/channels/${at}${channelID}/${messageID}`)
        }
    }else{
        console.log("call 5")
        await Neutralino.os.open(`http://discord.com/channels/${at}${channelID}/${messageID}`);
    }
}