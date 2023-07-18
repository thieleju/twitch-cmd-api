const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

app.use(limiter);

// use sanitizer
app.use(require("sanitize").middleware);

// routes
app.use("/lichesselo", require("./routes/lichesselo"));

// fallback route
app.get("*", (req, res) => {
  res.status(404).send("Nothing here");
});

// start server
app.listen(port, () => {
  log(`App listening on port ${port}!`);
});

// print with timestamp
function log(msg) {
  console.log(`${new Date().toISOString()} | ${msg}`);
}
