# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.13.1

# Build stage
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the React application
RUN npm run build

# Production stage with Nginx to serve static files
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html


# Add configuration to handle React routing
RUN echo 'server { \
    listen       80; \
    server_name  localhost; \
    location / { \
        root   /usr/share/nginx/html; \
        index  index.html index.htm; \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]