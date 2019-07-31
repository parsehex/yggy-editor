cd game
rm -rf ./assets
mkdir ./assets ./assets/js ./assets/css
cd ./assets
ln -s ../../assets/data ./data
ln -s ../../assets/images ./images

cd ../../

cd editor
rm -rf ./assets game.html
mkdir ./assets ./assets/js ./assets/css
ln -s ../game/index.html ./game.html
cd ./assets
ln -s ../../assets/data ./data
ln -s ../../assets/images ./images
cd ./css
ln -s ../../../game/assets/css/main.css ./main.css
