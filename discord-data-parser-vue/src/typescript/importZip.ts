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

export async function importZip() {

    appState.isLoading = true;

    let data: any;
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

        data = await Neutralino.filesystem.readBinaryFile(path);
        data = new JSZip().loadAsync(data);

        await data.then((result: any) => {
            return result.file("account/user.json")?.async("string");
            
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
    });
    appState.isLoading = false;
    console.log("Finished importing...")
}