'use client'

import GameBoard from '@/components/GameBoard'
import Link from 'next/link'

export default function Game() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">計算カードゲーム</h1>
          <Link 
            href="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            タイトルに戻る
          </Link>
        </div>
        <GameBoard />
      </div>
    </main>
  )
}