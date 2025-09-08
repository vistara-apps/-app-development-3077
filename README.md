# LegalEase Frame

A comprehensive Farcaster Frame application that provides plain-language legal information and actionable guidance for everyday legal situations. Built with modern web technologies and integrated with multiple APIs for enhanced functionality.

## 🚀 Features

### Core Legal Services
- **Plain-Language Legal Summaries**: Clear, easy-to-understand explanations of common legal rights and procedures
- **Jurisdiction-Specific Guidance**: Tailored legal information based on user's geographic location (US, UK, CA, AU, EU)
- **Actionable Next Steps**: Step-by-step guidance on what actions to take to resolve legal issues
- **AI-Powered Legal Analysis**: Advanced AI integration for contextual legal advice

### Document Templates
- **Pre-built Legal Templates**: Professional legal document templates for common scenarios
- **Template Categories**: Landlord/Tenant, Employment, Consumer Rights, Debt Collection, and more
- **Variable Substitution**: Dynamic document generation with user-specific information
- **Premium Templates**: Advanced templates for complex legal situations

### Legal Resources & Citations
- **Comprehensive Resource Database**: Curated legal resources from official government sources
- **Legal Citations**: Relevant federal and state law references with direct links
- **Official vs. Unofficial Sources**: Clear distinction between government and third-party resources
- **Topic-Based Resource Matching**: Intelligent resource suggestions based on query content

### Payment & Premium Features
- **Micro-Transaction Support**: X402 protocol integration for small payments
- **Premium Template Access**: Pay-per-use model for advanced legal templates
- **Wallet Integration**: Seamless Base network payments via RainbowKit

### Farcaster Integration
- **Native Frame Interface**: Optimized for Farcaster social platform
- **User Profile Integration**: Automatic jurisdiction detection from user profiles
- **Social Sharing**: Easy sharing of legal resources within Farcaster

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Lucide React** for consistent iconography

### Blockchain & Payments
- **RainbowKit** for wallet connection UI
- **Wagmi** for Ethereum wallet interactions
- **Base Network** for low-cost transactions
- **X402 Protocol** for micro-payments

### AI & APIs
- **OpenAI API** (via OpenRouter) for legal advice generation
- **Neynar API** for Farcaster integration
- **Airstack API** for additional user context
- **Alchemy API** for Base network interactions

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Docker** for containerized deployment
- **GitHub Actions** for CI/CD

## 📋 Prerequisites

Before running the application, you'll need:

1. **Node.js** (version 18 or higher)
2. **npm** (version 8 or higher)
3. API keys for:
   - OpenRouter (for AI functionality)
   - Neynar (for Farcaster integration)
   - Alchemy (for Base network)
   - Airstack (optional, for enhanced data)
   - WalletConnect Project ID

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/vistara-apps/-app-development-3077.git
cd -app-development-3077
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your API keys:
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
# AI Integration (Required)
VITE_OPENAI_API_KEY=your_openrouter_api_key_here

# Farcaster Integration (Required)
VITE_NEYNAR_API_KEY=your_neynar_api_key_here

# Blockchain Integration (Required)
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Additional APIs (Optional)
VITE_AIRSTACK_API_KEY=your_airstack_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── FrameButton.tsx     # Reusable button component
│   ├── InfoCard.tsx        # Information display cards
│   ├── JurisdictionSelector.tsx  # Location selection
│   ├── LegalAdviceDisplay.tsx    # AI advice display
│   └── TextInput.tsx       # Input components
├── hooks/              # Custom React hooks
│   ├── useOpenAI.ts        # AI integration hook
│   └── usePaymentContext.ts # Payment handling
├── services/           # API and business logic
│   ├── api.ts              # Main API service layer
│   ├── templates.ts        # Legal template service
│   └── legalResources.ts   # Legal resources & citations
├── App.tsx             # Main application component
└── main.tsx           # Application entry point

docs/
├── API_DOCUMENTATION.md    # Complete API documentation
└── DEPLOYMENT_GUIDE.md     # Deployment instructions

Docker/
├── Dockerfile              # Container configuration
└── docker-compose.yml      # Multi-service setup
```

## 📚 Documentation

- **[API Documentation](docs/API_DOCUMENTATION.md)**: Complete API specifications and data models
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)**: Step-by-step deployment instructions
- **[Legal Templates](src/services/templates.ts)**: Available document templates
- **[Legal Resources](src/services/legalResources.ts)**: Curated legal resource database

## 🚀 Deployment

### Quick Deploy Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Docker
```bash
docker build -t legalease-frame .
docker run -p 3000:3000 --env-file .env legalease-frame
```

For detailed deployment instructions, see the [Deployment Guide](docs/DEPLOYMENT_GUIDE.md).

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌟 Key Features in Detail

### Legal Template System
The application includes a comprehensive template system with:
- **5+ Pre-built Templates** for common legal scenarios
- **Variable Substitution** for personalized documents
- **Premium/Free Tiers** with payment integration
- **Multi-jurisdiction Support** for different legal systems

### AI-Powered Legal Advice
- **Context-Aware Responses** using legal resource database
- **Jurisdiction-Specific Advice** tailored to user location
- **Citation Integration** with relevant laws and regulations
- **Plain-Language Explanations** for complex legal concepts

### Resource Database
- **50+ Curated Legal Resources** from official sources
- **Federal and State Law Citations** with direct links
- **Government Agency Resources** (FTC, EEOC, HUD, etc.)
- **Legal Aid Organization Links** for additional help

## 🔐 Security & Privacy

- **No Permanent Data Storage** of user queries
- **Encrypted API Communications** for all external services
- **Wallet-Based Authentication** for secure payments
- **Input Sanitization** to prevent security vulnerabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `docs/` directory for detailed guides
- **Issues**: Report bugs or request features via GitHub Issues
- **Community**: Join Farcaster developer channels for community support

## 🙏 Acknowledgments

- **Farcaster** for the Frame protocol
- **Base** for low-cost blockchain transactions
- **OpenRouter** for AI API access
- **Neynar** for Farcaster integration tools
- **Legal Aid Organizations** for inspiring accessible legal help

---

*Built with ❤️ for the Farcaster community*
