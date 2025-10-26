# Dungeon Hunt - Web3 Edition

A blockchain-powered Dungeons & Dragons terminal-based adventure game built with Next.js and Web3 integration.

## Features

### 🎮 Game Features
- **Character Management**: Create and manage your D&D character with stats, inventory, and progression
- **Combat System**: Engage in turn-based combat with various enemies
- **Exploration**: Discover new locations and embark on quests
- **Trading**: Buy and sell items in the game shop
- **Quest System**: Complete quests to gain experience and rewards
- **Level Progression**: Level up your character as you gain experience

### 🔗 Web3 Integration
- **Wallet Connection**: Connect your wallet using RainbowKit (supports MetaMask, WalletConnect, Coinbase Wallet, and more)
- **NFT Minting**: Mint your character as an NFT on the blockchain
- **Smart Contracts**: Interact with D&D game smart contracts using wagmi
- **Peer-to-Peer Trading**: Trade items with other players using blockchain
- **Balance Checking**: View your wallet's ETH balance automatically

## Getting Started

### Prerequisites
- Node.js 18+ 
- A Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet, etc.)
- Some ETH for gas fees
- WalletConnect Project ID (get from https://cloud.walletconnect.com/)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dungeon-hunt
```

2. Install dependencies:
```bash
npm install
```

3. Set up your WalletConnect Project ID:
   - Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project and get your Project ID
   - Create a `.env.local` file in the project root
   - Add: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

### Terminal Commands

Type any of these commands in the terminal:

- `help` - Show all available commands
- `connect` - Use Connect Button above for wallet connection
- `character` - View your character stats
- `inventory` - Check your inventory
- `explore` - Explore new locations
- `fight` - Engage in combat
- `shop` - Visit the shop to buy items
- `quest` - Start a new quest
- `levelup` - Level up your character
- `trade` - Trade with other players
- `mint` - Mint your character as an NFT
- `balance` - Check your wallet balance
- `clear` - Clear the terminal

### Game Mechanics

1. **Character Creation**: Start with a basic fighter character
2. **Combat**: Fight enemies to gain gold and experience
3. **Exploration**: Discover new locations with different challenges
4. **Shopping**: Use gold to buy better equipment
5. **Questing**: Complete quests for bonus experience
6. **Leveling**: Gain experience to level up and increase stats
7. **Web3 Features**: Connect wallet, mint NFTs, trade with other players

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Web3**: RainbowKit + wagmi + viem for blockchain interactions
- **UI**: Custom terminal interface with D&D theming
- **Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet, and more

## Smart Contract Integration

The game is designed to work with custom D&D smart contracts that handle:
- Character NFT minting
- Item trading between players
- Quest completion rewards
- Battle outcomes and rewards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue on GitHub.
