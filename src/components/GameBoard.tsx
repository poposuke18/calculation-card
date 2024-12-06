// src/components/GameBoard.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CardComponent from './Card';
import type { Card, GameState, CardType } from '../types/game';
import { generateCards, generateTargetNumber } from '../utils/cardGenerator';

const initialState: GameState = {
    targetNumber: 0,
    cards: [],
    selectedCards: [],
    timeLeft: 55,
    score: 0,
    totalScore: 0,
    shufflesLeft: 3,
    gameOver: false,
    calculationResult: null,
    message: '',
    solvedProblems: 0,
    isCalculating: false
};

const GameBoard = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [usedPositions, setUsedPositions] = useState<Set<number>>(new Set());

  // ゲームの初期化
  useEffect(() => {
    startNewGame();
  }, []);

  // タイマーの管理
// タイマーの管理
useEffect(() => {
    if (gameState.timeLeft > 0 && !gameState.gameOver) {
      const timer = setInterval(() => {
        setGameState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft === 0) {
            return {
              ...prev,
              timeLeft: 0,
              gameOver: true
            };
          }
          return {
            ...prev,
            timeLeft: newTimeLeft
          };
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [gameState.timeLeft, gameState.gameOver]);

  const startNewGame = (resetScore: boolean = false) => {
    setGameState(prev => ({
      ...initialState,
      targetNumber: generateTargetNumber(),
      cards: generateCards(),
      timeLeft: 55,
      // ゲームオーバーからの再スタート時はスコアをリセット
      totalScore: resetScore ? 0 : prev.totalScore,
      solvedProblems: resetScore ? 0 : prev.solvedProblems
    }));
    setUsedPositions(new Set());
  };

  const isValidExpression = (selectedCards: Card[]): boolean => {
    if (selectedCards.length === 0) return false;
  
    for (let i = 0; i < selectedCards.length - 1; i++) {
      const currentValue = selectedCards[i].value;
      const nextValue = selectedCards[i + 1].value;
  
      // 演算子が連続していないかチェック
      if (['+', '-', '×', '÷'].some(op => currentValue.endsWith(op)) &&
          ['+', '-', '×', '÷'].some(op => nextValue.startsWith(op))) {
        return false;
      }
  
      // 最後が演算子で終わっていないかチェック
      if (i === selectedCards.length - 2 &&
          ['+', '-', '×', '÷'].some(op => nextValue.endsWith(op))) {
        return false;
      }
    }
  
    return true;
  };

  const handleCardClick = (card: Card) => {
    if (gameState.gameOver || card.isUsed) return;

    setGameState(prev => ({
      ...prev,
      selectedCards: [...prev.selectedCards, card],
      cards: prev.cards.map(c => 
        c.id === card.id ? { ...c, isUsed: true } : c
      )
    }));

    setUsedPositions(prev => {
        const newSet = new Set(prev);
        newSet.add(card.position);
        return newSet;
      });  };

      const handleReset = () => {
        // 選択したカードをフィールドに戻す
        setGameState(prev => ({
          ...prev,
          cards: prev.cards.map(card => {
            if (prev.selectedCards.find(selected => selected.id === card.id)) {
              return { ...card, isUsed: false };
            }
            return card;
          }),
          selectedCards: [],
          calculationResult: null,
          message: ''
        }));
      };

  const calculateExpression = (): { result: number | null; error: string } => {
    const expression = gameState.selectedCards.map(card => card.value).join('');
    
    // ゼロ除算のチェック
    if (expression.includes('÷0')) {
      return { result: null, error: 'ゼロで割ることはできません' };
    }

    try {
      // ×と÷を*と/に置換
      const normalizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(normalizedExpression);

      if (!Number.isInteger(result)) {
        return { result: null, error: '計算結果が整数ではありません' };
      }

      return { result, error: '' };
    } catch (error) {
      return { result: null, error: '計算式が正しくありません' };
    }
  };

  const handleCalculate = () => {
    if (gameState.isCalculating) return;  // 計算中は新しい計算を防ぐ
    if (gameState.selectedCards.length === 0) {
      setGameState(prev => ({
        ...prev,
        message: 'カードを選択してください'
      }));
      return;
    }

    if (!isValidExpression(gameState.selectedCards)) {
        setGameState(prev => ({
          ...prev,
          message: '無効な計算式です',
          calculationResult: null
        }));
        return;
      }

      setGameState(prev => ({ ...prev, isCalculating: true }));


    const { result, error } = calculateExpression();

    if (error) {
        setGameState(prev => ({
          ...prev,
          message: error,
          calculationResult: null,
          isCalculating: false
        }));
        return;
      }
    
      if (result === gameState.targetNumber) {
        // 正解の場合
        const score = gameState.selectedCards.length * gameState.timeLeft;
        setGameState(prev => ({
          ...prev,
          totalScore: prev.totalScore + score,
          calculationResult: result,
          message: '正解！',
          solvedProblems: prev.solvedProblems + 1,
          isCalculating: true
        }));
        // 少し待ってから次の問題へ
        setTimeout(() => {
          startNewGame();
        }, 1500);
      } else {
        // 不正解の場合
        setGameState(prev => ({
          ...prev,
          calculationResult: result,
          message: '残念！もう一度チャレンジしてください',
          isCalculating: false
        }));
      }
    };

  const handleShuffle = () => {
    if (gameState.shufflesLeft <= 0) return;
  
    // 使用済みのカードを含めて新しいカードを生成
    const usedCards = gameState.cards.filter(card => card.isUsed);
    setGameState(prev => ({
      ...prev,
      cards: generateCards(usedCards),
      shufflesLeft: prev.shufflesLeft - 1
    }));
  };

  const handleGameOver = () => {
    setGameState(prev => ({
      ...prev,
      gameOver: true
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ゲーム情報の表示 */}
      <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
  <div className="text-xl font-bold text-purple-600">
    Target: {gameState.targetNumber}
  </div>
  <div className="flex gap-6">
  <div className="text-fuchsia-600 text-lg font-semibold">
  Time: <span className="text-fuchsia-600">{gameState.timeLeft}s</span>
</div>
<div className="text-purple-600 text-lg font-semibold">
  Score: <span className="text-purple-600">{gameState.totalScore}</span>
</div>
<div className="text-blue-600 text-lg font-semibold">
  Solved: <span className="text-blue-600">{gameState.solvedProblems}</span>
</div>
<div className="text-indigo-600 text-lg font-semibold">
  Shuffles: <span className="text-indigo-600">{gameState.shufflesLeft}</span>
</div>
  </div>
</div>

        {/* カード選択エリア */}
        <div className="mb-6">
  <div className="flex items-center gap-2 min-h-16 bg-gray-50 p-4 rounded-lg overflow-x-auto">
    <div className="flex items-center gap-2 flex-nowrap">
      {gameState.selectedCards.map((card, index) => {
        // カードの数が増えるほどサイズを小さくする
        const cardSize = gameState.selectedCards.length > 6 ? 'text-base p-2' : 'text-xl p-3';
        return (
          <motion.div
            key={`selected-${card.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-purple-100 rounded-lg font-bold whitespace-nowrap ${cardSize}`}
          >
            {card.value}
          </motion.div>
        );
      })}
      {gameState.selectedCards.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-purple-600 ml-2"
          >
            =
          </motion.div>
          {gameState.calculationResult !== null && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-blue-600 ml-2"
            >
              {gameState.calculationResult}
            </motion.div>
          )}
        </>
      )}
    </div>
  </div>
          {/* メッセージ表示エリア */}
          {gameState.message && (
           <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className={`text-center mt-2 font-bold ${
             gameState.message === '正解！' ? 'text-green-600' : 'text-red-600'
           }`}
         >
           {gameState.message}
         </motion.div>
          )}
        </div>

        {/* ボタンエリア */}
        <div className="flex justify-center gap-4 mb-6">
        <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-2 bg-fuchsia-500 text-white rounded-lg font-bold hover:bg-fuchsia-700"
  onClick={handleCalculate}
  disabled={gameState.isCalculating}
>
  Calc
</motion.button>

{/* やり直しボタン */}
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600"
  onClick={handleReset}
>
  Clear
</motion.button>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`px-6 py-3 rounded-lg text-white font-bold ${
    gameState.shufflesLeft > 0
      ? 'bg-pink-400 hover:bg-pink-600'
      : 'bg-gray-400 cursor-not-allowed'
  }`}
  onClick={handleShuffle}
  disabled={gameState.shufflesLeft <= 0}
>
  Shuffle
</motion.button>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-4 gap-4">
  {gameState.cards.map((card) => (
    <CardComponent
      key={card.id}
      card={card}
      onClick={handleCardClick}
    />
  ))}
</div>

        {/* コントロールボタン */}
        
      </div>

      {/* ゲームオーバー表示 */}
      {gameState.gameOver && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-8 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
      <p className="text-xl mb-2">Total Score: {gameState.totalScore}</p>
      <p className="text-lg mb-4">Problems Solved: {gameState.solvedProblems}</p>
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700"
        onClick={() => startNewGame(true)}  // trueを渡してスコアをリセット
      >
        Play Again
      </button>
    </motion.div>
  </div>
      )}
    </div>
  );
};

export default GameBoard;