# NFT Drop Starter Kit

## Purpose

The NFT Drop Starter Kit is a boilerplate project designed to help businesses and creators launch their own NFT collection drops. It provides a complete, production-ready solution for scheduling and managing staged NFT drops with features like allowlists, quantity limits, and flexible pricing options. Built with Next.js, TypeScript, Tailwind CSS, and integrated with blockchain technologies.

## Features

- **Multi-stage NFT Drops:** Support for multiple drop stages with different rules and settings
- **Allowlist Support:** Create exclusive drops for specific users with allowlist functionality
- **Wallet Integration:** Seamless wallet connection using RainbowKit and Wagmi
- **Responsive UI:** Beautiful, mobile-friendly interface built with Tailwind CSS and shadcn/ui
- **Real-time Status:** Live status updates on drop availability, minting progress, and supply
- **Multiple Pricing Options:** Support for free mints and priced mints in various currencies
- **Transaction Handling:** Smooth approval and minting flow with success confirmation
- **Customizable:** Easily customize the UI, drop parameters, and collection details

## Setup

Follow these steps to set up the project:

### Clone the repository:

```bash
git clone https://github.com/liteflow-labs/nft-drop-starter-kit.git
cd nft-drop-starter-kit
```

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

### Build the application:

```bash
npm run build
```

### Start the production server:

```bash
npm start
```

## Configuration

The project uses environment variables to configure the frontend and backend. Create a `.env.local` file in the root of the project and add the following variables:

```bash
# Create your project ID on https://reown.com/
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=

# Create your Liteflow API key on https://dashboard.liteflow.com/developers
NEXT_PUBLIC_LITEFLOW_API_KEY=

# Set your collection's blockchain network ID
NEXT_PUBLIC_COLLECTION_CHAIN=

# Set your NFT collection contract address
NEXT_PUBLIC_COLLECTION_ADDRESS=

# Optional provider URL
NEXT_PUBLIC_ETHEREUM_MAINNET_PROVIDER_URL=
NEXT_PUBLIC_ETHEREUM_SEPOLIA_PROVIDER_URL=
NEXT_PUBLIC_BSC_MAINNET_PROVIDER_URL=
NEXT_PUBLIC_BSC_TESTNET_PROVIDER_URL=
NEXT_PUBLIC_POLYGON_MAINNET_PROVIDER_URL=
NEXT_PUBLIC_POLYGON_AMOY_PROVIDER_URL=
NEXT_PUBLIC_BASE_MAINNET_PROVIDER_URL=
NEXT_PUBLIC_BASE_SEPOLIA_PROVIDER_URL=
NEXT_PUBLIC_NEONEVM_MAINNET_PROVIDER_URL=
NEXT_PUBLIC_NEONEVM_DEVNET_PROVIDER_URL=
NEXT_PUBLIC_LIGHTLINK_PEGASUS_PROVIDER_URL=
NEXT_PUBLIC_LIGHTLINK_PHOENIX_PROVIDER_URL=
NEXT_PUBLIC_ARBITRUM_ONE_PROVIDER_URL=
NEXT_PUBLIC_ARBITRUM_SEPOLIA_PROVIDER_URL=
```

## Technology Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/) with TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Web3 Integration:**
  - [Wagmi](https://wagmi.sh/) for React hooks for Ethereum
  - [RainbowKit](https://www.rainbowkit.com/) for wallet connection
- **NFT Management:** [Liteflow SDK](https://docs.liteflow.com/) for drop management and NFT operations
- **State Management:** [React Query](https://tanstack.com/query/latest) for data fetching and caching

## Customization

### UI Customization

The UI is built with Tailwind CSS and shadcn/ui, allowing you to easily customize the appearance:

- Edit `tailwind.config.ts` to modify the color scheme, typography, and other design tokens
- Use the component-based architecture to add, modify, or remove UI elements

### NFT Collection Settings

Configure your NFT collection details by:

1. Setting the environment variables for your collection's chain ID and contract address
2. Customize the collection information display in the UI components
3. Configure drop stages with specific rules for each phase of your NFT launch

## Deployment

The project is designed to be deployed to Vercel. You can deploy the project by connecting your GitHub repository to Vercel and configuring the environment variables in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/liteflow-labs/nft-drop-starter-kit)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
