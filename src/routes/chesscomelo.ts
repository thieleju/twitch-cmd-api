import express, { Request, Response, Router } from "express"
import axios from "axios"
import Joi from "joi"
import { createValidator } from "express-joi-validation"
import { log, getChessComResponse } from "../utils"

import * as packageJson from "../../package.json"

const validator = createValidator({})
const router: Router = Router()

router.get(
  "/:mode/:username",
  validator.params(
    Joi.object({
      mode: Joi.string()
        .trim()
        .valid("bullet", "blitz", "rapid", "all")
        .required(),
      username: Joi.string().trim().required()
    })
  ),
  async (req: Request, res: Response) => {
    try {
      const mode: string = req.params.mode
      const username: string = req.params.username

      const apiUrl: string = `https://api.chess.com/pub/player/${username}/stats`

      const { data } = await axios.get(apiUrl, {
        headers: {
          "User-Agent": `Twitch-cmd-api (${packageJson.repository.url}`
        }
      })

      const response: string = getChessComResponse(mode, data)

      log(`Request for ${username} (${mode}) => ${response}`)
      res.send(String(response))
    } catch (err) {
      log(String(err))
      res.send("User not found!")
    }
  }
)

export default router
