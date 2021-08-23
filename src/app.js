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
  let searchInput = document.getElementById("city-name-input");
  city = searchInput.value.trim();
  if (city) {
    let cityName = document.getElementById("city-name");
    cityName.innerHTML = `${searchInput.value}`;
  }
  return city;
}
let citySearch = document.getElementById("city-search");
citySearch.addEventListener("submit", submitHandler);

console.log(searchCity());
