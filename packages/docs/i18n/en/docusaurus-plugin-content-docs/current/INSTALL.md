---
id: install
title: Install
sidebar_label: Install
---

## Environmental Preparation

To run Fiora, you need Node.js(recommend v14 LTS version), MongoDB and redis

-   Install Node.js
    -   Official website <https://nodejs.org/en/download/>
    -   It is recommended to use nvm to install Node.js
        -   Install nvm <https://github.com/nvm-sh/nvm#install--update-script>
        -   Install Node.js via nvm <https://github.com/nvm-sh/nvm#usage>
-   Install MongoDB
    -   Official website <https://docs.mongodb.com/manual/installation/#install-mongodb>
-   Install redis
    -   Official website <https://docs.mongodb.com/manual/installation/#install-mongodb>

Recommended to running on Linux or MacOS systems

## How to run

1. Clone the project `git clone https://github.com/yinxin630/fiora.git -b master`
2. Ensure you have install [yarn](https://www.npmjs.com/package/yarn) before, if not please run `npm install -g yarn`
3. Install project dependencies `yarn install`
4. Build client `yarn build:web`
5. Config JwtSecret `echo "JwtSecret=<string>" > .env2`. Change `<string>` to a secret text
6. Start the server `yarn start`
7. Open `http://[ip]:[port]`(such as `http://127.0.0.1:9200`) in browser

### Run in the background

Using `yarn start` to run the server will stop running after disconnecting the ssh connection, it is recommended to use pm2 to run

```bash
# install pm2
npm install -g pm2

# use pm2 to run fiora
pm2 start yarn --name fiora -- start

# view pm2 apps status
pm2 ls

# view pm2 fiora logging
pm2 logs fiora
```

### Run With Develop Mode

1. Start the server `yarn dev:server`
2. Start the client `yarn dev:web`
3. Open `http://localhost:8080` in browser

### Running on the docker

First install docker <https://docs.docker.com/install/>

#### Run directly from the DockerHub image

```bash
# Pull mongo
docker pull mongo

# Pull redis
docker pull redis

# Pull fiora
docker pull suisuijiang/fiora

# Create a virtual network
docker network create fiora-network

# Run mongodB
docker run --name fioradb -p 27017:27017 --network fiora-network mongo

# Run redis
docker run --name fioraredis -p 6379:6379 --network fiora-network redis

# Run fiora
docker run --name fiora -p 9200:9200 --network fiora-network -e Database=mongodb://fioradb:27017/fiora -e RedisHost=fioraredis suisuijiang/fiora
```

#### Local build image and run

1. Clone the project to the local `git clone https://github.com/yinxin630/fiora.git -b master`
2. Build the image `docker-compose build --no-cache --force-rm`
3. Run it `docker-compose up`
