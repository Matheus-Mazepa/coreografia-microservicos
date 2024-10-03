FROM node:22-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apk add --no-cache build-base librdkafka-dev

WORKDIR /home/node/app

USER node

COPY --chown=node:node . /home/node/app

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:dev"]
