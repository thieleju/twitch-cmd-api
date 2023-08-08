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
  switch (mode) {
    case "bullet":
      return data.chess_bullet.last.rating;
    case "blitz":
      return data.chess_blitz.last.rating;
    case "rapid":
      return data.chess_rapid.last.rating;
    case "all":
      return `Bullet: ${data.chess_bullet.last.rating} ~ Blitz: ${data.chess_blitz.last.rating} ~ Rapid: ${data.chess_rapid.last.rating}`;
    default:
      return "Invalid mode!";
  }
}

module.exports = {
  log,
  getLichessResponse,
  getChessComResponse,
};
