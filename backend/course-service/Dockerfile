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

# If you have a build step, uncomment this:
# RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine 

RUN addgroup app && adduser -S -G app app

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy all files from build stage (or just the necessary files if you have a build process)
COPY --from=build /app ./

# Add health check endpoint to your Express app
# Make sure you've added the /health endpoint to your server.js as shown in previous messages

USER app

EXPOSE 8002

# Use production mode and specify the start command from your package.json
CMD ["npm", "run", "start"]