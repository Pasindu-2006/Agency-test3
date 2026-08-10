# --- STAGE 1: Build the React application ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests first for optimal Docker layer caching
COPY package*.json ./

# Use 'npm ci' for clean and reliable dependency installation
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Run the production build
RUN npm run build


# --- STAGE 2: Serve using Nginx ---
FROM nginx:alpine-slim

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose container port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]