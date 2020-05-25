/* eslint-disable class-methods-use-this */
// Require the necessary modules for this file.
const express = require('express');
const jwt = require('jsonwebtoken');

// Verify Token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}


class WeatherRouter {
  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  // Binding the stuff to the stuff
  router() {
    const router = express.Router();
    router.get('/weather', verifyToken, this.getInfo.bind(this));
    router.post('/token', this.token.bind(this));
    return router;
  }

  getInfo(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        return this.weatherService.getNewInfo(req.token)
          .then((data) => res.send(data))
          .catch(() => {
            this.weatherService.getDBInfo()
              .then((dbData) => res.send(dbData))
              .catch((error) => res.send(error));
          });
      }
    });
  }

  token(req, res) {
    return this.weatherService.getToken()
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  }
}
module.exports = WeatherRouter;
