const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

const { log } = require("./utils");

const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // max requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Don't add X-RateLimit headers
  message: "Too many requests!",
});

app.use(limiter);

// use sanitizer
app.use(require("sanitize").middleware);

// routes
app.use("/lichesselo", require("./routes/lichesselo"));

// fallback route
app.get("*", (req, res) => {
  res.send(
    "Twitch Command API<br> Visit this project on github: <a href='https://github.com/thieleju/twitch-cmd-api'>Github link</a>"
  );
});

// start server
app.listen(port, () => {
  log(`App listening on port ${port}!`);
});
