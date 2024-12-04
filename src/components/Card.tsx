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
      <div className="w-20 h-28 rounded-lg border-2 border-dashed border-gray-300">
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-20 h-28 bg-gradient-to-br from-purple-400 to-pink-400 
                 rounded-lg shadow-lg flex items-center justify-center 
                 text-white text-2xl font-bold cursor-pointer
                 hover:from-purple-500 hover:to-pink-500
                 transition-colors duration-200"
      onClick={() => onClick(card)}
    >
      {card.value}
    </motion.button>
  );
};

export default Card;