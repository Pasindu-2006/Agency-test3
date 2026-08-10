# --- STAGE 1: Build the React application ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests first for optimal Docker layer caching
COPY package*.json ./

# Use 'npm ci' for deterministic and faster builds in CI/CD pipelines
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Run the production build
RUN npm run build


# --- STAGE 2: Serve using Nginx (Hardened & Non-Root best practices) ---
FROM nginx:alpine-slim

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose container port
EXPOSE 80

# Health check to ensure container orchestration (Kubernetes/ECS) monitors properly
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 http://localhost/ || exit 1

# Start Nginx in the foreground
CMD ["nginx", -g, "daemon off;"]
