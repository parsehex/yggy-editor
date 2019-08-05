now=$(date +"%Y%m%d%H%M")

echo Stop editor server service
sudo systemctl stop title-22-editor.service 2>/dev/null

echo Backup editor-assets
mkdir -p $HOME/title-22-backup
cp -r $HOME/title-22/editor-assets "$HOME/title-22-backup/editor-assets_$now"

# move assets out of repo directory
mv $HOME/title-22/editor-assets $HOME/title-22-backup/editor-assets_temp

echo Clear title-22 directory
rm -rf $HOME/title-22

echo Clone master branch of title-22
git clone -b master git@github.com:parsehex/title-22.git

# put editor assets back
mv $HOME/title-22-backup/editor-assets_temp $HOME/title-22/editor-assets

echo Script setup
cd $HOME/title-22
chmod +x $HOME/start-server.sh
chmod +x $HOME/update.sh

echo Updating systemd service file
sudo cp $HOME/systemd.service /etc/systemd/system/title-22-editor.service
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
