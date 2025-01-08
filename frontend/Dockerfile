# Specify the base image (Node.js in this case, using the lightweight Alpine version)
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files to the container (for dependency installation)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port used by the React development server
EXPOSE 5000

# Define the command to start the React development server
CMD ["npm", "start"]
