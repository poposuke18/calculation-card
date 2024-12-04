// src/utils/gameLogic.ts
import { Card } from '../types/game';

export const calculateResult = (cards: Card[]): number | null => {
  try {
    // カードの値から数式を作成
    const expression = cards
      .map(card => card.value)
      .join('');

    // 数式の最後が演算子の場合はnullを返す
    const lastChar = expression[expression.length - 1];
    if (['+', '-', '×', '÷'].includes(lastChar)) {
      return null;
    }

    // ×と÷を*と/に置換
    const normalizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');

    // evalを使用して計算（通常はevalの使用は避けるべきですが、
    // この場合は制御された入力のみを扱うため安全です）
    const result = eval(normalizedExpression);

    // 整数でない場合はnullを返す
    if (!Number.isInteger(result)) {
      return null;
    }

    return result;
  } catch (error) {
    return null;
  }
};

export const calculateScore = (usedCards: number, timeLeft: number): number => {
  // スコア = 使用したカード数 × 残り時間
  return usedCards * timeLeft;
};

export const isValidExpression = (cards: Card[]): boolean => {
  if (cards.length === 0) return false;

  let hasOperator = false;
  let lastWasOperator = false;

  for (let i = 0; i < cards.length; i++) {
    const isOperator = ['+', '-', '×', '÷'].includes(cards[i].value);

    // 連続して演算子が来ないようにチェック
    if (isOperator && lastWasOperator) {
      return false;
    }

    // 演算子の存在をチェック
    if (isOperator) {
      hasOperator = true;
    }

    lastWasOperator = isOperator;
  }

  // 最後が演算子でないことと、式に少なくとも1つの演算子が含まれることをチェック
  return !lastWasOperator && hasOperator;
};