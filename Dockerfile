# Use node:18 as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["npm", "run", "start:prod"]