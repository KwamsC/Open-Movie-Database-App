# Base stage
FROM node:23.6.1-alpine3.21 as base

WORKDIR /app

ENV PORT 8080

# Install dependencies for backend
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Install dependencies for frontend
COPY movieDb-app/package*.json ./movieDb-app/
WORKDIR /app/movieDb-app
RUN npm ci && npm cache clean --force

# Copy all source files
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/movieDb-app
RUN npm run build

# Switch back to root directory and start the server
WORKDIR /app
CMD ["npm", "start"]
