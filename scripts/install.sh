#!/bin/bash

base="$HOME/title-22"
game="$base/game"
editor="$base/editor"


echo "Script setup"
chmod +x $base/start-server.sh
chmod +x $base/update.sh


echo "Updating systemd service file"
sudo cp $base/systemd.service /etc/systemd/system/title-22-editor.service
sudo systemctl daemon-reload


echo "pnpm install"
cd $base
pnpm install


echo "Setting up project directory structure"
rm -rf $game/assets $editor/assets $editor/game.html
mkdir -p $base/editor-assets/data $base/editor-assets/images
mkdir -p $game/assets/js $game/assets/css
mkdir -p $editor/assets/js $editor/assets/css

ln -s $base/assets/data $game/data
ln -s $base/assets/images $game/images

ln -s $game/index.html $editor/game.html
ln -s $base/assets/data $editor/data
ln -s $base/assets/images $editor/images
ln -s $game/assets/css/main.css $editor/main.css
ln -s $game/assets/css/main.css.map $editor/main.css.map


echo "Building game"
npm run init
npm run sass
npm run build game
npm run build editor
npm run build editor-server


echo "Restart editor server service"
sudo systemctl start title-22-editor.service


echo "Finished"
