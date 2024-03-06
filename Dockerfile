# Base image
FROM node:21-alpine as builder

# Create and set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.json and tsconfig.json to the working directory
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the server code
COPY . .

# Build the app
RUN npm run build

FROM node:21-alpine

# Create and set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose the port that the Express app listens on
EXPOSE 3000

# Start the Express app
CMD [ "node", "dist/src/index.js" ]
