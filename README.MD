# Discord Data Reader App (DDRA)

The application wrapper for [Discord Data Reader Vue](ttps://github.com/genki-ai/discord-data-reader-vue) (DDRV).

## Overview

A cross-platform application that can parse the discord data package through a GUI, making it easier to examine.
[What is in my data package?](https://support.discord.com/hc/en-us/articles/360004957991-Your-Discord-Data-Package)

## Install

Download the lastest release, unzip into an empty directory and run the executable for your platform..

[Download here](https://github.com/genki-ai/discord-data-reader-app/releases)

My device is not listed? [Build from source](https://neutralino.js.org/docs/distribution/overview)

## How to use

Have you have your Package.zip ready. [My what?](https://support.discord.com/hc/en-us/articles/360004027692-Requesting-a-Copy-of-your-Data)

While DDRA is open, click on the import button and select the Package.zip.

Allow the app to index the data and navigate to data of choice.

## Build

### REQUIREMENTS

Requires Neutralinojs
`npm i -g @neutralinojs/neu`

`git clone --recurse-submodules https://github.com/genki-ai/discord-data-reader-app.git`

Compile from source:<br>
`cd discord-data-reader-vue && npx vue-cli-service build --dest ../resources/ && cd .. && neu build`

## TODO

- [ ] Simplify indexing function
- [x] Overhaul CSS
- [x] Refactor menu process
- [ ] Include more data from package
- [ ] Analytic tools

## Built with

- [Discord Data Reader Vue](https://github.com/genki-ai/discord-data-reader-vue)
- [Neutralinojs](https://github.com/neutralinojs/neutralinojs)
