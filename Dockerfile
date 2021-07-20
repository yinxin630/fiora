FROM node:14

WORKDIR /usr/app/fiora

COPY packages ./packages
COPY package.json tsconfig.json yarn.lock lerna.json ./
RUN touch .env

RUN yarn install

RUN yarn build:web

CMD yarn start
