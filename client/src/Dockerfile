# The base docker image
FROM node: lts-alpine

# Create a directory where all subsequent commands will be executed.
WORKDIR /app

# Copy package.json files into app dir to setup for npm installs
COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

# copy client dir into app to prepare for client build
COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

# Instructions to execute on startup
CMD ["npm", "start", "--prefix", "server"]

EXPOSE 3001