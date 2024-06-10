FROM node:lts AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json src ./

RUN npm run build --prod

FROM nginx:stable
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist/expenses-web/browser/ /usr/share/nginx/html
