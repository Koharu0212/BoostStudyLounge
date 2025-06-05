# backend/Dockerfile
FROM node:22.3.0

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# 後で.envから読み取れるようにEXPOSEだけ書いておく
EXPOSE 3001

CMD ["npm", "start"]