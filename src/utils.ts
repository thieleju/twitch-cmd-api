import { Request, Response } from "express"

export function log(
  msg: string
): void {
  const date: string = new Date().toISOString()
  console.log(`${date} | ${msg}`)
}

export function getLichessResponse(mode: string, perfs: any): string {
  switch (mode) {
    case "bullet":
      return perfs.bullet.rating
    case "blitz":
      return perfs.blitz.rating
    case "rapid":
      return perfs.rapid.rating
    case "classical":
      return perfs.classical.rating
    case "puzzle":
      return perfs.puzzle.rating
    case "all":
      return `Bullet: ${perfs.bullet.rating} ~ Blitz: ${perfs.blitz.rating} ~ Rapid: ${perfs.rapid.rating} ~ Classical: ${perfs.classical.rating} ~ Puzzle: ${perfs.puzzle.rating}`
    default:
      return "Invalid mode!"
  }
}

export function getChessComResponse(mode: string, data: any): string {
  const bullet: string | boolean = data.chess_bullet?.last?.rating || false
  const blitz: string | boolean = data.chess_blitz?.last?.rating || false
  const rapid: string | boolean = data.chess_rapid?.last?.rating || false
  switch (mode) {
    case "bullet":
      return bullet ? String(bullet) : "No bullet rating found!"
    case "blitz":
      return blitz ? String(blitz) : "No blitz rating found!"
    case "rapid":
      return rapid ? String(rapid) : "No rapid rating found!"
    case "all":
      const arr: string[] = []
      if (bullet) arr.push(`Bullet: ${bullet}`)
      if (blitz) arr.push(`Blitz: ${blitz}`)
      if (rapid) arr.push(`Rapid: ${rapid}`)
      return arr.length > 0 ? arr.join(" ~ ") : "No ratings found!"
    default:
      return "Invalid mode!"
  }
}
