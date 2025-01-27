# Base stage
FROM node:23.6.1-alpine3.21 as builder

WORKDIR /app

# Build frontend
COPY movieDb-app/package*.json ./movieDb-app/
WORKDIR /app/movieDb-app
RUN npm ci
COPY movieDb-app/ ./
RUN npm run build

# Production stage
FROM node:23.6.1-alpine3.21

WORKDIR /app

# Install dependencies for backend
COPY package*.json ./
COPY movieDb-backend-src ./movieDb-backend-src
RUN npm ci && npm cache clean --force

# Copy built applications
COPY --from=builder /app/movieDb-app/dist ./movieDb-app/dist

CMD ["npm", "start"]
