const express = require('express');
const hbs = require('hbs');
const path = require('path');

// URL==== https://api.openweathermap.org/data/2.5/weather?q=London&appid=beb897f755959e9b4df3dc88fef3baab

const request = require('request');
const app = express();

const port = process.env.port || 3000;

const publicStaticDirPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');
const weatherData = require('./utils/weatherdata');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to the Weather App',
  });
});

//////////
app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must enter address in search text box',
    });
  }

  weatherData(
    address,
    (error, { temperature, description, cityName, country } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      console.log(temperature, description, cityName, country);
      res.send({
        temperature,
        description,
        cityName,
        country,
      });
    }
  );
});
///////////
app.get('*', (req, res) => {
  res.render('error', {
    title: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
