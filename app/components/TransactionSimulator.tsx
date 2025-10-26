'use client';

import React, { useState, useEffect } from 'react';

interface TransactionSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  transactionType: 'mint' | 'trade' | 'quest_reward' | 'battle_reward';
  transactionData?: {
    item?: string;
    amount?: number;
    recipient?: string;
    gasFee?: number;
  };
}

type TransactionState = 'pending' | 'confirming' | 'confirmed' | 'failed';

const TransactionSimulator: React.FC<TransactionSimulatorProps> = ({
  isOpen,
  onClose,
  transactionType,
  transactionData = {}
}) => {
  const [currentState, setCurrentState] = useState<TransactionState>('pending');
  const [progress, setProgress] = useState(0);
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    // Reset state when modal opens
    setCurrentState('pending');
    setProgress(0);
    setTxHash('');

    // Simulate transaction process
    const simulateTransaction = async () => {
      // Generate fake transaction hash
      const fakeHash = '0x' + Math.random().toString(16).substr(2, 40);
      setTxHash(fakeHash);

      // Pending state (0-30%)
      for (let i = 0; i <= 30; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Confirming state (30-80%)
      setCurrentState('confirming');
      for (let i = 30; i <= 80; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Confirmed state (80-100%)
      setCurrentState('confirmed');
      for (let i = 80; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 150));
      }

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    };

    simulateTransaction();
  }, [isOpen, onClose]);

  const getTransactionTitle = () => {
    switch (transactionType) {
      case 'mint':
        return 'Minting Character NFT';
      case 'trade':
        return 'Trading Item';
      case 'quest_reward':
        return 'Claiming Quest Reward';
      case 'battle_reward':
        return 'Claiming Battle Reward';
      default:
        return 'Blockchain Transaction';
    }
  };

  const getTransactionDescription = () => {
    switch (transactionType) {
      case 'mint':
        return 'Creating your character as an NFT on the blockchain...';
      case 'trade':
        return `Trading ${transactionData.item} with another player...`;
      case 'quest_reward':
        return 'Claiming your quest completion rewards...';
      case 'battle_reward':
        return 'Claiming your battle victory rewards...';
      default:
        return 'Processing blockchain transaction...';
    }
  };

  const getStateIcon = () => {
    switch (currentState) {
      case 'pending':
        return '⏳';
      case 'confirming':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStateText = () => {
    switch (currentState) {
      case 'pending':
        return 'Transaction Pending';
      case 'confirming':
        return 'Confirming on Blockchain';
      case 'confirmed':
        return 'Transaction Confirmed';
      case 'failed':
        return 'Transaction Failed';
      default:
        return 'Processing...';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{getTransactionTitle()}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Transaction Info */}
        <div className="mb-6">
          <p className="text-gray-300 mb-2">{getTransactionDescription()}</p>
          {txHash && (
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Transaction Hash:</div>
              <div className="text-sm text-blue-400 font-mono break-all">
                {txHash}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">{getStateIcon()} {getStateText()}</span>
            <span className="text-sm text-gray-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                currentState === 'confirmed' 
                  ? 'bg-green-500' 
                  : currentState === 'failed'
                  ? 'bg-red-500'
                  : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-800 rounded p-4 mb-4">
          <div className="text-sm text-gray-400 mb-2">Transaction Details:</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Type:</span>
              <span className="text-white">{transactionType}</span>
            </div>
            {transactionData.item && (
              <div className="flex justify-between">
                <span className="text-gray-300">Item:</span>
                <span className="text-white">{transactionData.item}</span>
              </div>
            )}
            {transactionData.amount && (
              <div className="flex justify-between">
                <span className="text-gray-300">Amount:</span>
                <span className="text-white">{transactionData.amount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-300">Gas Fee:</span>
              <span className="text-white">{transactionData.gasFee || '0.001'} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Network:</span>
              <span className="text-white">Ethereum Mainnet</span>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {currentState === 'confirmed' && (
          <div className="bg-green-900 border border-green-700 rounded p-3 mb-4">
            <div className="text-green-400 font-semibold">✅ Transaction Successful!</div>
            <div className="text-green-300 text-sm mt-1">
              Your transaction has been confirmed on the blockchain.
            </div>
          </div>
        )}

        {currentState === 'failed' && (
          <div className="bg-red-900 border border-red-700 rounded p-3 mb-4">
            <div className="text-red-400 font-semibold">❌ Transaction Failed</div>
            <div className="text-red-300 text-sm mt-1">
              The transaction could not be completed. Please try again.
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          {currentState === 'confirmed' && (
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              Continue
            </button>
          )}
          {currentState === 'failed' && (
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              Close
            </button>
          )}
          {currentState === 'pending' || currentState === 'confirming' ? (
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TransactionSimulator;
