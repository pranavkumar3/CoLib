FROM node:16

# Creating app directory
WORKDIR /usr/src/app
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]
