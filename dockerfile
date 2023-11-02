FROM node:20
WORKDIR /usr/src/app

COPY package.json .

RUN npm install
EXPOSE 3500
CMD [ "npm", "run", "dev" ]