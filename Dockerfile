FROM node:10

WORKDIR /usr/app/fiora

COPY src/build ./src/build
COPY src/client ./src/client
COPY src/config ./src/config
COPY public ./public
COPY src/server ./src/server
COPY static ./static
COPY src/types ./src/types
COPY src/utils ./src/utils
COPY .babelrc package.json tsconfig.json yarn.lock ./

RUN yarn install

RUN yarn build && yarn run move-dist

CMD export NODE_ENV=production && yarn start
