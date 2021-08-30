FROM node:10

WORKDIR ./frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . ./frontend

CMD npm run dev