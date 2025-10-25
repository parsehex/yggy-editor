# Reviving yggy-editor

I last worked on this 6 years ago and didn't do a good job documenting anything, so that's what I'm going to try to do here.

It's good to be aware of what this project does when trying to understand how it's setup:

- The editor is a client + server that essentially provides a web interface for editing JSON, image files and other assets.
- To play the game, the game engine reads a manifest file which instructs it to load the assets which collectively define the game.

## Setup

Listing steps that I have to take to get this running.

- `pnpm i`
- Ran into the weird JS and shell scripts setup that I have and became confused.
  - Decided to just wing it on my own.
- `npm run generate-assets`
- Got cryptic error `Error: error:0308010C:digital envelope routines::unsupported`. Deleted node_modules and reinstalled with normal npm.

## Architecture

There are 3 main parts: **Editor**, **Editor Server**, and **Game**

### `/editor/`

This is 
