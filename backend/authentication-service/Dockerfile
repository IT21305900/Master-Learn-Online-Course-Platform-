# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.13.1
FROM node:${NODE_VERSION}-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Set proper permissions
RUN chown -R app:app /app
USER app

EXPOSE 8001

# Use production start for better stability
CMD ["npm", "start"]