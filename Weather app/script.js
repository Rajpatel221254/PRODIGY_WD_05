const API_KEY = "3b51167452c55dc28877798c67da9d74"; // Your key

function displayWeather(data) {
  if (data.cod !== 200) {
    document.getElementById("status").textContent = "City not found.";
    return;
  }

  document.getElementById("status").textContent = "";
  document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `${data.main.temp}°C`;
  document.getElementById("condition").textContent = data.weather[0].description;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;
}

function fetchWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(() => {
      document.getElementById("status").textContent = "Error fetching weather.";
    });
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(() => {
      document.getElementById("status").textContent = "Error fetching weather.";
    });
}

document.getElementById("cityBtn").addEventListener("click", getWeatherByCity);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetchWeather(pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      document.getElementById("status").textContent = "Location blocked. Enter city.";
    }
  );
} else {
  document.getElementById("status").textContent = "Geolocation not supported. Enter city.";
}
