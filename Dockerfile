# Start from the official Node.js LTS base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy all files
COPY . .

RUN npm run build
CMD [ "npm", "start" ]