# Foong Leung's Weather calling API

Welcome to Foong's Weather API caller on https://maomuntai.com

## Introduction

This API is designed to give you the latest and greatest weather details of Hong Kong, called for whenever you want. However we all know that there are times the weather stations/channels can be down, so when they are down, this will then provide you with the latest grabbed data (saved in a local database) to give you data that is as accurate as possible.

### Getting Started

To get started, you will need an API key, and one can easily be generated easily with A Get request to the following link. Axios would be used as a demonstration.

a simple GET request to route /token will allow you to obtain a token.

```javacript
const axios = require('axios');

let token = async () => {
  await axios.post('http://localhost:8080/token').then((data) => {
    console.log(data.data.token);
  });
};

token()

```

Be sure to keep your token safe. It will be needed to get all that weather data you need!

### Getting WeatherData
Now that you have your token, obtaining weather data is just one step away!

all you need to do is make sure you pass your token in the header of a GET request to the route /weather and that data will be yours!

```javacript
const axios = require('axios');

let weather = async (token) => {
  await axios
    .get('http://localhost:8080/weather', {
      headers: { Authorization: 'Bearer <INSERT TOKEN HERE>' },
    })
    .then((data) => {
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

```

### Notes about the Data
When you get the data back, be sure to check the source, if live data is able to be provided from the weather stations, your data.source should return "live call" to you. However, if the station is down, the source will return as "Database" letting you know where it comes from. 

For data coming from the database, the data returned will include a "date" parameter in order to let you know exactly when that piece of data was obtained. 

## Thoughts on the project
This was a fun one to build, it was not especially hard perse, however having worked primarily with SQL databases(primarily Postgres), it was fun to set up a backend server to MongoDB. ESlint was implemented into this project with airbnb standards. However I was unable to figure out in the time span how to run my code on docker, or implement automated testing for API routes. All testing for this project was done via Postman. However both subjects are things I will continue to look into.

## Parting thoughts
I hope you enjoyed my version of the weather API, and would greatly appreciate any feedback you may have to further improve!



Thank you


Foong