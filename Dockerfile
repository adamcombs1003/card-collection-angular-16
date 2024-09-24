FROM node:18.19.0 as build

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build

FROM nginx:latest

COPY --from=build app/dist/card-collection /usr/share/nginx/html

EXPOSE 80