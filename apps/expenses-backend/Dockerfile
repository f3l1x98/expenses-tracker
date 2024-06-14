FROM node:lts as build
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json .eslintrc.js .prettierrc ./
COPY ./src ./src

RUN npm run build

FROM node:lts-alpine
RUN apk add --no-cache git
COPY --from=build /usr/src/app /usr/src/app

CMD ["/usr/src/app/dist/main.js"]
