export function checkWinner(board: string[], size: number) {
  // Check rows
  for (let i = 0; i < size; i++) {
    const row = Array(size).fill(0).map((_, j) => i * size + j);
    if (row.every(idx => board[idx] === "X")) return { winner: "X", line: row };
    if (row.every(idx => board[idx] === "O")) return { winner: "O", line: row };
  }

  // Check columns
  for (let i = 0; i < size; i++) {
    const col = Array(size).fill(0).map((_, j) => i + j * size);
    if (col.every(idx => board[idx] === "X")) return { winner: "X", line: col };
    if (col.every(idx => board[idx] === "O")) return { winner: "O", line: col };
  }

  // Check diagonals
  const diag1 = Array(size).fill(0).map((_, i) => i * (size + 1));
  const diag2 = Array(size).fill(0).map((_, i) => (i + 1) * (size - 1));

  if (diag1.every(idx => board[idx] === "X")) return { winner: "X", line: diag1 };
  if (diag1.every(idx => board[idx] === "O")) return { winner: "O", line: diag1 };
  if (diag2.every(idx => board[idx] === "X")) return { winner: "X", line: diag2 };
  if (diag2.every(idx => board[idx] === "O")) return { winner: "O", line: diag2 };

  return null;
}

export function getBotMove(board: string[], size: number): number {
  // Try to win
  const winMove = findWinningMove(board, "O", size);
  if (winMove !== -1) return winMove;

  // Block player from winning
  const blockMove = findWinningMove(board, "X", size);
  if (blockMove !== -1) return blockMove;

  // Take center if available
  const center = Math.floor(board.length / 2);
  if (!board[center]) return center;

  // Take corners
  const corners = [0, size - 1, board.length - size, board.length - 1];
  const availableCorners = corners.filter(i => !board[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available spot
  const availableSpots = board.map((cell, i) => !cell ? i : -1).filter(i => i !== -1);
  return availableSpots[Math.floor(Math.random() * availableSpots.length)];
}

function findWinningMove(board: string[], player: string, size: number): number {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = player;
      if (checkWinner(testBoard, size)) return i;
    }
  }
  return -1;
}

export function getBotMessage(board: string[]): string {
  const messages = [
    "Interesting move! Let me think...",
    "I see what you did there!",
    "Nice strategy, but watch this...",
    "Hmm, you're making this challenging!",
    "I'm enjoying our game!",
    "That's a clever move!",
    "Let's see how you handle this...",
    "You're pretty good at this!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}