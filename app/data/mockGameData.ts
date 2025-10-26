// Mock game data for demo purposes
export const mockGameData = {
  // Predefined locations with descriptions and events
  locations: {
    'Tavern': {
      name: 'The Dragon\'s Rest Tavern',
      description: 'A cozy tavern filled with adventurers sharing tales of glory and gold.',
      events: ['rumor', 'rest', 'meet_npc'],
      shop: true,
      enemies: []
    },
    'Dark Forest': {
      name: 'The Whispering Woods',
      description: 'Ancient trees tower overhead, their branches creating an eerie canopy.',
      events: ['combat', 'treasure', 'mystery'],
      shop: false,
      enemies: ['Goblin', 'Wolf', 'Dark Sprite']
    },
    'Ancient Ruins': {
      name: 'The Lost Temple of Eldoria',
      description: 'Crumbling stone structures hint at a once-great civilization.',
      events: ['combat', 'puzzle', 'treasure'],
      shop: false,
      enemies: ['Skeleton', 'Stone Golem', 'Ancient Guardian']
    },
    'Mystic Cave': {
      name: 'The Crystal Caverns',
      description: 'Glowing crystals illuminate winding passages deep underground.',
      events: ['combat', 'magic', 'treasure'],
      shop: false,
      enemies: ['Cave Troll', 'Crystal Spider', 'Shadow Wraith']
    },
    'Dragon\'s Lair': {
      name: 'The Throne of Flames',
      description: 'A massive chamber filled with gold, gems, and the legendary Red Dragon.',
      events: ['boss_battle', 'epic_treasure', 'legendary_item'],
      shop: false,
      enemies: ['Red Dragon', 'Dragon Cultist', 'Fire Elemental']
    },
    'Mountain Peak': {
      name: 'The Summit of Eternity',
      description: 'The highest point in the realm, where the air is thin and magic flows freely.',
      events: ['combat', 'wisdom', 'divine_blessing'],
      shop: false,
      enemies: ['Ice Giant', 'Frost Wyvern', 'Storm Elemental']
    }
  },

  // Predefined enemies with stats
  enemies: {
    'Goblin': {
      name: 'Goblin Warrior',
      hp: 15,
      maxHp: 15,
      attack: 8,
      defense: 3,
      gold: 25,
      experience: 15,
      loot: ['Rusty Dagger', 'Goblin Ear']
    },
    'Wolf': {
      name: 'Dire Wolf',
      hp: 20,
      maxHp: 20,
      attack: 12,
      defense: 5,
      gold: 30,
      experience: 20,
      loot: ['Wolf Pelt', 'Sharp Fang']
    },
    'Skeleton': {
      name: 'Undead Skeleton',
      hp: 25,
      maxHp: 25,
      attack: 15,
      defense: 8,
      gold: 40,
      experience: 25,
      loot: ['Bone Fragment', 'Ancient Coin']
    },
    'Stone Golem': {
      name: 'Guardian Stone Golem',
      hp: 50,
      maxHp: 50,
      attack: 25,
      defense: 15,
      gold: 100,
      experience: 50,
      loot: ['Stone Core', 'Ancient Rune']
    },
    'Red Dragon': {
      name: 'Vermithrax the Red',
      hp: 200,
      maxHp: 200,
      attack: 50,
      defense: 30,
      gold: 1000,
      experience: 200,
      loot: ['Dragon Scale', 'Flame Heart', 'Legendary Sword']
    }
  },

  // Predefined quests
  quests: {
    'goblin_hunt': {
      name: 'Goblin Menace',
      description: 'Clear out the goblin camp threatening the village.',
      objectives: ['Defeat 3 Goblins', 'Retrieve stolen goods'],
      reward: { gold: 100, experience: 50, items: ['Iron Sword'] },
      completed: false
    },
    'dragon_slayer': {
      name: 'Dragon Slayer',
      description: 'Face the legendary Red Dragon and claim its treasure.',
      objectives: ['Reach Dragon\'s Lair', 'Defeat Vermithrax'],
      reward: { gold: 2000, experience: 500, items: ['Dragon Armor', 'Legendary Ring'] },
      completed: false
    },
    'ancient_mystery': {
      name: 'The Lost Temple',
      description: 'Investigate the mysterious ruins and uncover their secrets.',
      objectives: ['Explore Ancient Ruins', 'Solve the puzzle', 'Defeat the Guardian'],
      reward: { gold: 500, experience: 150, items: ['Ancient Tome', 'Magic Crystal'] },
      completed: false
    }
  },

  // Shop items
  shopItems: {
    'Health Potion': { price: 50, effect: 'heal', value: 20, description: 'Restores 20 HP' },
    'Mana Potion': { price: 75, effect: 'mana', value: 15, description: 'Restores 15 MP' },
    'Iron Sword': { price: 200, effect: 'weapon', value: 10, description: '+10 Attack Power' },
    'Steel Armor': { price: 300, effect: 'armor', value: 15, description: '+15 Defense' },
    'Magic Ring': { price: 500, effect: 'magic', value: 20, description: '+20 Magic Power' },
    'Elixir of Strength': { price: 150, effect: 'buff', value: 5, description: '+5 Attack (permanent)' },
    'Scroll of Fireball': { price: 100, effect: 'spell', value: 25, description: 'Deal 25 fire damage' },
    'Healing Crystal': { price: 250, effect: 'heal', value: 50, description: 'Restores 50 HP' }
  },

  // NPCs for interactions
  npcs: {
    'tavern_keeper': {
      name: 'Gareth the Innkeeper',
      greeting: 'Welcome to The Dragon\'s Rest! What can I get for you?',
      dialogue: [
        'I\'ve heard rumors of treasure in the Ancient Ruins...',
        'The Dark Forest is dangerous, but brave adventurers find great rewards.',
        'They say a dragon has been spotted near the mountain peak.'
      ]
    },
    'mystic_sage': {
      name: 'Eldara the Wise',
      greeting: 'Greetings, young adventurer. I sense great potential in you.',
      dialogue: [
        'The crystals in the Mystic Cave hold ancient power.',
        'To defeat the dragon, you must first master the elements.',
        'True strength comes not from weapons, but from wisdom.'
      ]
    },
    'blacksmith': {
      name: 'Thorin Ironforge',
      greeting: 'Need some quality gear? I forge the finest weapons in the realm!',
      dialogue: [
        'This steel armor will protect you from most attacks.',
        'The magic ring I have here is said to enhance spellcasting.',
        'For the dragon, you\'ll need something truly special...'
      ]
    }
  },

  // Random events
  events: {
    'treasure_find': {
      name: 'Hidden Treasure',
      description: 'You discover a hidden chest!',
      outcomes: [
        { type: 'gold', value: 100, message: 'You find 100 gold coins!' },
        { type: 'item', value: 'Health Potion', message: 'You find a Health Potion!' },
        { type: 'experience', value: 25, message: 'You gain 25 experience!' }
      ]
    },
    'mysterious_stranger': {
      name: 'Mysterious Stranger',
      description: 'A hooded figure approaches you...',
      outcomes: [
        { type: 'quest', value: 'ancient_mystery', message: 'The stranger offers you a quest!' },
        { type: 'item', value: 'Magic Ring', message: 'The stranger gives you a Magic Ring!' },
        { type: 'gold', value: 200, message: 'The stranger pays you 200 gold!' }
      ]
    },
    'ancient_shrine': {
      name: 'Ancient Shrine',
      description: 'You discover an ancient shrine glowing with mystical energy.',
      outcomes: [
        { type: 'blessing', value: 'strength', message: 'You receive a blessing of strength!' },
        { type: 'blessing', value: 'wisdom', message: 'You receive a blessing of wisdom!' },
        { type: 'item', value: 'Healing Crystal', message: 'The shrine grants you a Healing Crystal!' }
      ]
    }
  },

  // Character classes with starting stats
  characterClasses: {
    'Fighter': {
      name: 'Fighter',
      hp: 25,
      maxHp: 25,
      mp: 10,
      maxMp: 10,
      attack: 15,
      defense: 12,
      magic: 5,
      startingItems: ['Iron Sword', 'Leather Armor', 'Health Potion']
    },
    'Mage': {
      name: 'Mage',
      hp: 15,
      maxHp: 15,
      mp: 25,
      maxMp: 25,
      attack: 8,
      defense: 6,
      magic: 20,
      startingItems: ['Magic Staff', 'Robe', 'Mana Potion']
    },
    'Rogue': {
      name: 'Rogue',
      hp: 20,
      maxHp: 20,
      mp: 15,
      maxMp: 15,
      attack: 18,
      defense: 8,
      magic: 10,
      startingItems: ['Dagger', 'Leather Armor', 'Health Potion']
    },
    'Paladin': {
      name: 'Paladin',
      hp: 30,
      maxHp: 30,
      mp: 20,
      maxMp: 20,
      attack: 12,
      defense: 18,
      magic: 15,
      startingItems: ['Holy Sword', 'Chain Mail', 'Healing Crystal']
    }
  }
};

