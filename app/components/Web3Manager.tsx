'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import TransactionSimulator from './TransactionSimulator';

// Mock smart contract ABI for D&D game
const DnDGameABI = [
  {
    "inputs": [
      {"name": "name", "type": "string"},
      {"name": "class", "type": "string"}
    ],
    "name": "mintCharacter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "getCharacter",
    "outputs": [
      {"name": "", "type": "string"},
      {"name": "", "type": "string"},
      {"name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "characterId", "type": "uint256"},
      {"name": "enemyId", "type": "uint256"}
    ],
    "name": "battle",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface Web3ManagerProps {
  isConnected: boolean;
  walletAddress?: string;
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

const Web3Manager: React.FC<Web3ManagerProps> = ({ 
  isConnected, 
  walletAddress, 
  onConnect, 
  onDisconnect 
}) => {
  const { address, isConnected: wagmiConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'mint' | 'trade' | 'quest_reward' | 'battle_reward'>('mint');
  const [transactionData, setTransactionData] = useState<any>({});

  const contractAddress = '0x1234567890123456789012345678901234567890'; // Mock address

  const { writeContract, isPending: isMinting } = useWriteContract({
    mutation: {
      onSuccess: (data: any) => {
        console.log('Character NFT minted successfully:', data);
        // Don't show alert, let transaction simulator handle it
      },
      onError: (error: any) => {
        console.error('Failed to mint character:', error);
        // Don't show alert, let transaction simulator handle it
      },
    },
  });

  const mintCharacterNFT = () => {
    setTransactionType('mint');
    setTransactionData({
      item: 'Character NFT',
      amount: 1,
      gasFee: 0.01
    });
    setIsTransactionOpen(true);
    
    // Simulate the actual contract call after a delay
    setTimeout(() => {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: DnDGameABI,
        functionName: 'mintCharacter',
        args: ['Adventurer', 'Fighter'],
        value: parseEther('0.01'), // 0.01 ETH minting fee
      });
    }, 1000);
  };

  // Update parent component when connection status changes
  React.useEffect(() => {
    if (wagmiConnected && address) {
      onConnect(address);
    } else if (!wagmiConnected) {
      onDisconnect();
    }
  }, [wagmiConnected, address, onConnect, onDisconnect]);

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-yellow-400 font-bold mb-3">Web3 Integration</h3>
      
      <div className="space-y-3">
        {/* RainbowKit Connect Button */}
        <div className="flex justify-center">
          <ConnectButton />
        </div>
        
        {/* Connection Status */}
        {wagmiConnected && address ? (
          <div className="space-y-3">
            <div className="text-green-400 text-center">
              ✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </div>
            
            {/* Balance Display */}
            {balance && (
              <div className="text-blue-400 text-center">
                💰 Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-center space-x-2">
              <button
                onClick={mintCharacterNFT}
                disabled={isMinting}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm transition-colors"
              >
                {isMinting ? 'Minting...' : 'Mint Character NFT'}
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="text-gray-400 text-xs text-center">
              <div>Network: {wagmiConnected ? 'Connected' : 'Not Connected'}</div>
              <div>Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            Connect your wallet to start playing
          </div>
        )}
      </div>
      
      {/* Transaction Simulator Modal */}
      <TransactionSimulator
        isOpen={isTransactionOpen}
        onClose={() => setIsTransactionOpen(false)}
        transactionType={transactionType}
        transactionData={transactionData}
      />
    </div>
  );
};

export default Web3Manager;
