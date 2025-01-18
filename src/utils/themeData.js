export const colorSchemes = {
  luxury: [
    { name: 'Gold & Black', primary: '#FFD700', secondary: '#000000', accent: '#FFFFFF' },
    { name: 'Silver & Navy', primary: '#C0C0C0', secondary: '#000080', accent: '#FFFFFF' },
    { name: 'Rose Gold & Cream', primary: '#B76E79', secondary: '#FFFDD0', accent: '#7C4B51' },
  ],
  rustic: [
    { name: 'Earth & Wood', primary: '#8B4513', secondary: '#DEB887', accent: '#556B2F' },
    { name: 'Sage & Cream', primary: '#9DC183', secondary: '#FFFDD0', accent: '#5F7355' },
    { name: 'Burgundy & Navy', primary: '#800020', secondary: '#000080', accent: '#B8860B' },
  ],
  modern: [
    { name: 'Minimalist Grey', primary: '#808080', secondary: '#FFFFFF', accent: '#000000' },
    { name: 'Blush & Grey', primary: '#FFB6C1', secondary: '#808080', accent: '#FFFFFF' },
    { name: 'Navy & White', primary: '#000080', secondary: '#FFFFFF', accent: '#C0C0C0' },
  ],
  tropical: [
    { name: 'Coral & Teal', primary: '#FF7F50', secondary: '#008080', accent: '#FFFFFF' },
    { name: 'Palm & Sand', primary: '#2F4F4F', secondary: '#F5DEB3', accent: '#98FF98' },
    { name: 'Ocean Blue', primary: '#0000FF', secondary: '#00FFFF', accent: '#FFFFFF' },
  ],
};

export const decorStyles = {
  luxury: [
    'Crystal chandeliers',
    'Gold-rimmed tableware',
    'Silk drapery',
    'Mirror accents',
    'Metallic centerpieces',
  ],
  rustic: [
    'Mason jar arrangements',
    'Wooden crates',
    'Burlap runners',
    'Wildflower bouquets',
    'Lantern centerpieces',
  ],
  modern: [
    'Geometric shapes',
    'Clean lines',
    'Minimalist centerpieces',
    'LED lighting',
    'Acrylic displays',
  ],
  tropical: [
    'Palm leaves',
    'Bamboo elements',
    'Shell decorations',
    'Tropical flowers',
    'Tiki torches',
  ],
};

export const themeDescriptions = {
  luxury: 'Elegant and sophisticated, featuring premium materials and refined details.',
  rustic: 'Warm and natural, incorporating organic elements and vintage touches.',
  modern: 'Clean and contemporary, focusing on simplicity and geometric patterns.',
  tropical: 'Vibrant and exotic, bringing paradise to your event.',
};

export const generateThemeSuggestion = (input) => {
  const keywords = {
    luxury: ['luxury', 'elegant', 'sophisticated', 'high-end', 'premium', 'formal'],
    rustic: ['rustic', 'natural', 'countryside', 'barn', 'vintage', 'organic'],
    modern: ['modern', 'contemporary', 'minimalist', 'clean', 'simple', 'geometric'],
    tropical: ['tropical', 'beach', 'paradise', 'exotic', 'island', 'summer'],
  };

  const lowercaseInput = input.toLowerCase();
  let matchedTheme = null;
  let highestMatchCount = 0;

  Object.entries(keywords).forEach(([theme, themeKeywords]) => {
    const matchCount = themeKeywords.filter(keyword => 
      lowercaseInput.includes(keyword)
    ).length;

    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      matchedTheme = theme;
    }
  });

  if (!matchedTheme) {
    return {
      message: "I need more information about your preferences. Could you tell me more about the style or atmosphere you're looking for?",
      suggestions: null
    };
  }

  return {
    message: `Based on your preferences, I suggest a ${matchedTheme} theme. ${themeDescriptions[matchedTheme]}`,
    suggestions: {
      theme: matchedTheme,
      colors: colorSchemes[matchedTheme],
      decorations: decorStyles[matchedTheme],
    }
  };
};

export const generateFollowUpQuestion = (theme) => {
  const questions = {
    luxury: [
      "Would you prefer gold or silver as your primary metallic accent?",
      "Are you interested in incorporating crystal elements?",
      "What type of lighting would you prefer - chandeliers or modern fixtures?",
    ],
    rustic: [
      "Would you like to incorporate natural wood elements?",
      "Are you interested in vintage-inspired decorations?",
      "What type of flowers would you prefer - wildflowers or traditional arrangements?",
    ],
    modern: [
      "Are you interested in incorporating geometric patterns?",
      "Would you prefer warm or cool color tones?",
      "What type of lighting concept appeals to you - subtle or dramatic?",
    ],
    tropical: [
      "Would you like to focus on specific tropical flowers?",
      "Are you interested in incorporating water elements?",
      "What type of lighting would you prefer - natural or colorful?",
    ],
  };

  if (!theme || !questions[theme]) {
    return "What specific elements or colors are you drawn to?";
  }

  return questions[theme][Math.floor(Math.random() * questions[theme].length)];
};