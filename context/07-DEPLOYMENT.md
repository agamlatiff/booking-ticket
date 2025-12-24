# Deployment

## Overview

Panduan deployment untuk aplikasi Booking Ticket.

---

## Requirements

| Requirement | Version |
| ----------- | ------- |
| Node.js     | >= 18.x |
| npm/pnpm    | Latest  |
| PostgreSQL  | >= 14   |

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"
DIRECT_URL="postgresql://user:password@host:5432/database"

# Midtrans
MIDTRANS_SERVER_KEY="your-server-key"
MIDTRANS_CLIENT_KEY="your-client-key"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

---

## Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run dev
```

---

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Database Setup

### Migration

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy
```

### Seeding

```bash
npx prisma db seed
```

---

## Deployment Platforms

### Vercel (Recommended)

1. Connect repository to Vercel
2. Set environment variables
3. Deploy

### Railway

1. Create new project
2. Add PostgreSQL service
3. Connect repository
4. Set environment variables
5. Deploy

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Database seeded (if needed)
- [ ] SSL certificate active
- [ ] Payment gateway tested
- [ ] Email notifications working
