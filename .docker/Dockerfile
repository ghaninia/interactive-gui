FROM node:14-alpine AS builder
WORKDIR /resource
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY ../ .
RUN yarn build

FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html