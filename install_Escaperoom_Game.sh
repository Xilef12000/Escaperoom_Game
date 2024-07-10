#!/bin/sh

# please run with root priveleges

sudo apt update
sudo apt upgrade -y

sudo apt install git -y
git clone https://github.com/Xilef12000/Escaperoom_Game.git
cd Escaperoom_Game

python -m venv Escaperoom_Game-venv
Escaperoom_Game-venv/bin/pip install -r requirements.txt

cp start_Escaperoom_Game.sh ../start_Escaperoom_Game.sh
sudo chmod a+x ../start_Escaperoom_Game.sh