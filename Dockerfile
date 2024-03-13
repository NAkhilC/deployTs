# Dockerfile
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]



