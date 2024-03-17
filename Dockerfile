FROM node as angular
# Create app directory
WORKDIR /usr/src/app/angular-app
# Install app dependencies
COPY angular-app/package*.json ./
RUN npm ci
COPY angular-app ./
RUN npm install -g @angular/cli
RUN ng build --configuration production
USER node


FROM node as builder
# Create app directory
WORKDIR /usr/src/app/node-server
# Install app dependencies
COPY node-server/package*.json ./
RUN npm ci
COPY node-server ./
RUN npm run build
FROM node:slim
ENV NODE_ENV=production
USER node



# Create app directory
WORKDIR /usr/src/app/node-server
# Install app dependencies
COPY node-server/package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/node-server ./
COPY --from=angular /usr/src/app/angular-app/dist ./dist
EXPOSE 3000
CMD [ "npm", "start" ]