"use client";

import { useState } from "react";

type Level = {
  id: number;
  emoji: string;
  label: string;
  count: number;
};

const LEVELS: Level[] = [
  { id: 1, emoji: "⚽", label: "footballs", count: 3 },
  { id: 2, emoji: "🏀", label: "basketballs", count: 5 },
  { id: 3, emoji: "🎾", label: "tennis balls", count: 7 },
  { id: 4, emoji: "🥎", label: "softballs", count: 4 },
  { id: 5, emoji: "⛳", label: "golf flags", count: 6 },
];

export function NumberMatchGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const level = LEVELS[currentLevel];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);

    if (num === level.count) {
      setIsCorrect(true);
      setScore(score + 1);

      // Move to next level after a short delay
      setTimeout(() => {
        if (currentLevel < LEVELS.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setSelectedNumber(null);
          setIsCorrect(null);
        } else {
          setCompleted(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);

      // Reset after showing feedback
      setTimeout(() => {
        setSelectedNumber(null);
        setIsCorrect(null);
      }, 1500);
    }
  };

  const handleReset = () => {
    setCurrentLevel(0);
    setSelectedNumber(null);
    setIsCorrect(null);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="game-container">
        <div className="game-complete">
          <div className="game-complete__icon">🎉</div>
          <h3 className="game-complete__title">Well Done!</h3>
          <p className="game-complete__message">
            You matched all the numbers correctly!
          </p>
          <p className="game-complete__score">
            Final Score: <strong>{score}</strong> out of {LEVELS.length}
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
          Level {currentLevel + 1} of {LEVELS.length}
        </div>
        <div className="game-score">Score: {score}</div>
      </div>

      <div className="number-match-game">
        <div className="game-instruction">
          <h3>Count the {level.label}</h3>
          <p>Click the correct number below</p>
        </div>

        <div
          className="items-display"
          role="img"
          aria-label={`${level.count} ${level.label}`}
        >
          {Array.from({ length: level.count }).map((_, index) => (
            <span key={index} className="item-emoji" aria-hidden="true">
              {level.emoji}
            </span>
          ))}
        </div>

        <div className="numbers-grid" role="radiogroup" aria-label="Select a number">
          {numbers.map((num) => {
            const isSelected = selectedNumber === num;
            const showFeedback = isSelected && isCorrect !== null;

            return (
              <button
                key={num}
                className={`number-button ${isSelected ? "selected" : ""} ${
                  showFeedback
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => handleNumberSelect(num)}
                disabled={selectedNumber !== null}
                aria-label={`Number ${num}`}
                role="radio"
                aria-checked={isSelected}
              >
                {num}
                {showFeedback && (
                  <span className="feedback-icon" aria-hidden="true">
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {isCorrect === true && (
          <div className="feedback-message feedback-message--success" role="alert">
            Correct! Well done! 🎉
          </div>
        )}

        {isCorrect === false && (
          <div className="feedback-message feedback-message--error" role="alert">
            Try again! Count carefully.
          </div>
        )}
      </div>
    </div>
  );
}
