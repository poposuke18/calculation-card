// src/utils/cardGenerator.ts
import { Card, Operator } from '../types/game';

const operators: Operator[] = ['+', '-', '×', '÷'];

export const generateCards = (usedCards: Card[] = []): Card[] => {
  const cards: Card[] = [];
  let position = 0;

  // 16個分の配列を作成
  for (let i = 0; i < 16; i++) {
    // 使用済みのカードがあればそれを使用
    const usedCard = usedCards.find(card => card.position === i);
    if (usedCard) {
      cards[i] = usedCard;
      position++;
      continue;
    }

    // 1段目: 数字+演算子 (0-3)
    if (i < 4) {
      const number = Math.floor(Math.random() * 9) + 1;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      cards[i] = {
        id: `mixed1-${i}`,
        value: `${number}${operator}`,
        type: 'mixed',
        isUsed: false,
        position: i
      };
    }
    // 2段目: 演算子+数字 (4-7)
    else if (i < 8) {
      const number = Math.floor(Math.random() * 9) + 1;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      cards[i] = {
        id: `mixed2-${i}`,
        value: `${operator}${number}`,
        type: 'mixed',
        isUsed: false,
        position: i
      };
    }
    // 3段目: 数字 (8-11)
    else if (i < 12) {
      cards[i] = {
        id: `number-${i}`,
        value: `${Math.floor(Math.random() * 10)}`,
        type: 'number',
        isUsed: false,
        position: i
      };
    }
    // 4段目: 演算子 (12-15)
    else {
      const operator = operators[i - 12];
      cards[i] = {
        id: `operator-${i}`,
        value: operator,
        type: 'operator',
        isUsed: false,
        position: i
      };
    }
    position++;
  }

  return cards;
};

export const generateTargetNumber = (): number => {
  return Math.floor(Math.random() * 60) + 1;
};