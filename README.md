# Nice Cream Backend

## Install
```sh
# install nvm + node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install 12
nvm alias default 12
nvm use 12

# install mongodb
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update && sudo apt-get install -y mongodb-org
```

## Run
```sh
# start database at localhost:27017
./start-db.sh

# start server at localhost:8000
npm install
npm run watch
```