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

export default class dpUser {
    public id: string;
    public name: string;
    public tag: string;
    public email: string;
    public isVerified: boolean;
    public hasMobile: boolean;
    public mobile: string;
  
    constructor(
      id: string,
      name: string,
      tag: string,
      email: string,
      isVerified: boolean,
      hasMobile: boolean,
      mobile: string
    ) {
        this.id = id;
        this.name = name;
        this.tag = tag;
        this.email = email;
        this.isVerified = isVerified;
        this.hasMobile = hasMobile;
        this.mobile = mobile;
    }
  }