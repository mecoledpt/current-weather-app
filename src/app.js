//Formats current date (month, day, year)
function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
}
//formats current time (hours, minutes)
function formatTime(currentTime) {
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (currentTime.getHours() > 12) {
    return `Last updated at ${
      currentTime.getHours() - 12
    }:${currentMinutes} PM`;
  } else {
    return `Last updated at ${currentTime.getHours()}:${currentMinutes} AM`;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Weds", "Thu", "Fri", "Sat"];
  return days[day];
}

let currentDate = document.getElementById("current-date");
currentDate.innerHTML = formatDate(new Date());
console.log(formatDate(new Date()));

let currentTime = document.querySelector("#curr-time");
currentTime.innerHTML = formatTime(new Date());

//search engine on submitting city name
function submitHandler(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name-input");
  let cityName = cityInput.value.trim();
  getCityWeather(cityName);
}
//API call for current weather
function getCityWeather(cityName) {
  let city = cityName.trim();
  let apiKey = "e7404fca7e5b62ae35774a01b0feeac1";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
//converts wind degrees to compass direction
function windDirCompass(degrees) {
  let val = Math.floor(degrees / 22.5 + 0.5);
  let dirArr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return dirArr[val % 16];
}
//updates HTML elements to show weather response from API
function showWeather(response) {
  console.log(response);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;

  let currTemp = document.getElementById("current-temp");
  currTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;

  let feelsLike = document.getElementById("feels-like-temp");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  feelsLike.classList.add("bold");

  let currCond = document.getElementById("current-cond");
  currCond.innerHTML = `${response.data.weather[0].main}`;
  currCond.classList.add("bold");

  let currHumidity = document.getElementById("current-humidity");
  currHumidity.innerHTML = `${response.data.main.humidity}%`;
  currHumidity.classList.add("bold");

  let currWindDir = document.getElementById("current-wind-dir");
  currWindDir.innerHTML = `${windDirCompass(response.data.wind.deg)}`;
  currWindDir.classList.add("bold");

  let currWindSpeed = document.getElementById("current-wind-speed");
  currWindSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  currWindSpeed.classList.add("bold");

  let currentConditionIcon = document.querySelector("#cond-icon");
  let conditionId = response.data.weather[0].id;
  let time = response.data.dt;
  let sunset = response.data.sys.sunset;
  let sunrise = response.data.sys.sunrise;
  currentConditionIcon.setAttribute(
    "class",
    `${weatherIcon(conditionId, time, sunset, sunrise)}`
  );

  backgroundChange(time, sunrise, sunset);
  getForecast(response.data.coord);
}
//determines what weather icon to link to based on API response
function weatherIcon(conditionId, time, sunset, sunrise) {
  let weatherCode = conditionId;
  let iconClass = "";
  if (weatherCode >= 200 && weatherCode <= 232) {
    iconClass = "bi bi-cloud-lightning-rain-fill";
  } else if (weatherCode >= 300 && weatherCode <= 321) {
    iconClass = "bi bi-cloud-drizzle-fill";
  } else if (
    weatherCode === 500 ||
    weatherCode === 501 ||
    weatherCode === 520 ||
    weatherCode === 521 ||
    weatherCode === 531
  ) {
    iconClass = "bi bi-cloud-rain-fill";
  } else if (
    weatherCode === 502 ||
    weatherCode === 503 ||
    weatherCode === 504 ||
    weatherCode === 522
  ) {
    iconClass = "bi bi-cloud-rain-heavy-fill";
  } else if (
    weatherCode === 511 ||
    weatherCode === 611 ||
    weatherCode === 612 ||
    weatherCode === 613 ||
    weatherCode === 615 ||
    weatherCode === 616
  ) {
    iconClass = "bi bi-cloud-sleet-fill";
  } else if (
    weatherCode === 600 ||
    weatherCode === 601 ||
    weatherCode === 602 ||
    weatherCode === 620 ||
    weatherCode === 621 ||
    weatherCode === 622
  ) {
    iconClass = "bi bi-cloud-snow-fill";
  } else if (weatherCode === 701 || weatherCode === 741) {
    iconClass = "bi bi-cloud-fog-fill";
  } else if (
    weatherCode === 711 ||
    weatherCode === 731 ||
    weatherCode === 751 ||
    weatherCode === 761 ||
    weatherCode === 762
  ) {
    iconClass = "bi bi-cloud-haze-fill";
  } else if (weatherCode === 721) {
    iconClass = "bi bi-cloud-haze-1-fill";
  } else if (weatherCode === 771) {
    iconClass = "bi bi-cloud-fog-2-fill";
  } else if (weatherCode === 781) {
    iconClass = "bi bi-tornado";
  } else if (weatherCode === 801 && time >= sunrise && time <= sunset) {
    iconClass = "bi bi-cloud-sun-fill";
  } else if (weatherCode === 801 && time < sunrise && time >= sunset) {
    iconClass = "bi bi-cloud-fill";
  } else if (weatherCode === 802) {
    iconClass = "bi bi-cloud-fill";
  } else if (weatherCode === 803 || weatherCode === 804) {
    iconClass = "bi bi-clouds-fill";
  } else if (weatherCode === 800 && time >= sunrise && time <= sunset) {
    iconClass = "bi bi-sun-fill";
  } else if (weatherCode === 800 && time < sunrise && time >= sunset) {
    iconClass = "bi bi-moon-stars-fill";
  }
  return iconClass;
}

//Converts fahrenheit temperature to celcius, disables converting to C again
function tempConvertCelcius(event) {
  event.preventDefault();
  let currTemp = document.getElementById("current-temp");
  let currTempNum = parseInt(currTemp.textContent, 10);
  let tempCelcius = Math.round((currTempNum - 32) * (5 / 9));
  currTemp.innerHTML = `${tempCelcius}°`;

  let fahrenheitLink = document.querySelector("a#fahrenheit-link");
  fahrenheitLink.classList.remove("inactive");
  fahrenheitLink.addEventListener("click", tempConvertFahrenheit);

  let celciusLink = document.querySelector("a#celcius-link");
  celciusLink.classList.add("inactive");
  celciusLink.removeEventListener("click", tempConvertCelcius);
}
let celciusLink = document.querySelector("a#celcius-link");
celciusLink.addEventListener("click", tempConvertCelcius);

//converts celcius temperature back to fahrenheit, disables converting to F again
function tempConvertFahrenheit(event) {
  event.preventDefault();
  let currTemp = document.getElementById("current-temp");
  let currTempNum = parseInt(currTemp.textContent, 10);
  let tempFahrenheit = Math.round((currTempNum * 9) / 5 + 32);
  currTemp.innerHTML = `${tempFahrenheit}°`;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("inactive");
  fahrenheitLink.removeEventListener("click", tempConvertFahrenheit);

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.classList.add("inactive");
  celciusLink.addEventListener("click", tempConvertCelcius);
}
//displays light theme if after sunrise and before sunset, dark theme if after sunset and before sunrise
function backgroundChange(time, sunrise, sunset) {
  let body = document.querySelector("body");

  if (time >= sunrise + 1000 && time <= sunset - 1000) {
    body.setAttribute("class", "light");
  } else if (time >= sunrise - 1000 && time < sunrise + 1000) {
    body.setAttribute("class", "sun");
  } else if (time > sunset - 1000 && time <= sunset + 1000) {
    body.setAttribute("class", "sun");
  } else {
    body.removeAttribute("class");
  }
  console.log(body.classList);
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let long = coordinates.lon;
  let apiKey = "e7404fca7e5b62ae35774a01b0feeac1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

//updates HTML to create elements based on an array of days
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.getElementById("forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, i) {
    if (i < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="forecast-card col-sm g-1 p-3 shadow m-3 mx-auto">
    <div class="forecast-day bold">${formatDay(forecastDay.dt)}</div>
    <div class="forecast-icon"><i class="${weatherIcon(
      forecastDay.weather[0].id,
      forecastDay.dt,
      forecastDay.sunset,
      forecastDay.sunrise
    )}"></i></div>

    <div class="forecast-temperature">
      <i class="bi bi-thermometer-half"></i>
      <span class="forecast-temperature-high bold">${Math.round(
        forecastDay.temp.max
      )}°</span> /
      <span class="forecast-temperature-low">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
    <div class="forecast-precipitation">
      <i class="bi bi-umbrella-fill"></i> ${forecastDay.pop * 100}%
    </div>
  </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

//Default API call of "New York"
getCityWeather("New York");
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", submitHandler);
