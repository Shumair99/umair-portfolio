# -------- 1) Dependencies (cacheable) --------
    FROM node:20-alpine AS deps
    WORKDIR /app
    COPY package*.json ./
    # If you use npm:
    RUN npm ci
    
    # -------- 2) Build (TypeScript compiled here) --------
    FROM node:20-alpine AS builder
    WORKDIR /app
    ENV NEXT_TELEMETRY_DISABLED=1
    RUN apk add --no-cache libc6-compat
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN npm run build
    
    # -------- 3) Runtime (tiny, only what we need) --------
    FROM node:20-alpine AS runner
    WORKDIR /app
    RUN apk add --no-cache libc6-compat
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    # Create a non-root user
    RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs nextjs
    
    # Copy the standalone server output + assets and assign ownership to user nextjs
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    # Drop root privileges
    USER nextjs
    
    ENV PORT=3000
    EXPOSE 3000
    CMD ["node", "server.js"]