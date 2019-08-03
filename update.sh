now=$(date +"%m_%d_%Y")
cd $HOME

echo Stop editor server service
sudo systemctl stop title-22-editor.service

echo Backup editor-assets
# ignore error (probably editor-assets doesn't exist)
cp -r ./title-22/editor-assets "./title-22-backup/editor-assets-$now" 2>/dev/null

echo Clear title-22 directory
rm -rf ./title-22

echo Clone stable branch of trilium
git clone -b master git@github.com:parsehex/title-22.git
chmod +x ./start-server.sh
chmod +x ./update.sh

echo Updating systemd service file
sudo cp ./systemd /etc/systemd/system/title-22-editor.service
sudo systemctl daemon-reload

echo npm install
cd ./title-22
pnpm install

echo Building game
npm run init
npm run sass
npm run build game
npm run build editor
npm run build editor-server

echo Restart editor server service
sudo systemctl start title-22-editor.service

echo Finished
