"use client";

import { useState } from "react";
import { GameBoard } from "@/components/game-board";
import { GameSetup } from "@/components/game-setup";
import { BotMessage } from "@/components/bot-message";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [botMessage, setBotMessage] = useState("Hello! Ready to play some Tic-Tac-Toe?");
  const [gameKey, setGameKey] = useState(0);

  const resetGame = () => {
    setGameKey(prev => prev + 1);
    setBotMessage("Let's play another round!");
    setGameStarted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Tic-Tac-Toe</h1>
          <p className="text-muted-foreground">Challenge the witty bot to a game!</p>
        </div>

        {!gameStarted ? (
          <GameSetup 
            boardSize={boardSize} 
            setBoardSize={setBoardSize}
            onStart={() => setGameStarted(true)}
          />
        ) : (
          <div className="space-y-8">
            <BotMessage message={botMessage} />
            
            <GameBoard 
              key={gameKey}
              size={boardSize} 
              onBotMessage={setBotMessage}
            />

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={resetGame}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                New Game
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}