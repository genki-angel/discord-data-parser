# Discord Data Parser

A cross-platform application that can parse the discord data package through a GUI, making it easier to examine through it.
[What is in my data package?](https://support.discord.com/hc/en-us/articles/360004957991-Your-Discord-Data-Package)

## Download

Download the [lastest release](https://github.com/genki-ai/discord-data-reader-app/releases) for your operating system, unzip into an empty directory and run the executable for your platform..


## How to use

Have you have your Package.zip ready. [My what?](https://support.discord.com/hc/en-us/articles/360004027692-Requesting-a-Copy-of-your-Data)

While the application is open, click on the import button and select the package.zip.

Allow the app to index the data and navigate to data of choice.

### ⚠️⚠️**RUNNING ON WINDOWS**⚠️⚠️
If you are getting a white screen when you launch the app, you must run the command below in command prompt with __**Admin privilages**__...  <br />
`CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"` <br />
[Read more here](https://neutralino.js.org/docs/getting-started/your-first-neutralinojs-app/#step-1-creating-a-new-app)


## Build

`git clone https://github.com/genki-angel/discord-data-parser.git` 

`npm install`

`npm run setup`

Run from source: `npm run dev`

Compile from source: `npm run build`

## TODO

- [x] Clean up UI
- [ ] Add analytic functions
- [x] Rewrite file handling and indexing logic
- [ ] Logging
- [ ] Export data
- [ ] Message search
- [ ] Show saved gifs

## Built with

- [Neutralinojs](https://github.com/neutralinojs/neutralinojs)
- my tiny hands
