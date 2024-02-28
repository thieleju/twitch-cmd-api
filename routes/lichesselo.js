import express from "express"
import { Router } from "express"
import axios from "axios"
import Joi from "joi"
import { createValidator } from "express-joi-validation"

const validator = createValidator({})
const router = Router()

import { log, getLichessResponse } from "../utils.js"

const lichessurl = "https://lichess.org/api/user"

router.get(
  "/:mode/:username",
  validator.params(
    Joi.object({
      mode: Joi.string()
        .trim()
        .valid("puzzle", "bullet", "blitz", "rapid", "classical", "all")
        .required(),
      username: Joi.string().trim().required()
    })
  ),
  async (req, res) => {
    try {
      const cleanMode = req.paramString("mode")
      const cleanUsername = req.paramString("username")

      const apiUrl = `${lichessurl}/${cleanUsername}`

      const { data } = await axios.get(apiUrl)

      const response = getLichessResponse(cleanMode, data.perfs)

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
