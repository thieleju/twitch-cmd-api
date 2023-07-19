function log(msg, headers) {
  if (headers)
    console.log(
      `${new Date().toISOString()} | ${
        headers["ratelimit-remaining"] + "/" + headers["ratelimit-limit"]
      } | ${msg}`
    );
  else console.log(`${new Date().toISOString()} | ${msg}`);
}

function getLichessResponse(mode, perfs) {
  let response = "";
  switch (mode) {
    case "bullet":
      response = perfs.bullet.rating;
      break;
    case "blitz":
      response = perfs.blitz.rating;
      break;
    case "rapid":
      response = perfs.rapid.rating;
      break;
    case "classical":
      response = perfs.classical.rating;
      break;
    case "puzzle":
      response = perfs.puzzle.rating;
      break;
    case "all":
      response = `Bullet: ${perfs.bullet.rating} ~ Blitz: ${perfs.blitz.rating} ~ Rapid: ${perfs.rapid.rating} ~ Klassisch: ${perfs.classical.rating} ~ Puzzle: ${perfs.puzzle.rating}`;
      break;
    default:
      response = "Invalid mode!";
  }
  return response;
}

module.exports = {
  log,
  getLichessResponse,
};
