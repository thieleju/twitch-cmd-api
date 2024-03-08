# twitch-cmd-api

[![Build and Deploy](https://github.com/thieleju/twitch-cmd-api/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/thieleju/twitch-cmd-api/actions/workflows/build-and-deploy.yml)

A simple API for twitch bots.

# Available Endpoints

## `GET /lichesselo/:mode/:username`

Returns the lichess elo for the chosen mode of the given user.
Response is the elo as text.

#### Available modes

- `bullet`
- `blitz`
- `rapid`
- `classical`
- `puzzle`
- `all`

### Streamelements Command Example

- Add this as a new custom command
  - `@${sender} Blitz elo of ${1}: ${urlfetch https://twitch-api.node5.de/lichesselo/blitz/${1}}`
- Type `!blitz <username>` in chat
- Output: `@user Blitz elo of user: 1500`

<br>

## `GET /chesscomelo/:mode/:username`

Returns the chess.com elo for the chosen mode of the given user.
Response is the elo as text.

#### Available modes

- `bullet`
- `blitz`
- `rapid`
- `all`

### Streamelements Command Example

- Add this as a new custom command
  - `@${sender} Blitz elo of ${1}: ${urlfetch https://twitch-api.node5.de/chesscomelo/blitz/${1}}`
- Type `!blitz <username>` in chat
- Output: `@user Blitz elo of user: 1500`

## Run locally

- `pnpm i` to install dependencies
- `pnpm run dev` to start the server on port 3000
  - Visit `localhost:3000`
