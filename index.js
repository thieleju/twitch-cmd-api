const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// use sanitizer
app.use(require("sanitize").middleware);

// parse json
// app.use(express.json());

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
