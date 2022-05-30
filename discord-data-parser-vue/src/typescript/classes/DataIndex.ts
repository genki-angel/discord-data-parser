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

import { Channel } from "./Ichannel";
import { Guild } from "./Iguild";

export class DataIndex {
    // ### ACCOUNT DATA ###
    accountID = "";
    accountName = "null";
    accountDescriminator = "#0000";
    accountEmail = "";
    accountIsVerified = false;
    accountPhoneNo = "";

    // ### CHANNEL DATA ###
    channels = new Map<string, Channel>();
    guilds = new Map<string, Guild>();
}