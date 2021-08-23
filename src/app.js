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
let currentDate = document.getElementById("current-date");
currentDate.innerHTML = formatDate(new Date());
console.log(formatDate(new Date()));

let currentTime = document.querySelector("#curr-time");
currentTime.innerHTML = formatTime(new Date());

function submitHandler(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-input");
  let cityName = document.querySelector("#city-name");
  if (cityName.innerHTML === null) {
    alert("Please enter a city");
  } else {
    cityName = cityInput.value.trim();
    getCityWeather(cityName);
  }
}
function getCityWeather(cityName) {
  let city = cityName.trim();
  let apiKey = "e7404fca7e5b62ae35774a01b0feeac1";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
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

function showWeather(response) {
  console.log(response);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;

  let currTemp = document.getElementById("current-temp");
  currTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;

  let feelsLike = document.getElementById("feels-like-temp");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°`;

  let currCond = document.getElementById("current-cond");
  currCond.innerHTML = `${response.data.weather[0].main}`;

  let currHumidity = document.getElementById("current-humidity");
  currHumidity.innerHTML = `${response.data.main.humidity}%`;

  let currWindDir = document.getElementById("current-wind-dir");
  currWindDir.innerHTML = `${windDirCompass(response.data.wind.deg)}`;

  let currWindSpeed = document.getElementById("current-wind-speed");
  currWindSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  showWeatherIcon(response);
}

function showWeatherIcon(response) {
  let currentConditionIcon = document.querySelector("#cond-icon");
  let weatherCode = response.data.weather[0].id;
  let iconCode = "";
  if (weatherCode >= 200 && weatherCode <= 232) {
    iconCode = "11d";
  } else if (weatherCode >= 300 && weatherCode <= 321) {
    iconCode = "09d";
  } else if (weatherCode >= 500 && weatherCode <= 531) {
    iconCode = "10d";
  } else if (weatherCode >= 600 && weatherCode <= 622) {
    iconCode = "13d";
  } else if (weatherCode >= 701 && weatherCode <= 781) {
    iconCode = "50d";
  } else if (weatherCode === 801) {
    iconCode = "02d";
  } else if (weatherCode === 802) {
    iconCode = "03d";
  } else if (weatherCode === 803 || weatherCode === 804) {
    iconCode = "04d";
  } else if (weatherCode === 800) {
    iconCode = "01d";
  }
  let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  currentConditionIcon.innerHTML = `<img src = "${iconURL}" alt="Weather Icon">`;
}

getCityWeather("New York");
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", submitHandler);
