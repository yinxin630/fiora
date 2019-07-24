FROM node:alpine

WORKDIR /usr/app/fiora

Run wget -q -O - https://api.github.com/repos/yinxin630/fiora/tarball/master | tar xz --strip=1

COPY . .

RUN yarn install

RUN yarn build

RUN rm -rf public/audio && rm -rf public/avatar && rm -rf public/css && rm -rf public/fonts && rm -rf public/img && rm -rf public/js && mv -f dist/fiora/* public

CMD [ "node", "server/main.js" ]
