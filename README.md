# ShieldKit - Your Web3 Security Consultant

A comprehensive Base MiniApp for Web3 security, transaction scanning, and digital identity protection.

## Features

- **Transaction Scanner**: Real-time security scanning before signing transactions
- **Contract Reputation Feed**: Community-driven safety ratings and reviews
- **Privacy Checker**: Analyze wallet exposure and get privacy recommendations
- **Security Notifications**: Proactive alerts for threats and suspicious activity
- **Micro-transaction Payments**: Pay-per-use model for premium features

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- OnchainKit (Base integration)
- Farcaster MiniKit

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Theme Support

ShieldKit supports multiple blockchain themes:
- **Default**: Professional finance theme (dark navy + gold)
- **CELO**: Black background with yellow accents
- **Solana**: Purple gradient theme
- **Base**: Blue theme
- **Coinbase**: Navy blue theme

Visit `/theme-preview` to preview and switch themes.

## Project Structure

```
app/
├── components/          # React components
│   ├── AppShell.tsx
│   ├── WelcomeScreen.tsx
│   ├── TransactionScanner.tsx
│   ├── ReputationFeed.tsx
│   ├── PrivacyChecker.tsx
│   └── NotificationSettings.tsx
├── theme-preview/       # Theme preview page
├── layout.tsx          # Root layout
├── page.tsx            # Main page
├── providers.tsx       # OnchainKit provider
└── globals.css         # Global styles
```

## License

MIT
