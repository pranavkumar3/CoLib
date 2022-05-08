FROM node:16

# Creating app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --force
COPY ./frontend .
EXPOSE 3000
CMD ["npm", "start"]
