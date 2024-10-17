# docker build -t 07-kinds-of-data:latest .
# docker run -p 3000:3000 --name kinds-of-data --rm -d -v feedback:/app/feedback  07-kinds-of-data

FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]