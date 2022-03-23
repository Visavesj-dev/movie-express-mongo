FROM node:16-alpine

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY package.json /home/node/app
COPY package-lock.json /home/node/app

RUN chown -R node:node /home/node/app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

USER node
RUN npm install

COPY . .

RUN npm run build

RUN pwd

EXPOSE 8000
CMD /wait && node server.js
