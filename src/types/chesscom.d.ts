export interface ChesscomUserData {
  chess_daily?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    record: {
      win: number
      loss: number
      draw: number
      time_per_move: number
      timeout_percent: number
    }
  }
  chess_rapid?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: string
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  chess_bullet?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: string
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  chess_blitz?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: string
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  tactics?: {
    highest: {
      rating: number
      date: number
    }
    lowest: {
      rating: number
      date: number
    }
  }
  puzzle_rush?: {
    best: {
      total_attempts: number
      score: number
    }
  }
}
