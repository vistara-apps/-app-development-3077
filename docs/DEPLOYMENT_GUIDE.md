# LegalEase Frame Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying LegalEase Frame to production environments. The application is designed as a Farcaster Frame and can be deployed to various hosting platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Local Development](#local-development)
4. [Production Deployment](#production-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Accounts and API Keys

1. **OpenRouter Account** (for AI functionality)
   - Sign up at [openrouter.ai](https://openrouter.ai)
   - Generate API key
   - Fund account for API usage

2. **Neynar Account** (for Farcaster integration)
   - Sign up at [neynar.com](https://neynar.com)
   - Create API key
   - Note rate limits for your plan

3. **Airstack Account** (for additional data)
   - Sign up at [airstack.xyz](https://airstack.xyz)
   - Generate API key
   - Review usage limits

4. **Alchemy Account** (for Base network)
   - Sign up at [alchemy.com](https://alchemy.com)
   - Create Base Mainnet app
   - Get API key

5. **WalletConnect Project** (for wallet connections)
   - Create project at [cloud.walletconnect.com](https://cloud.walletconnect.com)
   - Get project ID

### System Requirements

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Docker**: Version 20 or higher (for containerized deployment)
- **Git**: For version control

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vistara-apps/-app-development-3077.git
cd -app-development-3077
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Core Configuration
VITE_API_BASE_URL=https://api.legalease.frame
VITE_APP_ENV=production

# AI Integration (Required)
VITE_OPENAI_API_KEY=your_openrouter_api_key_here

# Farcaster Integration (Required)
VITE_NEYNAR_API_KEY=your_neynar_api_key_here

# Blockchain Integration (Required)
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Additional Data (Optional)
VITE_AIRSTACK_API_KEY=your_airstack_api_key_here

# Payment Integration (Required for premium features)
VITE_PAYMENT_BASE_URL=https://payments.vistara.dev

# Analytics (Optional)
VITE_ANALYTICS_ID=your_analytics_id_here

# Development Only
VITE_DEBUG_MODE=false
```

### 4. Verify Configuration

```bash
npm run build
```

If the build succeeds, your environment is properly configured.

## Local Development

### 1. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 2. Test Core Functionality

1. **Wallet Connection**: Test wallet connection with MetaMask or other supported wallets
2. **Legal Queries**: Submit test queries to verify AI integration
3. **Templates**: Test template generation (premium features)
4. **Payments**: Test micro-transaction flow

### 3. Development Tools

- **Hot Reload**: Automatic refresh on code changes
- **TypeScript**: Type checking and IntelliSense
- **Tailwind CSS**: Utility-first styling
- **ESLint**: Code linting and formatting

## Production Deployment

### Option 1: Vercel Deployment (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Navigate to your project settings
   - Add all environment variables from your `.env` file

### Option 2: Netlify Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Configure Environment Variables**
   - Go to Site settings > Environment variables
   - Add all required environment variables

### Option 3: Traditional VPS Deployment

1. **Prepare the Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/vistara-apps/-app-development-3077.git
   cd -app-development-3077
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Install serve globally
   sudo npm install -g serve
   
   # Start with PM2
   pm2 start "serve -s dist -l 3000" --name legalease-frame
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Docker Deployment

### 1. Build Docker Image

```bash
docker build -t legalease-frame .
```

### 2. Run Container

```bash
docker run -d \
  --name legalease-frame \
  -p 3000:3000 \
  --env-file .env \
  legalease-frame
```

### 3. Docker Compose (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  legalease-frame:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_BASE_URL=${VITE_API_BASE_URL}
      - VITE_OPENAI_API_KEY=${VITE_OPENAI_API_KEY}
      - VITE_NEYNAR_API_KEY=${VITE_NEYNAR_API_KEY}
      - VITE_ALCHEMY_API_KEY=${VITE_ALCHEMY_API_KEY}
      - VITE_WALLETCONNECT_PROJECT_ID=${VITE_WALLETCONNECT_PROJECT_ID}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - legalease-frame
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

### 4. Kubernetes Deployment

Create `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: legalease-frame
spec:
  replicas: 3
  selector:
    matchLabels:
      app: legalease-frame
  template:
    metadata:
      labels:
        app: legalease-frame
    spec:
      containers:
      - name: legalease-frame
        image: legalease-frame:latest
        ports:
        - containerPort: 3000
        env:
        - name: VITE_OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: legalease-secrets
              key: openai-api-key
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: legalease-frame-service
spec:
  selector:
    app: legalease-frame
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

## Monitoring and Maintenance

### 1. Health Checks

Implement health check endpoint:

```typescript
// Add to your API routes
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    services: {
      openai: 'connected', // Check actual service status
      neynar: 'connected',
      airstack: 'connected'
    }
  });
});
```

### 2. Logging

Configure structured logging:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 3. Performance Monitoring

- **Response Times**: Monitor API response times
- **Error Rates**: Track error rates by endpoint
- **User Metrics**: Monitor user engagement and retention
- **Resource Usage**: CPU, memory, and network usage

### 4. Backup and Recovery

- **Code**: Use Git for version control
- **Configuration**: Backup environment variables
- **Data**: If using a database, implement regular backups
- **Disaster Recovery**: Document recovery procedures

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Error**: `Module not found` or `Cannot resolve module`
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error**: `Out of memory` during build
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### 2. API Integration Issues

**Error**: `OpenAI API key invalid`
- Verify API key is correct
- Check OpenRouter account balance
- Ensure API key has proper permissions

**Error**: `Neynar API rate limit exceeded`
- Check your Neynar plan limits
- Implement request queuing
- Consider upgrading plan

#### 3. Wallet Connection Issues

**Error**: `WalletConnect project ID invalid`
- Verify project ID from WalletConnect dashboard
- Ensure project is active
- Check domain whitelist settings

#### 4. Payment Integration Issues

**Error**: `Payment session creation failed`
- Verify X402 protocol integration
- Check wallet connection
- Ensure sufficient balance for transactions

### Performance Optimization

1. **Bundle Size Optimization**
   ```bash
   # Analyze bundle size
   npm run build -- --analyze
   
   # Use dynamic imports for large dependencies
   const Component = lazy(() => import('./Component'));
   ```

2. **Caching Strategy**
   - Implement service worker for offline functionality
   - Cache API responses where appropriate
   - Use CDN for static assets

3. **Code Splitting**
   - Split code by routes
   - Lazy load components
   - Optimize chunk sizes

### Security Checklist

- [ ] All API keys are stored as environment variables
- [ ] HTTPS is enabled in production
- [ ] Input validation is implemented
- [ ] Rate limiting is configured
- [ ] Error messages don't expose sensitive information
- [ ] Dependencies are regularly updated
- [ ] Security headers are configured

## Support

For deployment issues:

1. **Check Documentation**: Review this guide and API documentation
2. **GitHub Issues**: Create an issue with deployment details
3. **Community Support**: Join Farcaster developer channels
4. **Professional Support**: Contact for enterprise deployment assistance

---

*Last Updated: January 2024*
*Version: 1.0.0*
