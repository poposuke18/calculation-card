// src/components/Timer.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  // タイマーの残り時間に応じて色を変更
  const getColor = () => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
      <motion.div
        className={`h-full ${getColor()} transition-colors duration-300`}
        initial={{ width: '100%' }}
        animate={{ width: `${(timeLeft / totalTime) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
        {timeLeft}s
      </div>
    </div>
  );
};

export default Timer;