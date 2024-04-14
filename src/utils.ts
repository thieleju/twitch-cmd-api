import { Request, Response } from "express"

import { LichessUserData } from "./types/lichess"
import { ChesscomUserData } from "./types/chesscom"

/**
 * Logs a message to the console with a timestamp
 * @param {string} msg - The message to log
 * @returns {void}
 */
export function log(msg: string): void {
  const date: string = new Date().toISOString()
  console.log(`${date} | ${msg}`)
}

/**
 * Extracts the response from the Lichess API data
 * @param {string} mode - The mode to extract from the data
 * @param {LichessUserData} data - The data from the Lichess API
 * @returns {string} - The extracted response
 */
export function getLichessResponse(
  mode: string,
  data: LichessUserData
): string {
  const perfs: LichessUserData["perfs"] = data.perfs
  switch (mode) {
    case "bullet":
      return String(perfs.bullet?.rating ?? "No bullet rating found!")
    case "blitz":
      return String(perfs.blitz?.rating ?? "No blitz rating found!")
    case "rapid":
      return String(perfs.rapid?.rating ?? "No rapid rating found!")
    case "classical":
      return String(perfs.classical?.rating ?? "No classical rating found!")
    case "puzzle":
      return String(perfs.puzzle?.rating ?? "No puzzle rating found!")
    case "all":
      const arr: string[] = []
      if (perfs.rapid) arr.push(`Rapid: ${perfs.rapid.rating}`)
      if (perfs.blitz) arr.push(`Blitz: ${perfs.blitz.rating}`)
      if (perfs.bullet) arr.push(`Bullet: ${perfs.bullet.rating}`)
      if (perfs.classical) arr.push(`Classical: ${perfs.classical.rating}`)
      if (perfs.puzzle) arr.push(`Puzzle: ${perfs.puzzle.rating}`)
      return arr.length > 0 ? arr.join(" ~ ") : "No ratings found!"
    default:
      return "Invalid mode!"
  }
}

/**
 * Extracts the response from the Chess.com API data
 * @param {string} mode - The mode to extract from the data
 * @param {ChesscomUserData} data - The data from the Chess.com API
 * @returns {string} - The extracted response
 */
export function getChessComResponse(
  mode: string,
  data: ChesscomUserData
): string {
  const bullet: number | undefined = data.chess_bullet?.last?.rating
  const blitz: number | undefined = data.chess_blitz?.last?.rating
  const rapid: number | undefined = data.chess_rapid?.last?.rating

  switch (mode) {
    case "bullet":
      return bullet ? String(bullet) : "No bullet rating found!"
    case "blitz":
      return blitz ? String(blitz) : "No blitz rating found!"
    case "rapid":
      return rapid ? String(rapid) : "No rapid rating found!"
    case "all":
      const arr: string[] = []
      if (rapid) arr.push(`Rapid: ${rapid}`)
      if (blitz) arr.push(`Blitz: ${blitz}`)
      if (bullet) arr.push(`Bullet: ${bullet}`)
      return arr.length > 0 ? arr.join(" ~ ") : "No ratings found!"
    default:
      return "Invalid mode!"
  }
}
