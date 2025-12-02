"use client";

import { useState, useEffect } from "react";

type Card = {
  id: number;
  emoji: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const CARD_SETS = [
  // Level 1: 3 pairs (6 cards)
  [
    { emoji: "⚽", label: "football" },
    { emoji: "🏀", label: "basketball" },
    { emoji: "🎾", label: "tennis ball" },
  ],
  // Level 2: 4 pairs (8 cards)
  [
    { emoji: "⚽", label: "football" },
    { emoji: "🏀", label: "basketball" },
    { emoji: "🎾", label: "tennis ball" },
    { emoji: "🏐", label: "volleyball" },
  ],
  // Level 3: 6 pairs (12 cards)
  [
    { emoji: "⚽", label: "football" },
    { emoji: "🏀", label: "basketball" },
    { emoji: "🎾", label: "tennis ball" },
    { emoji: "🏐", label: "volleyball" },
    { emoji: "⚾", label: "baseball" },
    { emoji: "🥎", label: "softball" },
  ],
];

export function MemoryCardGame() {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const currentSet = CARD_SETS[level];
  const totalPairs = currentSet.length;

  useEffect(() => {
    initializeGame();
  }, [level]);

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = currentSet.flatMap((item, index) => [
      { ...item, id: index * 2, isFlipped: false, isMatched: false },
      { ...item, id: index * 2 + 1, isFlipped: false, isMatched: false },
    ]);

    // Shuffle cards (Fisher-Yates)
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setCompleted(false);
    setCanFlip(true);
  };

  const handleCardClick = (cardId: number) => {
    if (!canFlip) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Flip the card
    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      setMoves(moves + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === firstId);
      const secondCard = newCards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          const matchedCards = newCards.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
          setCanFlip(true);

          // Check if all pairs are matched
          if (matches + 1 === totalPairs) {
            setTimeout(() => {
              if (level < CARD_SETS.length - 1) {
                // Move to next level
                setLevel(level + 1);
              } else {
                // Game complete
                setCompleted(true);
              }
            }, 1000);
          }
        }, 800);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          const resetCards = newCards.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1200);
      }
    }
  };

  const handleReset = () => {
    setLevel(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="game-container">
        <div className="game-complete">
          <div className="game-complete__icon">🎉</div>
          <h3 className="game-complete__title">Fantastic Memory!</h3>
          <p className="game-complete__message">
            You matched all the cards and completed all levels!
          </p>
          <button className="btn btn--primary" onClick={handleReset}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-progress">
          Level {level + 1} of {CARD_SETS.length}
        </div>
        <div className="game-stats">
          <span>Moves: {moves}</span>
          <span>Matched: {matches}/{totalPairs}</span>
        </div>
      </div>

      <div className="memory-game">
        <div className="game-instruction">
          <h3>Find the Matching Pairs</h3>
          <p>Click cards to flip them over and find matches</p>
        </div>

        <div
          className={`memory-grid memory-grid--${cards.length <= 6 ? 'small' : cards.length <= 8 ? 'medium' : 'large'}`}
          role="group"
          aria-label="Memory card grid"
        >
          {cards.map((card) => (
            <button
              key={card.id}
              className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
                card.isMatched ? 'matched' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
              disabled={!canFlip || card.isFlipped || card.isMatched}
              aria-label={
                card.isFlipped || card.isMatched
                  ? card.label
                  : "Hidden card - click to reveal"
              }
            >
              <div className="memory-card__inner">
                <div className="memory-card__front">
                  <span className="memory-card__question">?</span>
                </div>
                <div className="memory-card__back">
                  <span className="memory-card__emoji">{card.emoji}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {matches > 0 && (
          <div className="feedback-message feedback-message--success" role="status">
            Great job! {matches} {matches === 1 ? 'pair' : 'pairs'} matched! 🎯
          </div>
        )}
      </div>
    </div>
  );
}
