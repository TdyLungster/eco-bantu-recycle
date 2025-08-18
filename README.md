
# Bantu The People - E-Waste Recycling Platform

A comprehensive e-waste management platform built with React, Firebase, and modern web technologies.

## 🌍 About

Bantu The People is South Africa's leading e-waste recycling solution, helping individuals and businesses responsibly dispose of electronic waste while contributing to environmental sustainability.

## 🚀 Features

### Frontend
- **Modern React Stack**: Built with Vite, TypeScript, Tailwind CSS, and shadcn/ui
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Authentication**: Firebase Auth with Google sign-in
- **Real-time Data**: Firestore integration for live updates
- **Progressive Web App**: Optimized for mobile and desktop

### Tools & Services
- **Pickup Scheduler**: Book free e-waste collection services
- **Quote Generator**: Get custom quotes for corporate recycling
- **Value Estimator**: Calculate recycling value of devices
- **Impact Calculator**: See environmental benefits of recycling
- **Location Finder**: Find certified recycling centers
- **Certificate Generator**: Generate data destruction certificates

### Content Management
- **Blog System**: Dynamic blog with admin publishing
- **Directory**: Searchable directory of recycling partners
- **Analytics**: GA4 integration with event tracking
- **SEO Optimized**: Meta tags, sitemap, and structured data

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Framer Motion** for animations
- **React Query** for data fetching

### Backend
- **Firebase Functions** with Express.js
- **MongoDB Atlas** for database
- **Firebase Admin SDK** for authentication
- **PayFast** for payment processing

### Development Tools
- **ESLint** and **Prettier** for code quality
- **TypeScript** for type safety
- **Vitest** for testing
- **Honeybadger** for error monitoring

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase CLI
- MongoDB Atlas account (for backend)
- Doppler CLI (recommended for secrets management)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/bantu-e-waste.git
   cd bantu-e-waste
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```

   **Using Doppler (Recommended):**
   ```bash
   # Install Doppler CLI
   npm install -g @doppler/cli
   
   # Login and setup project
   doppler login
   doppler setup
   
   # Run with Doppler
   doppler run -- npm run dev
   ```

   **Manual Setup:**
   Configure the following variables in `.env.local`:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcd1234
   
   # API Configuration
   VITE_API_BASE=https://us-central1-your_project.cloudfunctions.net/api
   
   # Analytics & Maps
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Backend Setup (Firebase Functions)

1. **Navigate to functions directory**
   ```bash
   cd functions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Set the following environment variables for Firebase Functions:
   ```bash
   # MongoDB
   firebase functions:config:set mongo.uri="mongodb+srv://user:pass@cluster.mongodb.net/bantu"
   
   # PayFast
   firebase functions:config:set payfast.passphrase="your_payfast_passphrase"
   
   # Admin Emails
   firebase functions:config:set admin.emails="admin@company.com,owner@company.com"
   
   # Google Service Account (for Sheets integration)
   firebase functions:config:set google.service_account="base64_encoded_json"
   ```

4. **Start local development**
   ```bash
   npm run serve
   ```

5. **Deploy to production**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project
   - Enable Authentication, Firestore, and Functions

2. **Configure Authentication**
   - Enable Google sign-in provider
   - Add authorized domains

3. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read access to posts and directory
       match /posts/{document} {
         allow read: if true;
         allow write: if isAdmin();
       }
       
       match /directory/{document} {
         allow read: if true;
         allow write: if isAdmin();
       }
       
       function isAdmin() {
         return request.auth != null && 
                request.auth.token.email in ['admin@company.com'];
       }
     }
   }
   ```

### MongoDB Setup

1. **Create MongoDB Atlas Cluster**
   - Sign up at [MongoDB Atlas](https://cloud.mongodb.com)
   - Create new cluster
   - Create database user
   - Whitelist IP addresses

2. **Database Structure**
   The application uses the following collections:
   - `orders` - Pickup requests, quotes, and payments
   - `posts` - Blog posts
   - `directoryentries` - Recycling center directory

### PayFast Integration

1. **Create PayFast Account**
   - Sign up at [PayFast](https://www.payfast.co.za)
   - Get merchant credentials
   - Configure ITN URL: `https://your-domain/api/payfast/itn`

2. **Test in Sandbox**
   - Use sandbox credentials for development
   - Test payment flows before going live

## 🚀 Deployment

### Frontend Deployment

**Netlify (Recommended):**
```bash
# Build the project
npm run build

# Deploy to Netlify
# Connect your GitHub repo to Netlify for automatic deployments
```

**Firebase Hosting:**
```bash
# Build and deploy
npm run build
firebase deploy --only hosting
```

### Backend Deployment

```bash
# Deploy Functions
cd functions
npm run deploy
```

### Environment Variables in Production

Set the following in your deployment platform:

**Netlify:**
- Go to Site Settings > Environment Variables
- Add all `VITE_*` variables

**Vercel:**
```bash
vercel env add VITE_FIREBASE_API_KEY
# Add all other variables
```

## 📊 Analytics & Monitoring

### Google Analytics 4
- Events are automatically tracked for form submissions
- Custom events for user interactions
- E-commerce tracking for donations/payments

### Error Monitoring
- Honeybadger integration for error tracking
- Real-time error alerts
- Performance monitoring

### Performance
- Lighthouse scores > 90 for all metrics
- Image optimization
- Code splitting and lazy loading

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests (if configured)
npm run test:e2e
```

## 🔒 Security

### Best Practices Implemented
- **Input Validation**: Zod schemas for all forms
- **Authentication**: Firebase Auth with secure tokens
- **Rate Limiting**: Express rate limiting on API endpoints
- **Data Sanitization**: Clean inputs before database storage
- **HTTPS Only**: All production traffic over HTTPS
- **Environment Variables**: Sensitive data in environment variables

### Security Headers
```javascript
// Implemented in Firebase Functions
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "https://www.googletagmanager.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Style
- Follow TypeScript best practices
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Email**: technical@bantuthepeople.com
- **Phone**: +27 10 065 4785

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Basic website and tools
- ✅ Firebase integration
- ✅ Payment processing
- ✅ Admin dashboard

### Phase 2 (Next)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Automated email campaigns
- [ ] Multi-language support

### Phase 3 (Future)
- [ ] AI-powered waste classification
- [ ] IoT device integration
- [ ] Carbon credit marketplace
- [ ] B2B portal expansion

---

**Built with 💚 for a sustainable future**

*Bantu The People - Making South Africa Greener, One Device at a Time*
