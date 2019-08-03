echo Remove old editor-assets.bak
rm -rf $HOME/title-22-backup/editor-assets.bak

echo Backup editor-assets
cp -r editor-assets $HOME/title-22-backup/editor-assets.bak

echo Stop editor server service
sudo systemctl stop title-22-editor.service

echo Clear trilium install directory
cd ..
rm -rf ./title-22

echo Clone stable branch of trilium
git clone -b stable https://github.com/parsehex/title-22.git
chmod +x start-server.sh

echo npm install
cd title-22
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
