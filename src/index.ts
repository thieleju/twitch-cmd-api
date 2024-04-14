import express, { Request, Response, NextFunction, Application } from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import morgan from "morgan"
import "express-async-errors"

import { log } from "./utils"

import * as packageJson from "../package.json"
import lichesselo from "./routes/lichesselo"
import tchesscomelo from "./routes/chesscomelo"

// Node process error handling
process.on("uncaughtException", (ex: Error) => {
  log(ex.stack || ex.message || ex.toString())
  process.exitCode = 1
})

process.on("unhandledRejection", (ex: Error) => {
  log(ex.stack || ex.message || ex.toString())
  throw ex
})

const port = process.env.PORT || 3000
const app: Application = express()

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Don't add X-RateLimit headers
    message: "Too many requests!"
  })
)

app.use(helmet())

// check if provided data is a valid json to catch unhandled errors
app.use((req: Request, res: Response, next: NextFunction) => {
  express.json({ limit: "100mb" })(req, res, (err: Error) => {
    if (err)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid json provided" })
    next()
  })
})

// Log requests
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.date(req, res, "iso"),
      "|",
      `${tokens.res(req, res, "ratelimit-remaining")}/${tokens.res(req, res, "ratelimit-limit")} |`,
      tokens["remote-addr"](req, res),
      "|",
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "|",
      tokens.res(req, res, "content-length") || "-",
      "|",
      // tokens["user-agent"](req, res),
      tokens["response-time"](req, res),
      "ms"
    ].join(" ")
  })
)

// prevent passing query parameters
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.query && Object.keys(req.query).length > 0) {
    return res.status(400).send("Query parameters are not allowed")
  }
  next()
})

app.get("/", (_req: Request, res: Response) => {
  res.send(
    `Twitch Command API<br> Visit this project on github: <a href='${packageJson.repository.url}'>Github link</a>`
  )
})

// Robots.txt to prevent crawlers from indexing the site
app.get("/robots.txt", function (_req: Request, res: Response) {
  res.type("text/plain")
  res.send("User-agent: *\nDisallow: /")
})

// routes
app.use("/lichesselo", lichesselo)
app.use("/chesscomelo", tchesscomelo)

// Global error handler middleware
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send("Internal Server Error")
})

// fallback route
app.get("*", (_req: Request, res: Response) => {
  res.status(404).send("Not found")
})

// start server
app.listen(port, () => {
  log(`App listening on port ${port}!`)
})
