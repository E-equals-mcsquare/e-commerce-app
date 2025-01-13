FROM node:20.11.1

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm set registry https://registry.npmjs.org/
RUN npm set strict-ssl false

RUN npm install

COPY . .

EXPOSE 9001
CMD ["npm", "run", "start"]