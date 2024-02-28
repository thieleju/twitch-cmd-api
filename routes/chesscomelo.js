import express from "express"
import { Router } from "express"
import axios from "axios"
import Joi from "joi"
import { createValidator } from "express-joi-validation"

const validator = createValidator({})
const router = Router()

import { log, getChessComResponse } from "../utils.js"

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
  async (req, res) => {
    try {
      const cleanMode = req.paramString("mode")
      const cleanUsername = req.paramString("username")

      const apiUrl = `https://api.chess.com/pub/player/${cleanUsername}/stats`

      const { data } = await axios.get(apiUrl, {
        headers: {
          "User-Agent": "Twitch-cmd-api (github.com/thieleju/twitch-cmd-api)"
        }
      })

      const response = getChessComResponse(cleanMode, data)

      log(
        req,
        res,
        `Request for ${cleanUsername} (${cleanMode}) => ${response}`
      )

      res.send(String(response))
    } catch (err) {
      log(req, res, err)
      res.send("User not found!")
    }
  }
)

export default router
