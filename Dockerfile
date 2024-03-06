# Base image
FROM node:21-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json, package-lock.json and tsconfig.json to the working directory
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install 

RUN ls -la

# Copy the rest of the server code
COPY . .

# Build the app
RUN npm run build

# Expose the port that the Express app listens on
EXPOSE 3000

# Start the Express app
CMD [ "node", "dist/src/index.js" ]
