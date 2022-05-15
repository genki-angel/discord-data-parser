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

declare let Neutralino: any;

export async function importZip() {
    await Neutralino.os.showOpenDialog("Open package.zip", {
        filters: [
          {name: "zip", extensions: ["zip"]},
        ]
      }).then((result: any) => {
          const path = result[0]
          if(!path){
              console.log("Nothing selected...")
              return;
          }
          console.log(`Validating: ${path}`)
      });
}