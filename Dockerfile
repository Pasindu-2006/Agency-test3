# --- STAGE 1: Build the React application ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- STAGE 2: Serve using Nginx ---
FROM nginx:alpine
# අපි කලින් හදාගත් nginx.conf එක කොපි කිරීම (නැත්නම් ඩිෆෝල්ට් Nginx පාවිච්චි වේ)
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
