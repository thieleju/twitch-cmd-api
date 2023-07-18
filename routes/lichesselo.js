const express = require("express");
const router = express.Router();
const axios = require("axios");

const lichessurl = "https://lichess.org/api/user";

router.get("/:mode/:username", async (req, res) => {
  try {
    const cleanMode = req.paramString("mode");
    const cleanUsername = req.paramString("username");

    const apiUrl = `${lichessurl}/${cleanUsername}`;

    const { data } = await axios.get(apiUrl);

    let response = "Invalid mode!";

    switch (cleanMode) {
      case "bullet":
        response = data.perfs.bullet.rating;
        break;
      case "blitz":
        response = data.perfs.blitz.rating;
        break;
      case "rapid":
        response = data.perfs.rapid.rating;
        break;
      case "classical":
        response = data.perfs.classical.rating;
        break;
      case "puzzle":
        response = data.perfs.puzzle.rating;
        break;
      case "all":
        response = `Bullet: ${data.perfs.bullet.rating} ~ Blitz: ${data.perfs.blitz.rating} ~ Rapid: ${data.perfs.rapid.rating} ~ Klassisch: ${data.perfs.classical.rating} ~ Puzzle: ${data.perfs.puzzle.rating}`;
    }
    log(`Request for ${cleanUsername} (${cleanMode}) => ${response}`);
    res.send(String(response));
  } catch (err) {
    log(err, err.response.statusText);
    res.send("Invalid request!");
  }
});

module.exports = router;

// log with multiple arguments
function log(...msg) {
  console.log(`${new Date().toISOString()} | ${msg}`);
}
