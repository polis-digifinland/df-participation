FROM node:20-alpine AS base

# Install npm and force cross-spawn version
# Remove old version and install new one
RUN npm install -g npm@10.9.0 && \
    # Remove old version
    npm uninstall -g cross-spawn && \
    npm cache clean --force && \
    # Find and remove any remaining old versions
    find /usr/local/lib/node_modules -name "cross-spawn" -type d -exec rm -rf {} + && \
    # Install new version
    npm install -g cross-spawn@7.0.6 --force && \
    # Configure npm
    npm config set save-exact=true && \
    npm config set legacy-peer-deps=true

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm ci
#--omit=dev


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_EXTERNAL_API_BASE_URL
ENV NEXT_PUBLIC_EXTERNAL_API_BASE_URL=${NEXT_PUBLIC_EXTERNAL_API_BASE_URL}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG BUILD_VERSION
ENV BUILD_VERSION=${BUILD_VERSION}

ARG BUILD_DATE
ENV BUILD_DATE=${BUILD_DATE}

ARG NEXT_PUBLIC_EXTERNAL_API_BASE_URL
ENV NEXT_PUBLIC_EXTERNAL_API_BASE_URL=${NEXT_PUBLIC_EXTERNAL_API_BASE_URL}

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Skip public folder for now, it is not used
#COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#RUN apk add --upgrade --no-cache ca-certificates-bundle

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]