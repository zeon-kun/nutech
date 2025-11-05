FROM node:25-alpine AS build

ARG DATABASE_URL_BUILD

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL=$DATABASE_URL_BUILD

RUN npx prisma generate

FROM node:25-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/generated/prisma ./generated/prisma 
COPY --from=build /app/prisma/schema.prisma ./prisma/

RUN mkdir -p /app/uploads

ENV NODE_ENV=production
ENV PORT=3010

EXPOSE 3010

COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
CMD ["docker-entrypoint.sh"]