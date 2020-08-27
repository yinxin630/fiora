FROM node:10

WORKDIR /usr/app/fiora

COPY build ./build
COPY client ./client
COPY config ./config
COPY public ./public
COPY server ./server
COPY static ./static
COPY types ./types
COPY utils ./utils
COPY .babelrc package.json tsconfig.json yarn.lock ./

RUN yarn install

RUN yarn build && yarn run move-dist

CMD export NODE_ENV=production && yarn start
