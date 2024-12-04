'use client'

import GameBoard from '@/components/GameBoard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          計算カードゲーム
        </h1>
        <GameBoard />
      </div>
    </main>
  )
}