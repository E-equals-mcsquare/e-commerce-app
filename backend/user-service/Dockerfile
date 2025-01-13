# Stage 1

FROM node:20.11.1 as builder

WORKDIR /build

COPY package*.json .

RUN npm set registry https://registry.npmjs.org/
RUN npm set strict-ssl false

RUN npm install

COPY src/ src/
COPY tsconfig.json tsconfig.json

RUN npm run build

# Stage 2

FROM node:20.11.1 as runner

WORKDIR /app

COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules/
COPY --from=builder build/dist dist/

CMD ["npm", "start"]
