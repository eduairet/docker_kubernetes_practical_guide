# docker build -t 08-bind-mount:env .

# USING ENV
# docker run --name bind-mount -v "path/to/08-bind-mount:/app:ro" -v /app/node_modules --env PORT=<port_number> -d -p 3000:3000 08-bind-mount:env

# USING ARG
# docker run --name bind-mount -v "path/to/08-bind-mount:/app:ro" -v /app/node_modules --build-arg DEFAULT_PORT=3000 -d -p 3000:3000 08-bind-mount:env

FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG DEFAULT_PORT=3000
ENV PORT $DEFAULT_PORT
EXPOSE $PORT
CMD ["node", "--watch", "app.js"]