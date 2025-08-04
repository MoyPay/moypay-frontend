# MoyPay

> A modern payroll management application built on Etherlink blockchain

MoyPay is a comprehensive payroll management app that helps organizations manage their employees' payroll, taxes, and benefits with ease. Built with Next.js 15 and integrated with blockchain technology for secure and transparent salary management.

## ✨ Features

- **Organization Management** - Create and manage organizations with employee hierarchies
- **Payroll Processing** - Automated salary distribution and payment processing
- **Auto Earn** - Automatic investment of salaries into yield-optimizing DeFi protocols
- **Dashboard** - Comprehensive analytics and reporting for organizations and employees
- **Web3 Integration** - Connect with Web3 wallets via Reown
- **Responsive Design** - Mobile-first responsive interface

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Radix UI, Lucide Icons
- **Blockchain**: Wagmi, Viem, Ethers.js
- **Wallet Connection**: Reown
- **State Management**: TanStack Query
- **Charts**: Recharts, Lightweight Charts
- **Forms**: React Hook Form + Zod validation
- **Animation**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MoyPay/moypay-frontend.git
   cd moypay-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_api_key
   NEXT_PUBLIC_ALCHEMY_KEY_2=your_backup_alchemy_key
   NEXT_PUBLIC_ALCHEMY_KEY_3=your_third_alchemy_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint with auto-fix

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PROJECT_ID` | WalletConnect Project ID for wallet connections | Yes |
| `NEXT_PUBLIC_ALCHEMY_KEY` | Primary Alchemy API key for blockchain RPC | Yes |

### Blockchain Network

The app is configured to work with **Etherlink Testnet**:
- Network: Etherlink Testnet
- RPC URL: `https://node.ghostnet.etherlink.com`
- Chain ID: 128123 (Etherlink Testnet)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (client)/          # Client-side pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── wallet/           # Wallet connection components
│   └── providers.tsx     # App providers
├── config/               # Configuration files
├── data/                 # Static data and mock data
├── hooks/                # Custom React hooks
│   ├── mutation/         # TanStack Query mutations
│   └── query/           # TanStack Query queries
├── lib/                  # Utility libraries
│   ├── helper/          # Helper functions
│   ├── polyfills.ts     # Browser API polyfills for SSR
│   └── wagmi.ts         # Wagmi configuration
└── public/              # Static assets
```

## 🎯 Key Features Deep Dive

### Organization Management
- Create and manage multiple organizations
- Add and manage employees
- Set salary periods and payment schedules
- Track organization finances and employee payments

### Auto Earn Integration
- Automatically invest employee salaries into DeFi protocols
- Choose from multiple yield-optimizing strategies
- Real-time APY tracking and earnings display
- Compound interest calculations

### Web3 Wallet Integration
- Support for multiple wallet types via Reown
- Secure transaction signing
- Real-time balance and transaction tracking
- Network switching and error handling

## 🔧 Development

### Code Style
The project uses ESLint and Prettier for code formatting. Run `pnpm lint` to check and auto-fix issues.

### Building for Production
```bash
pnpm build
```

The build process includes:
- TypeScript compilation
- Code optimization and tree shaking
- Static page generation
- Bundle analysis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Etherlink Hackathon
- Powered by [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://radix-ui.com/)
- Wallet integration via [Reown](https://reown.com/)
- Blockchain integration with [Wagmi](https://wagmi.sh/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy coding! 🚀**
