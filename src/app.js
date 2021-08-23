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
  let city = cityName.replace(", ", ",").trim();
  let apiKey = "e7404fca7e5b62ae35774a01b0feeac1";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
