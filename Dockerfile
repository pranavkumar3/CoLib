FROM node:16

WORKDIR /usr/src/app/server
RUN pwd
COPY package*.json /usr/src/app/server
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run","server"]
