FROM node:lts AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.base.json .eslintrc.json .prettierrc jest.preset.js jest.config.ts nx.json ./

COPY apps/expenses-web apps/expenses-web

COPY libs/expenses-shared libs/expenses-shared

RUN npm run nx run expenses-web:build:production

FROM nginx:stable
COPY ./apps/expenses-web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/apps/expenses-web/ /usr/share/nginx/html
