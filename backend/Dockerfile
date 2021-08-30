FROM node:10

WORKDIR ./backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . ./backend/

EXPOSE 3000

CMD npm run serve

