# SolExplorer

SolExplorer is a next-generation Solana data explorer that allows users to explore Solana blockchain data, including accounts, blocks, transactions, NFTs, and tokens. This README provides instructions on how to install and run the app locally, as well as an overview of the tools, RPC, screens, and features.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- Git

### Clone the Repository

```sh
git clone https://github.com/your-username/solana-data-explorer.git
cd solana-data-explorer
```

### Install Dependencies

Using npm:

```sh
npm install
```

Using Yarn:

```sh
yarn install
```

## Running the App Locally

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables. You need to get your Mainnet and Devnet API keys from [Helius](https://dev.helius.xyz/dashboard/app) and a [Gemini AI](https://aistudio.google.com/app/apikey) API key.

```sh
NEXT_PUBLIC_DEVNET_API_BASE_URL="https://devnet.helius-rpc.com/?api-key=your_devnet_api_key"
NEXT_PUBLIC_MAINNET_API_BASE_URL="https://mainnet.helius-rpc.com/?api-key=your_mainnet_api_key"
NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_ai_api_key"
```

### Run the App

Using npm:

```sh
npm run dev
```

Using Yarn:

```sh
yarn dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```lua
.
├── .next
├── app
│   ├── common
│   │   ├── types
│   │   └── utils
│   ├── components
│   │   ├── atoms
│   │   ├── charts
│   │   ├── layout
│   │   ├── molecules
│   │   ├── SideNav.tsx
│   │   └── ThemeSwitch.tsx
│   ├── context
│   │   └── themeProvider.tsx
│   ├── dashboard
│   │   ├── account
│   │   ├── block
│   │   ├── developer-tools
│   │   ├── nfts
│   │   ├── tokens
│   │   ├── transaction
│   │   └── page.tsx
│   ├── services
│   │   ├── accountService.ts
│   │   ├── dashboardService.ts
│   │   ├── nftService.ts
│   │   └── tokenService.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── node_modules
├── public
├── .env
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Tools and Technologies

- Next.js: React framework for building the app.
- TypeScript: For type safety.
- Tailwind CSS: For styling.
- Solana Web3.js: For interacting with Solana blockchain.
- Helius API: For fetching blockchain data.
- Gemini AI: For AI-based features in developer tools.
- Axios: For making HTTP requests.

## Screens and Features

### Dashboard

- Account Overview: Displays account details such as balance, allocated space, and recent transactions.
- Block Overview: Shows details about specific blocks including block time, number of transactions, and parent slot.
- Developer Tools: Includes AI-powered tools for developers to interact with the Solana blockchain.
- NFTs: Allows users to explore details of specific NFTs.
- Tokens: Provides information about various tokens on the Solana blockchain.
- Transaction Details: Displays information about specific transactions.

## Features

- AI Assistant: "Toly", an AI assistant powered by Gemini AI, can answer questions about the Solana blockchain.
- Theme Switch: Toggle between light and dark modes.
- Real-time Data: Fetches and displays real-time blockchain data using Helius API.

## API Services

### Account Service

- fetchData: Fetches account data from the Solana blockchain.

### Dashboard Service

- getTransactionSignatures: Fetches transaction signatures for a specific account.
- getTransactionDetails: Fetches details for specific transactions.

### NFT Service

- fetchNftMetadata: Fetches metadata for a specific NFT.

### Token Service

- fetchTokenMetadata: Fetches metadata for a specific token.

## Custom Hooks

- useFetch: A custom hook for fetching data.

### Utilities

- classnames: Utility for conditionally joining class names.
- numberFormatter: Utility for formatting numbers.

Contact
For any questions or feedback, please contact me on X [@codewithmide](https://x.com/codewithmide).

Thank you for using SolExplorer! I hope it helps you explore the Solana blockchain more effectively.
