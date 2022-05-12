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

import dpUser from "./dpUser";
import dpChannel from "./dpChannel";
import dpServer from "./dpServer";

export default class dpIndex {
  public data: any;
  public user: dpUser;
  public avatar: null;
  public servers: dpServer[];
  public channels: dpChannel[];
  public friends: Map<string, string> | undefined;
  public dms: Map<string, string> | undefined;
  public groups: Map<string, string> | undefined;

  constructor(
    data: any,
    user: dpUser,
    avatar: null,
    channels: dpChannel[],
    servers: dpServer[],
    friends: Map<string, string> | undefined,
    dms: Map<string, string> | undefined,
    groups: Map<string, string> | undefined
  ) {
    this.data = data;
    this.user = user;
    this.avatar = avatar;
    this.channels = channels;
    this.servers = servers;
    this.friends = friends;
    this.dms = dms;
    this.groups =groups;
  }
}