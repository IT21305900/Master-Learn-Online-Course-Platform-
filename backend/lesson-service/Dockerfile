# Use a specific version of Node.js
FROM node:20 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Build the application if necessary
# RUN npm run build

# Start a new stage
FROM node:20

# Security options
USER node

# Set working directory
WORKDIR /app

# Copy from the build stage
COPY --from=build /app/ .

# Expose the port the app runs on
EXPOSE 8001

# Start the application
CMD ["npm", "start"]
