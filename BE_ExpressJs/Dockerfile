FROM node:14-alpine

WORKDIR /linhdev/backend_express_hoidanit

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD [ "npm", "run", "build"]