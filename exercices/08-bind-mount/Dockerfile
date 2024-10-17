# docker build -t 08-bind-mount:latest .
# docker run --name bind-mount -v "path/to/08-bind-mount/:/app" -v /app/node_modules -d -p 3000:3000 08-bind-mount

FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "--watch", "app.js"]