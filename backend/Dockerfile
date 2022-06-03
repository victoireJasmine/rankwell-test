FROM node:lts-alpine

RUN mkdir -p /usr/src/backend

WORKDIR /usr/src/backend

COPY . /usr/src/backend/

RUN npm install && npm install -g nodemon && npm install -g sequelize-cli

CMD ["npm", "start"]