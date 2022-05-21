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

import * as CSV from "csv-string";
import { channelViewer } from "@/store/channelViewer"
import { zipPackage } from "./importZip";

export async function loadChannelZip(id: string)	{
    channelViewer.isLoading = true;
    channelViewer.messages = [];
	await zipPackage.then(function (messageData) {
      	return messageData.file("messages/c" + id + "/messages.csv")?.async("string");
    }).then(function (csvData) {
        const csvArr = CSV.parse(csvData!);
		csvArr.forEach(function (row, index) {
            if(index == 0) {
                return;
            }
            channelViewer.messages.push({id: row[0], timestamp: row[1], content: row[2], attachment: row[3]});
      	});

      	if (channelViewer.messages.length > 0) {
        	channelViewer.messages.slice(1).slice(0, -1); // shifted to remove identifiers
      	}
    });
    channelViewer.isLoading = false;
    console.log("Finished loading messages!");
    console.log( channelViewer.messages );
}