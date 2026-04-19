FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production?no:dev && npm install -g @angular/cli@14

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

