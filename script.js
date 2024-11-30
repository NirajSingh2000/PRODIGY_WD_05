// script.js

// API key from OpenWeatherMap (replace with your own key)
const apiKey = 'c3a2893d35feac49b7dffcf0fbf75b09';

// Elements
const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Fetch weather data for a given location
function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert('City not found!');
                return;
            }

            // Display the weather information
            cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            weather.textContent = `Weather: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => console.log('Error fetching weather data: ', error));
}

// Get weather for user-input location
getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a city name');
    }
});

// Get weather based on geolocation (optional)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
                temperature.textContent = `Temperature: ${data.main.temp}°C`;
                weather.textContent = `Weather: ${data.weather[0].description}`;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            })
            .catch(error => console.log('Error fetching weather data: ', error));
    });
} else {
    alert('Geolocation is not supported by this browser.');
}
