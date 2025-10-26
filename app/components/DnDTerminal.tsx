'use client';

import React, { useState, useRef, useEffect } from 'react';
import Web3Manager from './Web3Manager';
import { mockGameData, mockGameHelpers } from '../data/mockGameData';
import TransactionSimulator from './TransactionSimulator';

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
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  magic: number;
  gold: number;
  experience: number;
  inventory: string[];
  quests: string[];
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
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'mint' | 'trade' | 'quest_reward' | 'battle_reward'>('mint');
  const [transactionData, setTransactionData] = useState<any>({});
  
  const [gameState, setGameState] = useState<GameState>({
    character: {
      name: 'Aelindra',
      class: 'Fighter',
      level: 1,
      hp: 25,
      maxHp: 25,
      mp: 10,
      maxMp: 10,
      attack: 15,
      defense: 12,
      magic: 5,
      gold: 150,
      experience: 0,
      inventory: ['Iron Sword', 'Leather Armor', 'Health Potion'],
      quests: ['goblin_hunt']
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
              <div><span className="text-yellow-400">event</span> - Trigger a random event</div>
              <div><span className="text-yellow-400">npc</span> - Talk to NPCs</div>
              <div><span className="text-yellow-400">location</span> - Check current location</div>
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
              <div><span className="text-yellow-400">MP:</span> {gameState.character.mp}/{gameState.character.maxMp}</div>
              <div><span className="text-yellow-400">Attack:</span> {gameState.character.attack}</div>
              <div><span className="text-yellow-400">Defense:</span> {gameState.character.defense}</div>
              <div><span className="text-yellow-400">Magic:</span> {gameState.character.magic}</div>
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
        const locations = Object.keys(mockGameData.locations);
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const locationData = mockGameData.locations[randomLocation as keyof typeof mockGameData.locations];
        
        setGameState(prev => ({
          ...prev,
          location: randomLocation
        }));
        
        output = (
          <div className="text-green-400">
            🗺️ You venture into {locationData.name}...
            <div className="text-gray-300 mt-1">
              {locationData.description}
            </div>
            <div className="text-yellow-400 mt-1">
              Available activities: {locationData.events.join(', ')}
            </div>
            {locationData.enemies.length > 0 && (
              <div className="text-red-400 mt-1">
                ⚠️ Dangerous enemies: {locationData.enemies.join(', ')}
              </div>
            )}
          </div>
        );
        break;

      case 'fight':
        const enemy = mockGameHelpers.getRandomEnemy(gameState.location);
        if (!enemy) {
          output = (
            <div className="text-red-400">
              ❌ No enemies found in {gameState.location}. Try exploring a more dangerous location!
            </div>
          );
          break;
        }

        const playerDamage = Math.max(1, gameState.character.attack - enemy.defense + Math.floor(Math.random() * 5));
        const enemyDamage = Math.max(1, enemy.attack - gameState.character.defense + Math.floor(Math.random() * 3));
        
        // If wallet is connected, simulate blockchain battle reward claim
        if (gameState.isConnected) {
          setTransactionType('battle_reward');
          setTransactionData({
            item: enemy.loot.join(', '),
            amount: enemy.gold,
            gasFee: 0.001
          });
          setIsTransactionOpen(true);
        }
        
        setGameState(prev => ({
          ...prev,
          character: {
            ...prev.character,
            hp: Math.max(0, prev.character.hp - enemyDamage),
            gold: prev.character.gold + enemy.gold,
            experience: prev.character.experience + enemy.experience,
            inventory: [...prev.character.inventory, ...enemy.loot]
          }
        }));
        
        output = (
          <div className="text-red-400">
            ⚔️ Battle with {enemy.name}!
            <div className="text-gray-300 mt-1">
              You deal {playerDamage} damage and defeat the {enemy.name}!
            </div>
            <div className="text-gray-300 mt-1">
              You take {enemyDamage} damage in return.
            </div>
            <div className="text-yellow-400 mt-1">
              +{enemy.gold} gold, +{enemy.experience} experience
            </div>
            <div className="text-purple-400 mt-1">
              Loot: {enemy.loot.join(', ')}
            </div>
            {gameState.isConnected && (
              <div className="text-blue-400 mt-1">
                🔗 Battle rewards will be claimed on blockchain!
              </div>
            )}
          </div>
        );
        break;

      case 'shop':
        const shopItem = mockGameHelpers.getRandomShopItem();
        
        if (gameState.character.gold >= shopItem.price) {
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              gold: prev.character.gold - shopItem.price,
              inventory: [...prev.character.inventory, shopItem.name]
            }
          }));
          
          output = (
            <div className="text-green-400">
              🛒 You purchase {shopItem.name} for {shopItem.price} gold!
              <div className="text-gray-300 mt-1">
                {shopItem.description}
              </div>
              <div className="text-gray-300 mt-1">
                Remaining gold: {gameState.character.gold - shopItem.price}
              </div>
            </div>
          );
        } else {
          output = (
            <div className="text-red-400">
              💰 Not enough gold! You need {shopItem.price} gold to buy {shopItem.name}.
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
        const questKeys = Object.keys(mockGameData.quests);
        const randomQuestKey = questKeys[Math.floor(Math.random() * questKeys.length)];
        const quest = mockGameData.quests[randomQuestKey as keyof typeof mockGameData.quests];
        
        // If wallet is connected, simulate blockchain quest reward claim
        if (gameState.isConnected) {
          setTransactionType('quest_reward');
          setTransactionData({
            item: quest.reward.items.join(', '),
            amount: quest.reward.gold,
            gasFee: 0.002
          });
          setIsTransactionOpen(true);
        }
        
        setGameState(prev => ({
          ...prev,
          character: {
            ...prev.character,
            experience: prev.character.experience + quest.reward.experience,
            quests: [...prev.character.quests, randomQuestKey]
          }
        }));
        
        output = (
          <div className="text-purple-400">
            📜 New Quest: {quest.name}
            <div className="text-gray-300 mt-1">
              {quest.description}
            </div>
            <div className="text-yellow-400 mt-1">
              Objectives: {quest.objectives.join(', ')}
            </div>
            <div className="text-green-400 mt-1">
              Reward: {quest.reward.gold} gold, {quest.reward.experience} XP, {quest.reward.items.join(', ')}
            </div>
            {gameState.isConnected && (
              <div className="text-blue-400 mt-1">
                🔗 Quest rewards will be claimed on blockchain!
              </div>
            )}
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
          
          // Trigger transaction simulation
          setTransactionType('trade');
          setTransactionData({
            item: randomItem,
            amount: 1,
            recipient: 'Player_' + Math.random().toString(36).substr(2, 5),
            gasFee: 0.005
          });
          setIsTransactionOpen(true);
          
          output = (
            <div className="text-blue-400">
              🤝 Trading with another player...
              <div className="text-gray-300 mt-1">
                Player offers: {randomItem} for {tradePrice} gold
              </div>
              <div className="text-yellow-400 mt-1">
                Initiating blockchain transaction for secure peer-to-peer trading!
              </div>
            </div>
          );
        }
        break;

      case 'event':
        const randomEvent = mockGameHelpers.getRandomEvent();
        const randomOutcome = randomEvent.outcomes[Math.floor(Math.random() * randomEvent.outcomes.length)];
        
        let eventReward = '';
        if (randomOutcome.type === 'gold') {
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              gold: prev.character.gold + randomOutcome.value
            }
          }));
          eventReward = `+${randomOutcome.value} gold`;
        } else if (randomOutcome.type === 'experience') {
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              experience: prev.character.experience + randomOutcome.value
            }
          }));
          eventReward = `+${randomOutcome.value} experience`;
        } else if (randomOutcome.type === 'item') {
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              inventory: [...prev.character.inventory, randomOutcome.value]
            }
          }));
          eventReward = `+${randomOutcome.value}`;
        }
        
        output = (
          <div className="text-purple-400">
            🎲 Random Event: {randomEvent.name}
            <div className="text-gray-300 mt-1">
              {randomEvent.description}
            </div>
            <div className="text-yellow-400 mt-1">
              {randomOutcome.message}
            </div>
            {eventReward && (
              <div className="text-green-400 mt-1">
                Reward: {eventReward}
              </div>
            )}
          </div>
        );
        break;

      case 'npc':
        const npcKeys = Object.keys(mockGameData.npcs);
        const randomNPC = npcKeys[Math.floor(Math.random() * npcKeys.length)];
        const npc = mockGameData.npcs[randomNPC as keyof typeof mockGameData.npcs];
        const dialogue = mockGameHelpers.getRandomNPCDialogue(randomNPC);
        
        output = (
          <div className="text-blue-400">
            👤 You meet {npc.name}
            <div className="text-gray-300 mt-1">
              {npc.greeting}
            </div>
            <div className="text-yellow-400 mt-1">
              "{dialogue}"
            </div>
          </div>
        );
        break;

      case 'location':
        const currentLocation = mockGameData.locations[gameState.location as keyof typeof mockGameData.locations];
        
        output = (
          <div className="text-green-400">
            📍 Current Location: {currentLocation.name}
            <div className="text-gray-300 mt-1">
              {currentLocation.description}
            </div>
            <div className="text-yellow-400 mt-1">
              Available activities: {currentLocation.events.join(', ')}
            </div>
            {currentLocation.shop && (
              <div className="text-blue-400 mt-1">
                🛒 Shop available here
              </div>
            )}
            {currentLocation.enemies.length > 0 && (
              <div className="text-red-400 mt-1">
                ⚠️ Enemies: {currentLocation.enemies.join(', ')}
              </div>
            )}
          </div>
        );
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
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-sm">
            <div>
              <span className="text-yellow-400">Location:</span>
              <div className="text-gray-300">{gameState.location}</div>
            </div>
            <div>
              <span className="text-yellow-400">HP:</span>
              <div className="text-gray-300">{gameState.character.hp}/{gameState.character.maxHp}</div>
            </div>
            <div>
              <span className="text-yellow-400">MP:</span>
              <div className="text-gray-300">{gameState.character.mp}/{gameState.character.maxMp}</div>
            </div>
            <div>
              <span className="text-yellow-400">Attack:</span>
              <div className="text-gray-300">{gameState.character.attack}</div>
            </div>
            <div>
              <span className="text-yellow-400">Defense:</span>
              <div className="text-gray-300">{gameState.character.defense}</div>
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
              <span className="text-yellow-400">Items:</span>
              <div className="text-gray-300">{gameState.character.inventory.length}</div>
            </div>
          </div>
        </div>
        
        {/* Transaction Simulator Modal */}
        <TransactionSimulator
          isOpen={isTransactionOpen}
          onClose={() => setIsTransactionOpen(false)}
          transactionType={transactionType}
          transactionData={transactionData}
        />
      </div>
    </div>
  );
};

export default DnDTerminal;
