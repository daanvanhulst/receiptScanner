# Image with latest Node version
FROM node:alpine

# Create app directory and set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3100

# Run node server.js to start server
CMD [ "npm", "start" ]