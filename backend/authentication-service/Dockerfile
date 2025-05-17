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

# Production stage
FROM node:${NODE_VERSION}-alpine 

RUN addgroup app && adduser -S -G app app

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only-production

# Copy all files from build stage
COPY --from=build /app ./

USER app

EXPOSE 8001

# Use production mode and specify the start command from your package.json
CMD ["npm", "run", "start"]





# # syntax=docker/dockerfile:1
# ARG NODE_VERSION=20.13.1
# FROM node:${NODE_VERSION}-alpine

# RUN addgroup app && adduser -S -G app app

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci --only=production

# COPY . .

# # Set proper permissions
# RUN chown -R app:app /app
# USER app

# EXPOSE 8001

# # Use production start for better stability
# CMD ["npm", "start"]