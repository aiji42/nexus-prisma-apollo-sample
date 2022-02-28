ARG SKIP_DEV_DEPENDENCIES=true
FROM node:16.14-bullseye-slim AS install

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production={SKIP_DEV_DEPENDENCIES}

FROM node:16.14-bullseye-slim AS production

ENV NODE_ENV production
WORKDIR /app

COPY package.json ./
COPY dist ./dist
COPY prisma/schema.prisma ./prisma/

RUN yarn generate

CMD ["yarn", "start"]