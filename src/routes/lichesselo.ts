import express, { Request, Response, Router } from "express"
import axios from "axios"
import Joi from "joi"
import { createValidator } from "express-joi-validation"
import { log, getLichessResponse } from "../utils"

const validator = createValidator({})
const router: Router = Router()

const lichessurl: string = "https://lichess.org/api/user"

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
  async (req: Request, res: Response) => {
    try {
      const mode: string = req.params.mode
      const username: string = req.params.username

      const apiUrl: string = `${lichessurl}/${username}`

      const { data } = await axios.get(apiUrl)

      const response: string = getLichessResponse(mode, data)

      log(`Request for ${username} (${mode}) => ${response}`)
      res.send(String(response))
    } catch (err) {
      log(String(err))
      res.send("User not found!")
    }
  }
)

export default router
