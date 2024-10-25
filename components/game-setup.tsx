"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GameSetupProps {
  boardSize: number;
  setBoardSize: (size: number) => void;
  onStart: () => void;
}

export function GameSetup({ boardSize, setBoardSize, onStart }: GameSetupProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Board Size: {boardSize}x{boardSize}</label>
          <Slider
            value={[boardSize]}
            onValueChange={(value) => setBoardSize(value[0])}
            min={3}
            max={6}
            step={1}
            className="w-full"
          />
        </div>
        <Button onClick={onStart} className="w-full">
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
}