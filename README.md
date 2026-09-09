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

<br>

## `GET /conditional/:left/:operator/:right/:ifTrue/:ifFalse`

Evaluates a condition and returns plain text for true or false.
Designed for StreamElements `$(customapi)` usage.

#### Available operators

- `eq` (equals)
- `eqi` (equals, case-insensitive)
- `ne` (not equals)
- `nei` (not equals, case-insensitive)
- `contains`
- `containsi` (case-insensitive)
- `startswith`
- `startswithi` (case-insensitive)
- `endswith`
- `endswithi` (case-insensitive)
- `gt` (greater than, numeric)
- `gte` (greater than or equal, numeric)
- `lt` (less than, numeric)
- `lte` (less than or equal, numeric)

Note:

- Replace spaces with `_` in `ifTrue`/`ifFalse` and format the final text in StreamElements if needed.

## Run locally

- `pnpm i` to install dependencies
- `pnpm run dev` to start the server on port 3000
  - Visit `localhost:3000`
