// src/components/Card.tsx
import { motion } from 'framer-motion';
import type { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  if (card.isUsed) {
    return (
      <div className="w-20 h-28 rounded-lg border-2 border-dashed border-indigo-200">
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-20 h-28 bg-gradient-to-br from-indigo-500 to-purple-500 
                 rounded-lg shadow-lg flex items-center justify-center 
                 text-white text-2xl font-bold cursor-pointer
                 hover:from-indigo-600 hover:to-purple-600
                 transition-colors duration-200"
      onClick={() => onClick(card)}
    >
      {card.value}
    </motion.button>
  );
};

export default Card;