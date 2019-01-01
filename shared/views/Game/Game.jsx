import React, { useEffect, useState } from 'react'
import GameBoard from 'shared/components/GameBoard'

const GameView = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return !isClient ? null : <GameBoard />
}

export default GameView
