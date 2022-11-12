const e = require('express');
const request = require('request');
const constants = require('./../config.js');

const weatherData = (address, callback) => {
  const url =
    constants.openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    '&appid=' +
    constants.openWeatherMap.SECRET_KEY;
  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback('Cannot fetch data from api', undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp || 'Not Found',
        description: body.weather[0].description || 'Not Found',
        cityName: body.name || 'Not Found',
      });
    }
  });
};

module.exports = weatherData;
