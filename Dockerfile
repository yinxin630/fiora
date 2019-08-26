FROM node:alpine

WORKDIR /usr/app/fiora

Run wget -q -O - https://api.github.com/repos/yinxin630/fiora/tarball/master | tar xz --strip=1

RUN yarn install

RUN yarn build && yarn run move-dist

CMD npm start
