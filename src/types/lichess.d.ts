export interface LichessUserData {
  id: string
  username: string
  perfs: {
    blitz?: {
      games: number
      rating: number
      rd: number
      prog: number
    }
    puzzle?: {
      games: number
      rating: number
      rd: number
      prog: number
    }
    racer?: {
      runs: number
      score: number
    }
    ultraBullet?: {
      games: number
      rating: number
      rd: number
      prog: number
      prov?: boolean
    }
    streak?: {
      runs: number
      score: number
    }
    storm?: {
      runs: number
      score: number
    }
    bullet?: {
      games: number
      rating: number
      rd: number
      prog: number
    }
    correspondence?: {
      games: number
      rating: number
      rd: number
      prog: number
      prov?: boolean
    }
    classical?: {
      games: number
      rating: number
      rd: number
      prog: number
      prov?: boolean
    }
    rapid?: {
      games: number
      rating: number
      rd: number
      prog: number
    }
  }
  createdAt: number
  profile: {
    fideRating: number
    uscfRating: number
  }
  seenAt: number
  playTime: {
    total: number
    tv: number
  }
  url: string
  count: {
    all: number
    rated: number
    ai: number
    draw: number
    drawH: number
    loss: number
    lossH: number
    win: number
    winH: number
    bookmark: number
    playing: number
    import: number
    me: number
  }
}
