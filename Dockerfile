FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

# First, copy only package files to leverage Docker cache
COPY package*.json ./
COPY turbo.json tsconfig.json ./
COPY apps/user-app/package*.json ./apps/user-app/
COPY packages/*/package*.json ./packages/

# Install dependencies
RUN npm ci --only=production

# Now copy the rest of the code
COPY . .

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Update browserslist database
RUN npx update-browserslist-db@latest

# Build the user app
RUN cd apps/user-app && npm run build

# Expose the port
EXPOSE 3000

CMD ["npm", "run", "start-user-app"]