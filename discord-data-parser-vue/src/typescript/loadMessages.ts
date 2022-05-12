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

import dpMessage from "@/typescript/classes/dpMessage";
import JSZip from "jszip";
import * as CSV from "csv-string";

export async function loadMessages(
	id: string,
	data: Promise<JSZip>
)	{
		const messages = await data.then(function (messageData) {
      		return messageData.file("messages/c" + id + "/messages.csv")?.async("string");
    	}).then(function (csvData) {
      		const messageArray: dpMessage[] = new Array<dpMessage>();
      		
			CSV.forEach(csvData!, ",", function (row) {
        		messageArray.push(new dpMessage(row[0], row[1], row[2], row[3]));
      		});
      		if (messageArray.length > 0) {
        		return messageArray.slice(1).slice(0, -1); // shifted to remove identifiers
      		} else {
        		messageArray;
      		}
    });

  return messages;
}
