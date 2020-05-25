// Setting up file
const mongoose = require('mongoose');
// import Schema, model from 'mongoose';

// Creating Schema

const WeatherSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false },
);

const Weather = mongoose.model('weather', WeatherSchema);

module.exports = Weather;
