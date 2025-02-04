# Base stage
FROM node:23.6.1-alpine3.21 as base
WORKDIR /app
COPY package*.json ./
COPY movieDb-backend-src ./movieDb-backend-src
RUN npm ci && npm cache clean --force

# Development stage
FROM base as development
WORKDIR /app/movieDb-app
COPY movieDb-app/package*.json ./
RUN npm ci
WORKDIR /app
CMD ["npm", "run", "dev"]

# Builder stage
FROM base as builder
WORKDIR /app/movieDb-app
COPY movieDb-app/package*.json ./
RUN npm ci
COPY movieDb-app/ ./
RUN npm run build

# Production stage
FROM base as production
COPY --from=builder /app/movieDb-app/dist ./movieDb-app/dist
CMD ["npm", "start"]
