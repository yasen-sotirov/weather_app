// REQUEST
const apiKey = "50bdc27d48eceb79c3e752c5ff529831";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // CHECK IF CORRECT CITY
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    // UPDATE INFO
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    // UPDATE IMG
    if (data.weather[0].main == "Clouds") weatherIcon.src = "images/clouds.png";
    else if (data.weather[0].main == "Clear")
      weatherIcon.src = "images/clear.png";
    else if (data.weather[0].main == "Rain")
      weatherIcon.src = "images/rain.png";
    else if (data.weather[0].main == "Drizzle")
      weatherIcon.src = "images/drizzle.png";
    else if (data.weather[0].main == "mist")
      weatherIcon.src = "images/mist.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
// GET INFO
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));

// btn enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") checkWeather(searchBox.value);
});
// btn Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    this.querySelector(".search-input").value = "";
  }
});