// Helper functions for mock game
export const mockGameHelpers = {
  // Get random enemy from location
  getRandomEnemy: (location: string) => {
    const locationData = mockGameData.locations[location as keyof typeof mockGameData.locations];
    if (!locationData || locationData.enemies.length === 0) return null;
    
    const randomEnemy = locationData.enemies[Math.floor(Math.random() * locationData.enemies.length)];
    return mockGameData.enemies[randomEnemy as keyof typeof mockGameData.enemies];
  },

  // Get random event
  getRandomEvent: () => {
    const events = Object.keys(mockGameData.events);
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    return mockGameData.events[randomEvent as keyof typeof mockGameData.events];
  },

  // Get random shop item
  getRandomShopItem: () => {
    const items = Object.keys(mockGameData.shopItems);
    const randomItem = items[Math.floor(Math.random() * items.length)];
    return {
      name: randomItem,
      ...mockGameData.shopItems[randomItem as keyof typeof mockGameData.shopItems]
    };
  },

  // Calculate experience needed for next level
  getExpForLevel: (level: number) => {
    return level * 100;
  },

  // Get random NPC dialogue
  getRandomNPCDialogue: (npcKey: string) => {
    const npc = mockGameData.npcs[npcKey as keyof typeof mockGameData.npcs];
    if (!npc) return 'Hello there!';
    
    const randomDialogue = npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
    return randomDialogue;
  }
};
