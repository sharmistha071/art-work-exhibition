FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]