FROM node:19 AS build-stage
WORKDIR /app
COPY . .
ENV DATABASE_URL_WITH_SCHEMA ""
RUN yarn --network-timeout 100000
RUN yarn prisma:generate

CMD ["node", "app.js"]