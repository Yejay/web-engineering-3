# Use an official Node runtime as the parent image
FROM node:latest

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the dependencies in the package.json
RUN npm install

# Copy the rest of the frontend code into the /app directory
COPY . .

# Make the container listen on the specified port at runtime
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
