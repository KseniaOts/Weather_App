let now = new Date();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
daytime.innerHTML = `${day} ${currentHours}:${currentMin}`;

let form = document.querySelector(`.weathersearch`);
form.addEventListener("submit", handleSubmit);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let tempCel = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${tempCel}`;
  let humid = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = `Humidity: ${humid}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind: ${wind} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;
}

function searchCity(cityName) {
  let apiKey = "1be85983e26932dcdad5b28a3c894628";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#paris").value;
  searchCity(cityName);
}

function displayFareinheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
searchCity("London");
let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFareinheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
