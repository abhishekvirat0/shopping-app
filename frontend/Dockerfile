# Specify the base image (Node.js in this case, using the lightweight Alpine version)
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files to the container (for dependency installation)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .
# run build
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]