// src/components/ScoreBoard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  currentScore: number;
  totalScore: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  currentScore, 
  totalScore, 
  highScore 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="text-center p-3 bg-purple-100 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-sm font-semibold text-purple-600">Current</h3>
          <motion.p
            key={currentScore}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-purple-800"
          >
            {currentScore}
          </motion.p>
        </motion.div>

        <motion.div
          className="text-center p-3 bg-blue-100 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-sm font-semibold text-blue-600">Total</h3>
          <motion.p
            key={totalScore}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-blue-800"
          >
            {totalScore}
          </motion.p>
        </motion.div>

        <motion.div
          className="text-center p-3 bg-green-100 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-sm font-semibold text-green-600">High Score</h3>
          <motion.p
            key={highScore}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-green-800"
          >
            {highScore}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScoreBoard;