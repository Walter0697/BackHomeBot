FROM node:19 AS build-stage
WORKDIR /app
COPY . .

RUN apt update && apt install tzdata -y
ENV TZ="Asia/Hong_Kong"

RUN yarn --network-timeout 100000
RUN yarn prisma:generate

CMD ["node", "app.js"]