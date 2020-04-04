# Use the LTS node 12 image
FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
ENV JWT_SECRET=timmysproductionjwtsecret
# Install dependencies
RUN npm install
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]