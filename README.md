<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

<a href='https://github.com/InnovOrder/software-technical-tests/tree/master/crud-nestjs'>Software technical test</a> for Junior Fullstack Developer (NodeJS + Angular/React) position at Innovorder

CRUD nestJs API with MongoDB

# Running the app locally
## Installation

If you want to have the app running locally:

- Make sure to have MongoDB
- Clone this repo

```bash
cd your-path/crud-nestjs
$ npm install
```

## Configuration .env

See below an exemple of the .env file

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-DB-name
SESSION_SECRET=your-session-secret
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Running the Docker containers

- Clone this repo

```bash
cd your-path/crud-nestjs
```

```bash
docker-compose up dev
```

or

```bash
docker-compose up prod
```

# Routes

Home: GET - http://localhost:3000/ </br>

To register a new user: POST - http://localhost:3000/users </br>
Please provide as JSON

```bash
{
    "email":"jdoe@email.com",
    "password":"YourPassword1"
}
```

To log in: POST - http://localhost:3000/sessions </br>
Please provide as JSON

```bash
{
    "username":"jdoe@email.com",
    "password":"YourPassword1"
}
```

To get product detail from API OpenFoodFact: GET - http://localhost:3000/product </br>
Please provide as JSON

```bash
{
    "id":"000000000186"
}
```

To update user: PATCH - http://localhost:3000/user </br>
Please provide as JSON the field(s) you would like to update

```bash
{
    "email":"update@email.com",
    "password":"NewPass1"
}
```
