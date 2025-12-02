"use client";

import { useState, useEffect } from "react";

type Cell = {
  letter: string;
  row: number;
  col: number;
  isPartOfWord?: string;
  isFound?: boolean;
  isSelected?: boolean;
};

type WordData = {
  word: string;
  label: string;
  found: boolean;
};

const WORD_LISTS = [
  // Level 1: Short words, horizontal only
  [
    { word: "BALL", label: "Ball" },
    { word: "RUN", label: "Run" },
    { word: "JUMP", label: "Jump" },
    { word: "PLAY", label: "Play" },
  ],
  // Level 2: Medium words
  [
    { word: "SPORT", label: "Sport" },
    { word: "CATCH", label: "Catch" },
    { word: "THROW", label: "Throw" },
    { word: "KICK", label: "Kick" },
    { word: "TEAM", label: "Team" },
  ],
  // Level 3: Longer words
  [
    { word: "FOOTBALL", label: "Football" },
    { word: "BALANCE", label: "Balance" },
    { word: "MOVEMENT", label: "Movement" },
    { word: "COUNTING", label: "Counting" },
    { word: "SENSORY", label: "Sensory" },
  ],
];

const GRID_SIZE = 10;

export function WordSearchGame() {
  const [level, setLevel] = useState(0);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [words, setWords] = useState<WordData[]>([]);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [completed, setCompleted] = useState(false);

  const currentWordList = WORD_LISTS[level];

  useEffect(() => {
    initializeGame();
  }, [level]);

  const initializeGame = () => {
    const newGrid: Cell[][] = [];

    // Initialize empty grid
    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        newGrid[row][col] = { letter: "", row, col };
      }
    }

    // Place words in grid
    const placedWords: WordData[] = [];
    currentWordList.forEach((wordData) => {
      if (placeWord(newGrid, wordData.word)) {
        placedWords.push({ ...wordData, found: false });
      }
    });

    // Fill empty cells with random letters
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].letter) {
          newGrid[row][col].letter = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }

    setGrid(newGrid);
    setWords(placedWords);
    setSelectedCells([]);
    setCompleted(false);
  };

  const placeWord = (grid: Cell[][], word: string): boolean => {
    const directions = [
      { row: 0, col: 1 }, // Horizontal
      { row: 1, col: 0 }, // Vertical
    ];

    // Shuffle directions for variety
    const shuffled = directions.sort(() => Math.random() - 0.5);

    for (const dir of shuffled) {
      for (let attempt = 0; attempt < 50; attempt++) {
        const startRow = Math.floor(Math.random() * GRID_SIZE);
        const startCol = Math.floor(Math.random() * GRID_SIZE);

        const endRow = startRow + dir.row * (word.length - 1);
        const endCol = startCol + dir.col * (word.length - 1);

        if (endRow >= GRID_SIZE || endCol >= GRID_SIZE) continue;

        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const row = startRow + dir.row * i;
          const col = startCol + dir.col * i;
          if (grid[row][col].letter && grid[row][col].letter !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const row = startRow + dir.row * i;
            const col = startCol + dir.col * i;
            grid[row][col].letter = word[i];
            grid[row][col].isPartOfWord = word;
          }
          return true;
        }
      }
    }
    return false;
  };

  const handleCellClick = (cell: Cell) => {
    if (cell.isFound) return;

    if (selectedCells.length === 0) {
      // First cell selection
      setSelectedCells([cell]);
      markCellsSelected([cell]);
    } else if (selectedCells.length === 1) {
      // Second cell - check if it forms a valid line
      const newSelected = [...selectedCells, cell];
      const cells = getCellsBetween(selectedCells[0], cell);

      if (cells.length > 0) {
        checkForWord(cells);
      }

      setSelectedCells([]);
      clearSelection();
    }
  };

  const getCellsBetween = (start: Cell, end: Cell): Cell[] => {
    const cells: Cell[] = [];

    // Check if horizontal
    if (start.row === end.row) {
      const minCol = Math.min(start.col, end.col);
      const maxCol = Math.max(start.col, end.col);
      for (let col = minCol; col <= maxCol; col++) {
        cells.push(grid[start.row][col]);
      }
    }
    // Check if vertical
    else if (start.col === end.col) {
      const minRow = Math.min(start.row, end.row);
      const maxRow = Math.max(start.row, end.row);
      for (let row = minRow; row <= maxRow; row++) {
        cells.push(grid[row][start.col]);
      }
    }

    return cells;
  };

  const checkForWord = (cells: Cell[]) => {
    const selectedWord = cells.map((c) => c.letter).join("");
    const reversedWord = selectedWord.split("").reverse().join("");

    const foundWord = words.find(
      (w) => !w.found && (w.word === selectedWord || w.word === reversedWord)
    );

    if (foundWord) {
      // Mark cells as found
      const newGrid = grid.map((row) =>
        row.map((cell) => {
          if (cells.some((c) => c.row === cell.row && c.col === cell.col)) {
            return { ...cell, isFound: true };
          }
          return cell;
        })
      );
      setGrid(newGrid);

      // Mark word as found
      const newWords = words.map((w) =>
        w.word === foundWord.word ? { ...w, found: true } : w
      );
      setWords(newWords);

      // Check if all words found
      if (newWords.every((w) => w.found)) {
        setTimeout(() => {
          if (level < WORD_LISTS.length - 1) {
            setLevel(level + 1);
          } else {
            setCompleted(true);
          }
        }, 1500);
      }
    }
  };

  const markCellsSelected = (cells: Cell[]) => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isSelected: cells.some((c) => c.row === cell.row && c.col === cell.col),
      }))
    );
    setGrid(newGrid);
  };

  const clearSelection = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, isSelected: false }))
    );
    setGrid(newGrid);
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
          <h3 className="game-complete__title">Word Search Master!</h3>
          <p className="game-complete__message">
            You found all the words in every level!
          </p>
          <button className="btn btn--primary" onClick={handleReset}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const foundCount = words.filter((w) => w.found).length;

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-progress">
          Level {level + 1} of {WORD_LISTS.length}
        </div>
        <div className="game-score">
          Found: {foundCount}/{words.length}
        </div>
      </div>

      <div className="word-search-game">
        <div className="game-instruction">
          <h3>Find the Hidden Words</h3>
          <p>Click the first letter, then click the last letter</p>
        </div>

        <div className="word-search-container">
          <div className="word-search-grid" role="grid" aria-label="Word search puzzle">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="word-search-row" role="row">
                {row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`word-search-cell ${
                      cell.isFound ? "found" : ""
                    } ${cell.isSelected ? "selected" : ""}`}
                    onClick={() => handleCellClick(cell)}
                    aria-label={`Letter ${cell.letter}`}
                    role="gridcell"
                  >
                    {cell.letter}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="word-list" aria-label="Words to find">
            <h4>Find these words:</h4>
            <ul>
              {words.map((word, index) => (
                <li
                  key={index}
                  className={`word-list-item ${word.found ? "found" : ""}`}
                >
                  {word.found && <span className="checkmark">✓</span>}
                  {word.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
