base="$HOME/title-22"

echo "Script setup"
chmod +x $base/start-server.sh
chmod +x $base/update.sh

echo "Updating systemd service file"
sudo cp $base/systemd.service /etc/systemd/system/title-22-editor.service
sudo systemctl daemon-reload

echo "pnpm install"
cd $base
pnpm install

echo "Building game"
npm run init
npm run sass
npm run build game
npm run build editor
npm run build editor-server

echo "Restart editor server service"
sudo systemctl start title-22-editor.service

echo "Finished"
