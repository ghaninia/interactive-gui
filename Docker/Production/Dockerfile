FROM node:14-alpine AS builder
ENV NODE_ENV production
# Cache and Install dependencies
COPY ../../application .

# Add a work directory
WORKDIR /application
RUN yarn install

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
