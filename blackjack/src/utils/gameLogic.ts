import deck, { Card } from './cards';

export const getCardValue = (card: Card): number => {
  if (card.value === 'A') return 11;
  if (['K', 'Q', 'J'].includes(card.value)) return 10;
  return parseInt(card.value);
};

export const calculateHandValue = (cards: Card[]): number => {
  let value = 0;
  let aces = 0;

  cards.forEach(card => {
    if (card.value === 'A') {
      aces += 1;
    } else {
      value += getCardValue(card);
    }
  });

  // Add aces
  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  return value;
};

export const getRandomCard = (currentCards: Card[]): Card => {
  const availableCards = deck.filter(deckCard => 
    !currentCards.some(playedCard => 
      playedCard.value === deckCard.value && playedCard.suit === deckCard.suit
    )
  );
  
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
};

export const determineWinner = (playerValue: number, dealerValue: number): string => {
  if (playerValue > 21) return 'dealer';
  if (dealerValue > 21) return 'player';
  if (playerValue > dealerValue) return 'player';
  if (dealerValue > playerValue) return 'dealer';
  return 'tie';
};
