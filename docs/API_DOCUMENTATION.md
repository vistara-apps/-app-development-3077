# LegalEase Frame API Documentation

## Overview

LegalEase Frame is a Farcaster-based mini-app that provides plain-language legal information and actionable guidance for everyday legal situations. This document outlines the complete API specifications, data models, and integration requirements.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Models](#data-models)
3. [API Endpoints](#api-endpoints)
4. [External Integrations](#external-integrations)
5. [Authentication](#authentication)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Deployment](#deployment)

## Architecture Overview

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Base Network (via Wagmi + RainbowKit)
- **AI**: OpenAI API (via OpenRouter)
- **Payments**: X402 Protocol
- **Social**: Farcaster (via Neynar API)
- **Data**: Airstack API for additional context

### Core Components
- **Legal Query Engine**: AI-powered legal advice generation
- **Template System**: Pre-built legal document templates
- **Resource Database**: Curated legal resources and citations
- **Payment Gateway**: Micro-transaction support for premium features
- **Farcaster Integration**: Frame-based user interface

## Data Models

### User
```typescript
interface User {
  farcasterId: string;        // Farcaster user ID
  walletAddress: string;      // Connected wallet address
  jurisdiction: string;       // User's legal jurisdiction
  createdAt: Date;           // Account creation timestamp
  updatedAt: Date;           // Last update timestamp
}
```

### Query
```typescript
interface Query {
  id: string;                 // Unique query identifier
  userId: string;             // Associated user ID
  queryString: string;        // User's legal question
  jurisdiction: string;       // Applicable jurisdiction
  timestamp: Date;            // Query submission time
  responseType: 'summary' | 'template' | 'steps';
  cost: number;              // Query cost in USD
  status: 'pending' | 'completed' | 'failed';
}
```

### LegalInformation
```typescript
interface LegalInformation {
  id: string;                 // Unique identifier
  title: string;              // Information title
  summary: string;            // Brief summary
  detailedInfo: string;       // Detailed explanation
  actionSteps: string[];      // Actionable steps
  jurisdiction: string;       // Applicable jurisdiction
  sourceLink: string;         // Official source URL
  tags: string[];            // Categorization tags
  createdAt: Date;           // Creation timestamp
  updatedAt: Date;           // Last update timestamp
}
```

### Template
```typescript
interface Template {
  id: string;                 // Unique identifier
  title: string;              // Template title
  content: string;            // Template content with variables
  usageContext: string;       // When to use this template
  jurisdiction: string;       // Applicable jurisdiction
  category: string;           // Template category
  isPremium: boolean;         // Premium feature flag
  createdAt: Date;           // Creation timestamp
  updatedAt: Date;           // Last update timestamp
}
```

## API Endpoints

### User Management

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "farcasterId": "12345",
  "walletAddress": "0x...",
  "jurisdiction": "us"
}
```

#### Get User
```http
GET /api/users/{farcasterId}
```

#### Update User
```http
PUT /api/users/{farcasterId}
Content-Type: application/json

{
  "jurisdiction": "ca"
}
```

### Legal Queries

#### Submit Query
```http
POST /api/queries
Content-Type: application/json

{
  "userId": "12345",
  "queryString": "My landlord won't return my security deposit",
  "jurisdiction": "us",
  "responseType": "summary"
}
```

#### Get Query Result
```http
GET /api/queries/{queryId}
```

#### Get User Queries
```http
GET /api/users/{userId}/queries
```

### Legal Information

#### Search Legal Information
```http
GET /api/legal-info/search?query=tenant%20rights&jurisdiction=us
```

#### Get Legal Information
```http
GET /api/legal-info/{id}
```

### Templates

#### Get Templates
```http
GET /api/templates?jurisdiction=us&category=landlord_tenant
```

#### Generate Document
```http
POST /api/templates/{templateId}/generate
Content-Type: application/json

{
  "variables": {
    "tenantName": "John Doe",
    "landlordName": "Jane Smith",
    "depositAmount": "$1,500"
  }
}
```

### Payments

#### Create Payment Session
```http
POST /api/payments/session
Content-Type: application/json

{
  "amount": "$0.001",
  "description": "Premium legal template access"
}
```

#### Verify Payment
```http
GET /api/payments/verify/{sessionId}
```

## External Integrations

### OpenAI API (via OpenRouter)
- **Purpose**: Generate plain-language legal explanations
- **Model**: `google/gemini-2.0-flash-001`
- **Rate Limits**: Based on OpenRouter pricing
- **Configuration**: 
  ```env
  VITE_OPENAI_API_KEY=your_openrouter_api_key
  ```

### Neynar API (Farcaster)
- **Purpose**: Farcaster user data and frame interactions
- **Endpoints**: User profiles, cast publishing
- **Rate Limits**: 1000 requests/hour (free tier)
- **Configuration**:
  ```env
  VITE_NEYNAR_API_KEY=your_neynar_api_key
  ```

### Airstack API
- **Purpose**: Additional user context and social data
- **Endpoints**: Social profiles, token holdings
- **Rate Limits**: 1000 requests/day (free tier)
- **Configuration**:
  ```env
  VITE_AIRSTACK_API_KEY=your_airstack_api_key
  ```

### Alchemy API (Base Network)
- **Purpose**: Blockchain interactions and payments
- **Network**: Base Mainnet
- **Configuration**:
  ```env
  VITE_ALCHEMY_API_KEY=your_alchemy_api_key
  ```

### X402 Payment Protocol
- **Purpose**: Micro-transaction payments
- **Base URL**: `https://payments.vistara.dev`
- **Supported Networks**: Base, Ethereum

## Authentication

### Wallet-Based Authentication
Users authenticate using their connected wallet address. The application uses:
- **RainbowKit**: Wallet connection interface
- **Wagmi**: Ethereum wallet interactions
- **Privy**: Optional enhanced authentication

### API Key Authentication
External API calls use API key authentication:
```http
Authorization: Bearer {api_key}
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INVALID_JURISDICTION",
    "message": "The specified jurisdiction is not supported",
    "details": {
      "supportedJurisdictions": ["us", "uk", "ca", "au", "eu"]
    }
  }
}
```

### Error Codes
- `INVALID_REQUEST`: Malformed request
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Rate limit exceeded
- `PAYMENT_REQUIRED`: Premium feature requires payment
- `INTERNAL_ERROR`: Server error

## Rate Limiting

### API Rate Limits
- **Free Users**: 10 queries/hour
- **Premium Users**: 100 queries/hour
- **Template Generation**: 5 templates/hour (premium only)

### Rate Limit Headers
```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1640995200
```

## Deployment

### Environment Variables
```env
# Core Configuration
VITE_API_BASE_URL=https://api.legalease.frame
VITE_APP_ENV=production

# AI Integration
VITE_OPENAI_API_KEY=your_openrouter_api_key

# Farcaster Integration
VITE_NEYNAR_API_KEY=your_neynar_api_key

# Blockchain Integration
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_AIRSTACK_API_KEY=your_airstack_api_key

# Payment Integration
VITE_PAYMENT_BASE_URL=https://payments.vistara.dev

# Analytics (Optional)
VITE_ANALYTICS_ID=your_analytics_id
```

### Docker Deployment
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --prefer-offline --no-audit
COPY . .
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:22-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Health Check Endpoint
```http
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0",
  "services": {
    "openai": "connected",
    "neynar": "connected",
    "airstack": "connected",
    "database": "connected"
  }
}
```

## Security Considerations

### Data Privacy
- User queries are not stored permanently
- Personal information is encrypted at rest
- GDPR compliance for EU users

### Input Validation
- All user inputs are sanitized
- SQL injection prevention
- XSS protection

### Rate Limiting
- Per-user rate limiting
- IP-based rate limiting
- DDoS protection

### Payment Security
- X402 protocol for secure micro-transactions
- No storage of payment credentials
- Transaction verification

## Monitoring and Analytics

### Key Metrics
- Query volume and success rate
- User engagement and retention
- Payment conversion rates
- API response times
- Error rates by endpoint

### Logging
- Structured JSON logging
- Request/response logging
- Error tracking with stack traces
- Performance monitoring

## Support and Maintenance

### Documentation Updates
This documentation is maintained alongside code changes. For the latest version, see the repository's `docs/` directory.

### API Versioning
The API uses semantic versioning. Breaking changes will increment the major version number.

### Support Channels
- GitHub Issues: Technical bugs and feature requests
- Documentation: In-code comments and README files
- Community: Farcaster channels for user support

---

*Last Updated: January 2024*
*Version: 1.0.0*
