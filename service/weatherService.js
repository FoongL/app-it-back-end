// Importing packages required (axios and JWT)
const axios = require('axios');
const jwt = require('jsonwebtoken');

/* eslint-disable class-methods-use-this */
class DashboardService {
  constructor(model) {
    this.Model = model;
  }

  getNewInfo() {
    return new Promise((resolve, reject) => {
      const latestInfo = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${process.env.COUNTRY_ID}&appid=${process.env.API_KEY}`,
      );
      latestInfo
        .then((data) => {
          const newWeather = new this.Model(data.data);
          newWeather.save();
          resolve({ source: 'live Call', data: data.data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getDBInfo() {
    return new Promise((resolve, reject) => {
      const latestEntry = this.Model.find().sort({ date: -1 }).limit(1);
      latestEntry
        .then((data) => {
          resolve({ source: 'Database', data });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getToken() {
    return new Promise((resolve) => {
      jwt.sign(
        { userId: 'test account' },
        process.env.JWT_SECRET,
        (err, token) => {
          resolve({ token });
        },
      );
    });
  }
}

module.exports = DashboardService;
