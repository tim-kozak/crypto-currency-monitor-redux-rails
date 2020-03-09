FROM node:13.8.0-alpine3.11 as build

COPY . /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install && \
    npm run prod


# production environment
FROM nginx:1.17.8-alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]