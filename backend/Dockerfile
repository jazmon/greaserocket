FROM node:7.9
# Working directory for application
WORKDIR /usr/src/app
# Copies files over
ADD . /usr/src/app
# Binds to port 5000
EXPOSE 5000
# Creates a mount point
VOLUME ["/usr/src/app"]

RUN npm install

CMD ["node", "./src/index.js"]
