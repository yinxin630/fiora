FROM node:14

WORKDIR /usr/app/fiora

COPY bin ./bin
COPY build ./build
COPY client ./client
COPY config ./config
COPY public ./public
COPY server ./server
COPY types ./types
COPY utils ./utils
COPY .babelrc package.json tsconfig.json yarn.lock ./
RUN touch .env

RUN yarn install

RUN yarn build:client && yarn move-dist

CMD yarn start
