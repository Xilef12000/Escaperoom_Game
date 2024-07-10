#!/bin/sh

# please run with root priveleges

sudo apt update
sudo apt upgrade -y

sudo apt install git -y
git clone https://github.com/Xilef12000/Escaperoom_Game.git
cd Escaperoom_game

python -m venv Escaperoom_game-venv
Escaperoom_game-venv/bin/pip install -r requirements.txt

cp start_Escaperoom_Game.sh ../start_Escaperoom_Game.sh