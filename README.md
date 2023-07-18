# twitch-cmd-api

[![Build and Deploy](https://github.com/thieleju/twitch-cmd-api/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/thieleju/twitch-cmd-api/actions/workflows/build-and-deploy.yml)


A simple API for twitch bots.

## Available endpoints

`GET /lichesselo/:mode/:username`

Returns the lichess elo for the chosen mode of the given user.

#### Available modes

- `bullet`
- `blitz`
- `rapid`
- `classical`
- `puzzle`

## Example

`GET twitch-api.node5.de/lichesselo/blitz/privitx`