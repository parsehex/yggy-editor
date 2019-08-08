now=$(date +"%Y%m%d-%H%M")
base="$HOME/title-22"

echo "Stop editor server service"
sudo systemctl stop title-22-editor.service 2>/dev/null

echo "Backup editor-assets"
mkdir -p $HOME/title-22-backup
cp -r $base/editor-assets "$HOME/title-22-backup/editor-assets_$now"

# move assets out of repo directory
mv $base/editor-assets /tmp/title-22-backup/editor-assets_temp

echo "Clear title-22 directory"
rm -rf $base

echo "Clone master branch of title-22"
git clone -b master git@github.com:parsehex/title-22.git

# put editor assets back
mv /tmp/title-22-backup/editor-assets_temp $base/editor-assets

# this way the installation can be updated automatically
echo "Running install script..."
sh $base/scripts/install.sh
