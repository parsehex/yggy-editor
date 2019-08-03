now=$(date +"%Y%m%d%H%M")
cd $HOME

echo Stop editor server service
sudo systemctl stop title-22-editor.service 2>/dev/null

echo Backup editor-assets
mkdir -p ./title-22-backup
cp -r ./title-22/editor-assets "./title-22-backup/editor-assets_$now"

# move assets out of repo directory
mv ./title-22/editor-assets ./title-22-backup/editor-assets_temp

echo Clear title-22 directory
rm -rf ./title-22

echo Clone master branch of title-22
git clone -b master git@github.com:parsehex/title-22.git

# put editor assets back
mv ./title-22-backup/editor-assets_temp ./title-22/editor-assets

echo Script setup
cd ./title-22
chmod +x ./start-server.sh
chmod +x ./update.sh

echo Updating systemd service file
sudo cp ./systemd.service /etc/systemd/system/title-22-editor.service
sudo systemctl daemon-reload

echo npm install
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
