const api = {
  key: "bc7887648a4548e18ae36f59e7fdb195",
  baseurl: "https://api.weatherbit.io/v2.0/forecast/daily?lat=",
  coord: {
    lat: "47.435201",
    long: "-121.056669",
  },
};

let count = 0;

window.onload = getResults;

// ********************************************************************

function getResults() {
  fetch(
    `${api.baseurl}${api.coord.lat}&lon=${api.coord.long}&units=I&days=6&key=${api.key}`
  )
    .then((forecast) => {
      return forecast.json();
    })
    .then(displayResults);
}

function displayResults(forecast) {
  // DAY CHANGE
  let day = document.getElementsByClassName("weather-day");
  while (count < 5) {
    if (count === 0) {
      day[count].innerText = "Today";
    } else {
      let dataCount = count + 1;
      // Date
      let date = new Date(forecast.data[dataCount].valid_date);
      date = retrieveDay(date.getDay());
      day[count].innerText = date;
    }
    count++;
  }
  // TEMP AND WEATHER CHANGE
  count = 0;
  let hi_temp = document.querySelectorAll(".weather-temp-hi span");
  let low_temp = document.querySelectorAll(".weather-temp-low span");
  let weather = document.querySelectorAll(".weather-type");
  while (count < 5) {
    let data_high_temp = forecast.data[count].high_temp;
    let data_low_temp = forecast.data[count].low_temp;
    hi_temp[count].innerText = Math.round(data_high_temp);
    low_temp[count].innerText = Math.round(data_low_temp);
    let weather_desc = forecast.data[count].weather.description;
    let editedWeather = retrieveWeather(weather_desc);
    weather[count].innerText = editedWeather;

    count++;
  }
}

// ********************************************************************

function retrieveDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (date = days[date]);
}

function retrieveWeather(weather) {
  // CLOUD
  cloud = weather.search(/cloud/i);
  // SUN
  sun = weather.search(/sun/i);
  clear = weather.search(/clear/i);
  // RAIN
  rain = weather.search(/rain/i);
  drizzle = weather.search(/drizzle/i);
  // SNOW
  snow = weather.search(/snow/i);
  flurries = weather.search(/flurries/i);
  // HAZE
  mist = weather.search(/mist/i);
  smoke = weather.search(/smoke/i);
  haze = weather.search(/haze/i);
  fog = weather.search(/fog/i);
  sand = weather.search(/sand/i);
  // THUNDERSTORMS
  thunder = weather.search(/thunder/i);

  let weather_icon = document.querySelectorAll(".weather-icon");

  if (cloud != -1) {
    weather_icon[count].classList.add("fa-cloud");
    return (weather = "Cloudy");
  } else if (sun != -1 || clear != -1) {
    weather_icon[count].classList.add("fa-sun");
    return (weather = "Sunny");
  } else if (rain != -1 || drizzle != -1) {
    weather_icon[count].classList.add("fa-cloud-showers-heavy");
    return (weather = "Rain");
  } else if (snow != -1 || flurries != -1) {
    weather_icon[count].classList.add("fa-snowflake");
    return (weather = "Snow");
  } else if (
    mist != -1 ||
    smoke != -1 ||
    haze != -1 ||
    fog != -1 ||
    sand != -1
  ) {
    weather_icon[count].classList.add("fa-smog");
    return (weather = "Hazy");
  } else if (thunder != -1) {
    weather_icon[count].classList.add("fa-bolt");
    return (weather = "T-Storms");
  } else {
    weather_icon[count].classList.add("fa-sun");
    return (weather = "Clear");
  }
}
