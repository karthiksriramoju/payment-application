FROM node:20.12.0-alpine3.19

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copy all files at once to avoid cache issues
COPY . .

# Install dependencies and rebuild bcrypt
RUN npm ci && npm rebuild bcrypt --build-from-source

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Update browserslist database
RUN npx update-browserslist-db@latest

# Build the user app
RUN cd apps/user-app && npm run build

# Expose the port
EXPOSE 3000

CMD ["npm", "run", "start-user-app"]