# Nice Cream Backend

## Install
```sh
# install nvm + node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install 12
nvm alias default 12
nvm use 12

# install mongodb (if not using Docker)
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update && sudo apt-get install -y mongodb-org
```

## Run
Using either method, the server will be available at `localhost:8000`.
### Method 1: Docker Compose
Make sure Docker and Docker Compose are installed and running.
```sh
npm install
docker-compose up -d
docker-compose logs -ft # view logs
```
### Method 2: Non-Docker
```sh
mkdir -p /data/nice-cream # data directory, if it does not already exist
./start-db.sh
npm install
npm run watch
```