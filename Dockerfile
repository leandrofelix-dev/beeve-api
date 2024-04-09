# Base
FROM node:20 as base
RUN npm i -g pnpm

# Dependencies
FROM base as dependencies
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Build
FROM base as build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm build

# Deploy
FROM node:20-alpine3.19 as deploy
WORKDIR /usr/src/app
RUN npm i -g pnpm prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/package.json ./package.json
RUN pnpm prisma generate
EXPOSE 4000
CMD ["pnpm", "start"]