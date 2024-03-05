# Base image
FROM node:21-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Build the app
Run npm run build

# Copy the rest of the server code
COPY . .

# Expose the port that the Express app listens on
EXPOSE 3000

# Start the Express app
CMD [ "node", "dist/src/index.js" ]
