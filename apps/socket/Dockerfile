FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Workspace wiring
COPY pnpm-workspace.yaml .
COPY package.json .
COPY pnpm-lock.yaml .

# Only socket app
COPY apps/socket apps/socket

# Install only socket deps
RUN pnpm install --filter socket...

RUN pnpm --filter socket build

EXPOSE 5000
CMD ["node", "apps/socket/dist/index.js"]
