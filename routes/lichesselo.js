const express = require("express");
const router = express.Router();
const axios = require("axios");

const { log, getLichessResponse } = require("../utils");

const lichessurl = "https://lichess.org/api/user";

router.get("/:mode/:username", async (req, res) => {
  try {
    const cleanMode = req.paramString("mode");
    const cleanUsername = req.paramString("username");

    const apiUrl = `${lichessurl}/${cleanUsername}`;

    const { data } = await axios.get(apiUrl);

    const response = getLichessResponse(cleanMode, data.perfs);

    log(req, res`Request for ${cleanUsername} (${cleanMode}) => ${response}`);

    res.send(String(response));
  } catch (err) {
    log(res.getHeaders(), req.path, err);
    res.send("Error or user not found!");
  }
});

module.exports = router;
