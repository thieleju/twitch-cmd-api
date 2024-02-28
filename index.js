import express from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import { middleware as sanitizerMiddleware } from "sanitize"
import "express-async-errors"

import { log } from "./utils.js"

// Node process error handling
process.on("uncaughtException", (ex) => {
  log(null, null, ex.stack)
  process.exitCode = 1
})

process.on("unhandledRejection", (ex) => {
  log(null, null, ex.stack)
  throw ex
})

const port = process.env.PORT || 3000
const app = express()

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // max requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Don't add X-RateLimit headers
    message: "Too many requests!"
  })
)

app.use(helmet())

// use sanitizer
app.use(sanitizerMiddleware)

// check if provided data is a valid json to catch unhandled errors
app.use((req, res, next) => {
  express.json({ limit: "100mb" })(req, res, (err) => {
    if (err)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid json provided" })
    next()
  })
})

app.use(async function (req, res, next) {
  res.on("finish", () => {
    const userAgent = req?.headers ? req.headers["user-agent"] : "No user-agent"
    log(req, res, userAgent)
  })
  next()
})

// Robots.txt to prevent crawlers from indexing the site
app.get("/robots.txt", function (req, res) {
  res.type("text/plain")
  res.send("User-agent: *\nDisallow: /")
})

// routes
import lichesselo from "./routes/lichesselo.js"
import tchesscomelo from "./routes/chesscomelo.js"
app.use("/lichesselo", lichesselo)
app.use("/chesscomelo", tchesscomelo)

// Global error handler middleware
app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error")
})

// fallback route
app.get("*", (req, res) => {
  res.send(
    "Twitch Command API<br> Visit this project on github: <a href='https://github.com/thieleju/twitch-cmd-api'>Github link</a>"
  )
})

// start server
app.listen(port, () => {
  log(null, null, `App listening on port ${port}!`)
})
