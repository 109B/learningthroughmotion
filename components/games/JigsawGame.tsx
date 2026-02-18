"use client";

import { useState, useEffect, useCallback } from "react";

type Piece = {
  id: number;
  content: string;
  color: string;
  correctPosition: number;
  currentPosition: number | null;
};

const PUZZLES = [
  // Level 1: 4 pieces
  {
    size: 2,
    pieces: [
      { content: "⚽", color: "#4CAF50" },
      { content: "🏀", color: "#2196F3" },
      { content: "🎾", color: "#FF9800" },
      { content: "🏐", color: "#E91E63" },
    ],
  },
  // Level 2: 6 pieces
  {
    size: 3,
    pieces: [
      { content: "⚽", color: "#4CAF50" },
      { content: "🏀", color: "#2196F3" },
      { content: "🎾", color: "#FF9800" },
      { content: "🏐", color: "#E91E63" },
      { content: "⚾", color: "#9C27B0" },
      { content: "🥎", color: "#FF5722" },
    ],
  },
  // Level 3: 9 pieces
  {
    size: 3,
    pieces: [
      { content: "⚽", color: "#4CAF50" },
      { content: "🏀", color: "#2196F3" },
      { content: "🎾", color: "#FF9800" },
      { content: "🏐", color: "#E91E63" },
      { content: "⚾", color: "#9C27B0" },
      { content: "🥎", color: "#FF5722" },
      { content: "🏈", color: "#795548" },
      { content: "⛳", color: "#009688" },
      { content: "🎳", color: "#673AB7" },
    ],
  },
];

export function JigsawGame() {
  const [level, setLevel] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentPuzzle = PUZZLES[level];

  const initializeGame = useCallback(() => {
    // Create shuffled pieces
    const newPieces: Piece[] = currentPuzzle.pieces.map((piece, index) => ({
      id: index,
      content: piece.content,
      color: piece.color,
      correctPosition: index,
      currentPosition: null,
    }));

    // Shuffle
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    }

    setPieces(newPieces);
    setSelectedPiece(null);
    setCompleted(false);
  }, [currentPuzzle]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handlePieceClick = (pieceId: number) => {
    if (selectedPiece === null) {
      // Select this piece
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      // Deselect
      setSelectedPiece(null);
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    if (selectedPiece === null) return;

    // Check if slot is already occupied
    const occupiedPiece = pieces.find((p) => p.currentPosition === slotIndex);
    if (occupiedPiece) return;

    // Place the selected piece in this slot
    const newPieces = pieces.map((p) =>
      p.id === selectedPiece ? { ...p, currentPosition: slotIndex } : p
    );

    setPieces(newPieces);
    setSelectedPiece(null);

    // Check if puzzle is complete
    const allPlaced = newPieces.every((p) => p.currentPosition !== null);
    const allCorrect = newPieces.every(
      (p) => p.currentPosition === p.correctPosition
    );

    if (allPlaced && allCorrect) {
      setTimeout(() => {
        if (level < PUZZLES.length - 1) {
          setLevel(level + 1);
        } else {
          setCompleted(true);
        }
      }, 1500);
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
          <h3 className="game-complete__title">Puzzle Master!</h3>
          <p className="game-complete__message">
            You completed all the puzzles perfectly!
          </p>
          <button className="btn btn--primary" onClick={handleReset}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const availablePieces = pieces.filter((p) => p.currentPosition === null);
  const placedCount = pieces.filter((p) => p.currentPosition !== null).length;

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-progress">
          Level {level + 1} of {PUZZLES.length}
        </div>
        <div className="game-score">
          Placed: {placedCount}/{pieces.length}
        </div>
      </div>

      <div className="jigsaw-game">
        <div className="game-instruction">
          <h3>Complete the Puzzle</h3>
          <p>Click a piece below, then click where it belongs</p>
        </div>

        <div className="jigsaw-container">
          {/* Puzzle Board */}
          <div
            className="jigsaw-board"
            style={{
              gridTemplateColumns: `repeat(${currentPuzzle.size}, 1fr)`,
            }}
          >
            {Array.from({ length: pieces.length }).map((_, index) => {
              const placedPiece = pieces.find(
                (p) => p.currentPosition === index
              );
              const isCorrect = placedPiece?.correctPosition === index;

              return (
                <button
                  key={index}
                  className={`jigsaw-slot ${placedPiece ? "filled" : "empty"} ${
                    isCorrect ? "correct" : ""
                  }`}
                  onClick={() => handleSlotClick(index)}
                  disabled={!!placedPiece}
                  aria-label={
                    placedPiece
                      ? `Slot ${index + 1} filled with ${placedPiece.content}`
                      : `Empty slot ${index + 1}`
                  }
                >
                  {placedPiece && (
                    <span
                      className="jigsaw-piece-content"
                      style={{ background: placedPiece.color }}
                    >
                      {placedPiece.content}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Available Pieces */}
          <div className="jigsaw-pieces">
            <h4>Available Pieces:</h4>
            <div className="jigsaw-pieces-grid">
              {availablePieces.map((piece) => (
                <button
                  key={piece.id}
                  className={`jigsaw-piece ${
                    selectedPiece === piece.id ? "selected" : ""
                  }`}
                  onClick={() => handlePieceClick(piece.id)}
                  style={{ background: piece.color }}
                  aria-label={`Puzzle piece ${piece.content}`}
                >
                  {piece.content}
                </button>
              ))}
            </div>
            {selectedPiece !== null && (
              <p className="jigsaw-hint" role="status">
                Click an empty slot to place this piece
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
