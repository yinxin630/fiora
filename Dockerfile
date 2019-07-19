FROM node:alpine

WORKDIR /usr/app/fiora

Run wget -q -O - https://api.github.com/repos/yinxin630/fiora/tarball/master | tar xz --strip=1

COPY . .

RUN yarn install

RUN yarn build && mv -f dist/fiora/* public

CMD [ "node", "server/main.js" ]
