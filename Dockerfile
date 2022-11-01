# pull official base image
FROM node:lts-alpine AS development
ENV NODE_ENV development

# Add a work directory
WORKDIR /application

# Cache and Install dependencies
COPY application/package.json .
RUN npm install

# Copy app files
COPY application .

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]