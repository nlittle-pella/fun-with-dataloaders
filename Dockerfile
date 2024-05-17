FROM node:20.12.2-alpine as builder

ARG NPM_TOKEN

WORKDIR /usr/src/app

COPY package.json package-lock.json .npmrc ./

RUN npm pkg set scripts.prepare="exit 0"

RUN npm ci --production --no-optional

COPY . .

USER node

###################

FROM node:20.12.2-alpine
EXPOSE 5130

WORKDIR /usr/src/app

ARG GIT_SHA
ENV GIT_SHA=${GIT_SHA}
ENV TELEMETRY_SERVICE_NAME="author-api"

COPY --from=builder /usr/src/app .

USER node
CMD ["node", "--es-module-specifier-resolution=node", "--experimental-modules", "--import", "./node_modules/@pella/telemetry/index.js", "index.js"]

