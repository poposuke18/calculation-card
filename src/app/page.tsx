// src/app/page.tsx
'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isJapanese, setIsJapanese] = useState(true);

  const rules = {
    japanese: {
      title: "計算カードゲーム",
      description: "制限時間内に、カードを使って目標の数字を作ろう！",
      rules: [
        "制限時間は各問題50秒です",
        "フィールドには16枚のカードが配置されます：",
        "• 1段目：数字＋演算子のカード（例：8+）",
        "• 2段目：演算子＋数字のカード（例：×3）",
        "• 3段目：数字のカード（0-9）",
        "• 4段目：演算子カード（+, -, ×, ÷）",
        "カードを選んで計算式を作り、目標の数字を作ることが目的です",
        "スコア = 使用したカード枚数 × 残り時間",
        "シャッフルは3回まで使用可能です",
        "演算子を並べて計算はできません（-も不可）",
        "式に入れたカードはシャッフルしても式に残ります",
      ],
      startButton: "ゲームスタート"
    },
    english: {
      title: "Calculation Card Game",
      description: "Create the target number using cards within the time limit!",
      rules: [
        "Time limit is 50 seconds",
        "16 cards are placed on the field:",
        "• Row 1: Number + Operator cards (e.g., 8+)",
        "• Row 2: Operator + Number cards (e.g., ×3)",
        "• Row 3: Number cards (0-9)",
        "• Row 4: Operator cards (+, -, ×, ÷)",
        "Create equations using cards to match the target number",
        "Score = Number of cards used × Time remaining",
        "Shuffle can be used up to 3 times",
        "Cannot compute operators side by side (- is also not allowed)",
        "Cards placed in the formula remain in the formula even after shuffling",
      ],
      startButton: "Start Game"
    }
  };

  const currentLang = isJapanese ? rules.japanese : rules.english;

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setIsJapanese(!isJapanese)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isJapanese ? "English" : "日本語"}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
            {currentLang.title}
          </h1>
          
          <p className="text-xl text-center text-indigo-600 mb-8">
            {currentLang.description}
          </p>

          <div className="space-y-4 mb-12">
            {currentLang.rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-700"
              >
                {rule}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg text-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                {currentLang.startButton}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}