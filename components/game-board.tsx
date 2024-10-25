'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { checkWinner, getBotMove, getBotMessage } from '@/lib/game-logic';

interface GameBoardProps {
  size: number;
  onBotMessage: (message: string) => void;
}

export function GameBoard({ size, onBotMessage }: GameBoardProps) {
  const [board, setBoard] = useState<string[]>(Array(size * size).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [winLine, setWinLine] = useState<number[] | null>(null);

  const handleMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard, size);
    if (result) {
      setWinner(result.winner);
      setWinLine(result.line);
      onBotMessage(
        result.winner === 'X'
          ? 'You won! Well played!'
          : 'I win! Better luck next time!'
      );
      return;
    }

    if (newBoard.every((cell) => cell)) {
      setWinner('draw');
      onBotMessage("It's a draw! Want to try again?");
      return;
    }

    setCurrentPlayer('O');
  };

  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      const timer = setTimeout(() => {
        const botMove = getBotMove(board, size);
        if (botMove !== -1) {
          const newBoard = [...board];
          newBoard[botMove] = 'O';
          setBoard(newBoard);

          const result = checkWinner(newBoard, size);
          if (result) {
            setWinner(result.winner);
            setWinLine(result.line);
            onBotMessage('Checkmate! I win this round!');
          } else if (newBoard.every((cell) => cell)) {
            setWinner('draw');
            onBotMessage("It's a draw! You're a worthy opponent!");
          } else {
            onBotMessage(getBotMessage(newBoard));
            setCurrentPlayer('X');
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, winner, size, onBotMessage]);

  const calculateLineCoordinates = (line: number[], size: number) => {
    const cellSize = 100 / size; // Sesuaikan ukuran cell berdasarkan ukuran board

    const startCell = line[0];
    const endCell = line[line.length - 1];

    const startRow = Math.floor(startCell / size);
    const startCol = startCell % size;
    const endRow = Math.floor(endCell / size);
    const endCol = endCell % size;

    // Koordinat di ruang viewBox SVG (0-100)
    const x1 = startCol * cellSize + cellSize / 2;
    const y1 = startRow * cellSize + cellSize / 2;
    const x2 = endCol * cellSize + cellSize / 2;
    const y2 = endRow * cellSize + cellSize / 2;

    return { x1, y1, x2, y2 };
  };

  console.log({ winLine });

  return (
    <div className="relative max-w-2xl mx-auto">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((cell, index) => (
          <Card
            key={index}
            className={cn(
              'aspect-square flex items-center justify-center text-3xl font-bold cursor-pointer hover:bg-accent transition-colors',
              cell && 'cursor-not-allowed'
            )}
            onClick={() => currentPlayer === 'X' && handleMove(index)}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: cell ? 1 : 0 }}
              className={cn(
                'transition-all duration-200',
                cell === 'X' ? 'text-blue-500' : 'text-red-500'
              )}
            >
              {cell}
            </motion.span>
          </Card>
        ))}
      </div>

      {winLine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  stopColor={winner === 'X' ? '#60A5FA' : '#F87171'}
                  stopOpacity="0.5"
                />
                <stop
                  offset="50%"
                  stopColor={winner === 'X' ? '#3B82F6' : '#EF4444'}
                />
                <stop
                  offset="100%"
                  stopColor={winner === 'X' ? '#60A5FA' : '#F87171'}
                  stopOpacity="0.5"
                />
              </linearGradient>
            </defs>
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              {...calculateLineCoordinates(winLine, size)}
              stroke="url(#lineGradient)"
              strokeWidth={5}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.2))',
              }}
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
