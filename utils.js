function log(req, res, msg) {
  const date = new Date().toISOString();
  const headers = res ? res.getHeaders() : null;
  const route = req ? `${req?.baseUrl}${req?.path}` : "SERVER";
  const ratelimit = headers
    ? `${headers["ratelimit-remaining"]} / ${headers["ratelimit-limit"]} | `
    : "";

  console.log(`${date} | ${ratelimit}${route} | ${msg}`);
}

function getLichessResponse(mode, perfs) {
  switch (mode) {
    case "bullet":
      return perfs.bullet.rating;
    case "blitz":
      return perfs.blitz.rating;
    case "rapid":
      return perfs.rapid.rating;
    case "classical":
      return perfs.classical.rating;
    case "puzzle":
      return perfs.puzzle.rating;
    case "all":
      return `Bullet: ${perfs.bullet.rating} ~ Blitz: ${perfs.blitz.rating} ~ Rapid: ${perfs.rapid.rating} ~ Klassisch: ${perfs.classical.rating} ~ Puzzle: ${perfs.puzzle.rating}`;
    default:
      return "Invalid mode!";
  }
}

function getChessComResponse(mode, data) {
  const bullet = data.chess_bullet?.last?.rating || false;
  const blitz = data.chess_blitz?.last?.rating || false;
  const rapid = data.chess_rapid?.last?.rating || false;
  switch (mode) {
    case "bullet":
      return bullet || "No bullet rating found!";
    case "blitz":
      return blitz || "No blitz rating found!";
    case "rapid":
      return rapid || "No rapid rating found!";
    case "all":
      let arr = [];
      if (bullet) arr.push(`Bullet: ${bullet}`);
      if (blitz) arr.push(`Blitz: ${blitz}`);
      if (rapid) arr.push(`Rapid: ${rapid}`);
      return arr.join(" ~ ");
    default:
      return "Invalid mode!";
  }
}

module.exports = {
  log,
  getLichessResponse,
  getChessComResponse,
};
