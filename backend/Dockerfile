# backend/Dockerfile
FROM node:22.3.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it


EXPOSE 3001
CMD ["wait-for-it", "mysql:3306", "--timeout=60", "--", "npm", "start"]