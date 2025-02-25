FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install

RUN npm run build

CMD ["sh", "-c", "npm run typeorm migration:run -- -d dist/src/ormconfig.ts && npm run start:dev"]
