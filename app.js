/* eslint-disable no-console */
// -------------- Package requirement and set up
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Setting up mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

// setting up routes
const weather = require('./models/Weather');
const WeatherService = require('./service/weatherService');
const WeatherRouter = require('./routes/weatherRoutes');

const weatherService = new WeatherService(weather);

app.use('/', new WeatherRouter(weatherService).router());

// server set up

const options = {
  cert: fs.readFileSync('./localhost.crt'),
  key: fs.readFileSync('./localhost.key'),
};

https.createServer(options, app).listen(process.env.PORT, () => console.log(`Server Listening on ${process.env.PORT}.`));
