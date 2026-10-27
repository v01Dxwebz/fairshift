FROM node:20-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
ENV PORT=8080
RUN addgroup -S fairshift && adduser -S fairshift -G fairshift
USER fairshift
EXPOSE 8080
CMD ["node", "server.mjs"]
