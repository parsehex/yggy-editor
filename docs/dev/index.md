---
layout: home
---

# Developer section

As you can read on the [home](/) page, I'm working on understanding this project again. I didn't take the time to explain how anything is done or why and so I have to go off of faint memory.

## Pages

You can find these other pages in this section:

- New iteration logs - When I make enough changes, I'll probably write a new one of these entries.
  - [#01](./logs/01.md)
- [Plans](./plans.md)
- [Task list](./task-list.md)

## Project organization

The original state of the project had 3 main parts:

- **game** (now `editor/game`): This is a somewhat self-contained html/(s)ccs/ts bundle which loads JSON files that define the game and lists any other assets. Then it renders and allows playing the loaded game.
- **editor-server**: A simple node.js server which serves static assets and provides a simple API for loading and saving files, all to serve the editor.
- **editor**: Another web bundle like the game. It displays the game using an iframe, and it controls the game's state I believe using the message api.

By setting up the app to work on github.io we aren't using `editor-server` now. My plan is to use a service worker to intercept and serve the requests which the editor *used* to send to the server.
