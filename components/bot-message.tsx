'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Bot } from 'lucide-react';

interface BotMessageProps {
  message: string;
}

export function BotMessage({ message }: BotMessageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-4 flex items-center gap-3">
          <Bot className="w-6 h-6 text-primary mt-1" />
          <p className="text-sm leading-relaxed">{message}</p>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
