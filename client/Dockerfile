FROM node:13.8.0-alpine3.11

COPY . /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install \
    npm run prod