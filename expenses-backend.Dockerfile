FROM node:lts as build
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
ENV NX_DAEMON false
ENV NX_VERBOSE_LOGGING true

COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.base.json .eslintrc.json .prettierrc jest.preset.js jest.config.ts nx.json ./

COPY apps/expenses-backend apps/expenses-backend

COPY libs/expenses-shared libs/expenses-shared

RUN npm run nx run expenses-backend:build:production

FROM node:lts-alpine
RUN apk add --no-cache git
COPY --from=build /usr/src/app /usr/src/app

CMD ["/usr/src/app/dist/apps/expenses-backend/main.js"]
