# yggy-editor

> yggdrasil editor

This is a project to create and edit games that use dialogue trees.

It's a renewed work in progress. The rest of this readme is from the original iteration.

## Setup

- Be sure to run `symlinks.sh` in the project root (`npm run init`)
  - Don't store anything in the non-root `assets` directories; they are deleted as part of `symlinks.sh`
- `npm run dev [script-name]` where `[script-name]` can be `game`, `editor`, or `editor-server`
- Add `sass` to your PATH. dart-sass is recommended.

## Update Script

The `update.sh` is a convenience script for updating the (editor) server. It clones the master branch, backs up data (to `~/title-22-backup`), does whatever init is necessary and restarts the server.

Since the update scrpt is part of the repo and the update script itself will be updated over time, it's recommended to manually overwrite the update script with the current version before running it (hint: `echo "" > update.sh`).

As of now it shouldn't be as necessary to do this since the installation steps are split from the update script, but it still might be a good idea to update. **TODO**
