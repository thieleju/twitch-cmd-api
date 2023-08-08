const express = require("express");
const router = express.Router();
const axios = require("axios");

const { log, getChessComResponse } = require("../utils");

router.get("/:mode/:username", async (req, res) => {
  try {
    const cleanMode = req.paramString("mode");
    const cleanUsername = req.paramString("username");

    const apiUrl = `https://api.chess.com/pub/player/${cleanUsername}/stats`;

    const { data } = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "Twitch-cmd-api (github.com/thieleju/twitch-cmd-api)",
      },
    });

    const response = getChessComResponse(cleanMode, data);

    log(req, res, `Request for ${cleanUsername} (${cleanMode}) => ${response}`);

    res.send(String(response));
  } catch (err) {
    log(req, res, err);
    res.send("Error or user not found!");
  }
});

module.exports = router;
