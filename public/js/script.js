var fetchWeather = '/weather';
const body = document.body;
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');
let video = document.getElementById('background-video');
const generateVideoBackground = (url) => {
  // let video = document.getElementById('background-video');
  let source = document.createElement('source');
  source.setAttribute('src', url);
  source.setAttribute('type', 'video/mp4');
  video.appendChild(source);
};

generateVideoBackground(
  'https://assets.mixkit.co/videos/preview/mixkit-beautiful-shot-of-a-cloudy-sky-flying-through-them-30308-large.mp4'
);

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

dateElement.textContent =
  new Date().getDate() +
  ', ' +
  monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  locationElement.textContent = 'Loading...';
  tempElement.textContent = '';
  weatherCondition.textContent = '';
  const locationApi = fetchWeather + '?address=' + search.value;

  //   const response = await fetch(locationApi);
  //   const data = await response.json(data);
  //   if (data.error) {
  //     locationElement.textContent = data.error;
  //     tempElement.textContent = '';
  //     weatherCondition.textContent = '';
  //   } else {
  //     console.log();
  //     if (data.description === 'rain' || data.description === 'fog') {
  //       weatherIcon.className = 'wi wi-day-' + data.description;
  //     } else {
  //       weatherIcon.className = 'wi wi-day-cloudy';
  //     }
  //     locationElement.textContent = data.cityName;
  //     tempElement.textContent =
  //       (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
  //     weatherCondition.textContent = data.description.toUpperCase();
  //   }

  fetch(locationApi).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = '';
        weatherCondition.textContent = '';
      } else {
        // rain sunny smoke cloudy loadvideo
        // if (data.description === 'rain' || data.description === 'fog') {
        //   weatherIcon.className = 'wi wi-day-' + data.description;
        // } else {
        //   weatherIcon.className = 'wi wi-day-cloudy';
        // }
        if (data.description == 'rain') {
          weatherIcon.className = 'wi wi-day-rain';
        } else if (data.description === 'clear sky') {
          weatherIcon.className = 'wi wi-day-sunny';
        } else if (data.description === 'broken clouds') {
          weatherIcon.className = 'wi wi-cloudy';
        }

        locationElement.textContent = data.cityName;
        tempElement.textContent =
          (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
        weatherCondition.textContent = data.description.toUpperCase();
      }
    });
  });
});
