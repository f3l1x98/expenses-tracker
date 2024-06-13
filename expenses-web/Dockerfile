FROM node:lts AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsconfig.app.json angular.json ./
COPY ./src ./src

RUN npm run build --omit=dev

FROM nginx:stable
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist/expenses-web/browser/ /usr/share/nginx/html
