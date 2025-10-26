'use client';

import React, { useState, useRef, useEffect } from 'react';
import Web3Manager from './Web3Manager';

interface Command {
  command: string;
  output: string | React.ReactNode;
  timestamp: Date;
}

interface Character {
  name: string;
  class: string;
  level: number;
  hp: number;
  maxHp: number;
  gold: number;
  experience: number;
  inventory: string[];
}

interface GameState {
  character: Character;
  location: string;
  isConnected: boolean;
  walletAddress?: string;
}

const DnDTerminal: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-green-400">
          <div className="text-yellow-400 font-bold text-lg mb-2">
            🐉 Welcome to Dungeon Hunt - Web3 Edition! 🐉
          </div>
          <div className="text-gray-300">
            A blockchain-powered Dungeons & Dragons adventure awaits!
          </div>
          <div className="text-gray-400 mt-2">
            Type 'help' to see available commands, or 'connect' to link your wallet.
          </div>
        </div>
      ),
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    character: {
      name: 'Adventurer',
      class: 'Fighter',
      level: 1,
      hp: 20,
      maxHp: 20,
      gold: 100,
      experience: 0,
      inventory: ['Sword', 'Shield', 'Health Potion']
    },
    location: 'Tavern',
    isConnected: false
  });

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const executeCommand = async (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-blue-400">
            <div className="font-bold mb-2">Available Commands:</div>
            <div className="ml-4 space-y-1">
              <div><span className="text-yellow-400">connect</span> - Use Connect Button above for wallet</div>
              <div><span className="text-yellow-400">character</span> - View character stats</div>
              <div><span className="text-yellow-400">inventory</span> - Check your inventory</div>
              <div><span className="text-yellow-400">explore</span> - Explore the current location</div>
              <div><span className="text-yellow-400">fight</span> - Engage in combat</div>
              <div><span className="text-yellow-400">shop</span> - Visit the shop</div>
              <div><span className="text-yellow-400">mint</span> - Mint NFT items</div>
              <div><span className="text-yellow-400">balance</span> - Check wallet balance</div>
              <div><span className="text-yellow-400">quest</span> - Start a new quest</div>
              <div><span className="text-yellow-400">levelup</span> - Level up your character</div>
              <div><span className="text-yellow-400">trade</span> - Trade with other players</div>
              <div><span className="text-yellow-400">clear</span> - Clear terminal</div>
            </div>
          </div>
        );
        break;

      case 'connect':
        output = (
          <div className="text-blue-400">
            💡 Use the Connect Button above to connect your wallet!
            <div className="text-gray-300 mt-1">
              RainbowKit provides a better wallet connection experience.
            </div>
          </div>
        );
        break;

      case 'character':
        output = (
          <div className="text-blue-400">
            <div className="font-bold mb-2">Character Sheet:</div>
            <div className="ml-4 space-y-1">
              <div><span className="text-yellow-400">Name:</span> {gameState.character.name}</div>
              <div><span className="text-yellow-400">Class:</span> {gameState.character.class}</div>
              <div><span className="text-yellow-400">Level:</span> {gameState.character.level}</div>
              <div><span className="text-yellow-400">HP:</span> {gameState.character.hp}/{gameState.character.maxHp}</div>
              <div><span className="text-yellow-400">Gold:</span> {gameState.character.gold}</div>
              <div><span className="text-yellow-400">Experience:</span> {gameState.character.experience}</div>
            </div>
          </div>
        );
        break;

      case 'inventory':
        output = (
          <div className="text-purple-400">
            <div className="font-bold mb-2">Inventory:</div>
            <div className="ml-4">
              {gameState.character.inventory.map((item, index) => (
                <div key={index} className="text-gray-300">• {item}</div>
              ))}
            </div>
          </div>
        );
        break;

      case 'explore':
        const locations = ['Dark Forest', 'Ancient Ruins', 'Mystic Cave', 'Dragon\'s Lair'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        
        setGameState(prev => ({
          ...prev,
          location: randomLocation
        }));
        
        output = (
          <div className="text-green-400">
            🗺️ You venture into the {randomLocation}...
            <div className="text-gray-300 mt-1">
              The air is thick with mystery. What will you find here?
            </div>
          </div>
        );
        break;

      case 'fight':
        const enemies = ['Goblin', 'Orc', 'Skeleton', 'Dark Wizard'];
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        const damage = Math.floor(Math.random() * 10) + 1;
        const goldReward = Math.floor(Math.random() * 50) + 10;
        const expReward = Math.floor(Math.random() * 20) + 5;
        
        setGameState(prev => ({
          ...prev,
          character: {
            ...prev.character,
            hp: Math.max(0, prev.character.hp - damage),
            gold: prev.character.gold + goldReward,
            experience: prev.character.experience + expReward
          }
        }));
        
        output = (
          <div className="text-red-400">
            ⚔️ Battle with {enemy}!
            <div className="text-gray-300 mt-1">
              You take {damage} damage but defeat the {enemy}!
            </div>
            <div className="text-yellow-400 mt-1">
              +{goldReward} gold, +{expReward} experience
            </div>
          </div>
        );
        break;

      case 'shop':
        const shopItems = ['Health Potion', 'Magic Sword', 'Shield of Protection', 'Scroll of Fireball'];
        const randomItem = shopItems[Math.floor(Math.random() * shopItems.length)];
        const itemCost = Math.floor(Math.random() * 100) + 50;
        
        if (gameState.character.gold >= itemCost) {
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              gold: prev.character.gold - itemCost,
              inventory: [...prev.character.inventory, randomItem]
            }
          }));
          
          output = (
            <div className="text-green-400">
              🛒 You purchase {randomItem} for {itemCost} gold!
              <div className="text-gray-300 mt-1">
                Remaining gold: {gameState.character.gold - itemCost}
              </div>
            </div>
          );
        } else {
          output = (
            <div className="text-red-400">
              💰 Not enough gold! You need {itemCost} gold to buy {randomItem}.
              <div className="text-gray-300 mt-1">
                Current gold: {gameState.character.gold}
              </div>
            </div>
          );
        }
        break;

      case 'mint':
        if (!gameState.isConnected) {
          output = (
            <div className="text-red-400">
              ❌ Please connect your wallet first using the 'connect' command.
            </div>
          );
        } else {
          output = (
            <div className="text-purple-400">
              🎨 Minting NFT item...
              <div className="text-gray-300 mt-1">
                This would interact with a smart contract to mint your character as an NFT.
              </div>
              <div className="text-yellow-400 mt-1">
                Wallet: {gameState.walletAddress?.slice(0, 6)}...{gameState.walletAddress?.slice(-4)}
              </div>
            </div>
          );
        }
        break;

      case 'balance':
        if (!gameState.isConnected) {
          output = (
            <div className="text-red-400">
              ❌ Please connect your wallet first using the Connect Button above.
            </div>
          );
        } else {
          output = (
            <div className="text-blue-400">
              💰 Wallet Balance:
              <div className="text-gray-300 mt-1">
                Check the Web3 Integration panel above for your balance.
              </div>
              <div className="text-gray-300">
                Address: {gameState.walletAddress?.slice(0, 6)}...{gameState.walletAddress?.slice(-4)}
              </div>
            </div>
          );
        }
        break;

      case 'quest':
        const quests = [
          'Defeat the Goblin King',
          'Retrieve the Lost Artifact',
          'Rescue the Captured Princess',
          'Clear the Haunted Crypt',
          'Find the Dragon\'s Treasure'
        ];
        const randomQuest = quests[Math.floor(Math.random() * quests.length)];
        const questReward = Math.floor(Math.random() * 100) + 50;
        
        setGameState(prev => ({
          ...prev,
          character: {
            ...prev.character,
            experience: prev.character.experience + questReward
          }
        }));
        
        output = (
          <div className="text-purple-400">
            📜 New Quest: {randomQuest}
            <div className="text-gray-300 mt-1">
              Quest accepted! You gain {questReward} experience.
            </div>
            <div className="text-yellow-400 mt-1">
              Complete the quest to earn additional rewards!
            </div>
          </div>
        );
        break;

      case 'levelup':
        const expNeeded = gameState.character.level * 100;
        if (gameState.character.experience >= expNeeded) {
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              level: prev.character.level + 1,
              maxHp: prev.character.maxHp + 10,
              hp: prev.character.maxHp + 10,
              experience: prev.character.experience - expNeeded
            }
          }));
          
          output = (
            <div className="text-yellow-400">
              🎉 Level Up! You are now level {gameState.character.level + 1}!
              <div className="text-gray-300 mt-1">
                +10 Max HP, HP fully restored!
              </div>
            </div>
          );
        } else {
          output = (
            <div className="text-red-400">
              ❌ Not enough experience to level up!
              <div className="text-gray-300 mt-1">
                You need {expNeeded} experience (current: {gameState.character.experience})
              </div>
            </div>
          );
        }
        break;

      case 'trade':
        if (!gameState.isConnected) {
          output = (
            <div className="text-red-400">
              ❌ Please connect your wallet first to trade with other players.
            </div>
          );
        } else {
          const tradeItems = ['Magic Ring', 'Enchanted Armor', 'Rare Gem', 'Ancient Scroll'];
          const randomItem = tradeItems[Math.floor(Math.random() * tradeItems.length)];
          const tradePrice = Math.floor(Math.random() * 200) + 100;
          
          output = (
            <div className="text-blue-400">
              🤝 Trading with another player...
              <div className="text-gray-300 mt-1">
                Player offers: {randomItem} for {tradePrice} gold
              </div>
              <div className="text-yellow-400 mt-1">
                This would use smart contracts for secure peer-to-peer trading!
              </div>
            </div>
          );
        }
        break;

      case 'clear':
        setCommands([]);
        return;

      default:
        output = (
          <div className="text-red-400">
            ❌ Unknown command: {command}
            <div className="text-gray-300 mt-1">
              Type 'help' to see available commands.
            </div>
          </div>
        );
    }

    setCommands(prev => [...prev, {
      command,
      output,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      executeCommand(inputValue);
      setInputValue('');
    }
  };

  const handleWalletConnect = (address: string) => {
    setGameState(prev => ({
      ...prev,
      isConnected: true,
      walletAddress: address
    }));
  };

  const handleWalletDisconnect = () => {
    setGameState(prev => ({
      ...prev,
      isConnected: false,
      walletAddress: undefined
    }));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="container mx-auto p-4">
        {/* Web3 Manager */}
        <Web3Manager
          isConnected={gameState.isConnected}
          walletAddress={gameState.walletAddress}
          onConnect={handleWalletConnect}
          onDisconnect={handleWalletDisconnect}
        />
        
        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-300 text-sm">
              Dungeon Hunt Terminal - Web3 Edition
            </div>
            <div className="text-gray-400 text-sm">
              {gameState.isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto p-4 space-y-2"
          >
            {commands.map((cmd, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">dungeon-hunt@web3:~$</span>
                  <span className="text-white">{cmd.command}</span>
                </div>
                <div className="ml-4">
                  {cmd.output}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-700">
            <div className="flex items-center p-4">
              <span className="text-blue-400 mr-2">dungeon-hunt@web3:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
                placeholder="Enter command..."
                autoFocus
              />
            </div>
          </form>
        </div>

        {/* Game Status Bar */}
        <div className="mt-4 bg-gray-900 rounded-lg border border-gray-700 p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            <div>
              <span className="text-yellow-400">Location:</span>
              <div className="text-gray-300">{gameState.location}</div>
            </div>
            <div>
              <span className="text-yellow-400">HP:</span>
              <div className="text-gray-300">{gameState.character.hp}/{gameState.character.maxHp}</div>
            </div>
            <div>
              <span className="text-yellow-400">Gold:</span>
              <div className="text-gray-300">{gameState.character.gold}</div>
            </div>
            <div>
              <span className="text-yellow-400">Level:</span>
              <div className="text-gray-300">{gameState.character.level}</div>
            </div>
            <div>
              <span className="text-yellow-400">Experience:</span>
              <div className="text-gray-300">{gameState.character.experience}</div>
            </div>
            <div>
              <span className="text-yellow-400">Items:</span>
              <div className="text-gray-300">{gameState.character.inventory.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnDTerminal;
