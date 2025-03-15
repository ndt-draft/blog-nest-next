# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Accept environment variables as build arguments
ARG NODE_ENV=production
ARG PORT=3333
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ARG MONGODB_URI

# Set environment variables
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_NAME=$DB_NAME
ENV MONGODB_URI=$MONGODB_URI

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3333

# Define environment variable
ENV NODE_ENV=production

# Start the application
CMD npm run typeorm migration:run && npm run start:prod
