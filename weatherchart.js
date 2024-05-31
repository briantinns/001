const apikey = "358916222b4c08fa19277a48b164e5b1";
const apiurl = "https://openweathermap.org/forecast5";

const searchButton = document.getElementById("searchButton");
const locationInput = document.getElementById("locationInput");

searchButton.addEventListener("click", () => {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeather(city);
        fetchWeatherNews(city);
    }
});

function fetchWeather(city) {
    fetch(`${apiurl}q=${city}&apiKey=${apikey}`)
   .then(response => response.json())
   .then(data => {
            if (data.status === "ok") {
                updateWeatherInfo(data.articles[0]);
            } else {
                alert("City not found. Please try again.");
            }
        })
   .catch(error => console.error('Error fetching weather data:', error));
}

function updateWeatherInfo(data) {
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("windSpeed");
    const weatherIconElement = document.querySelector(".weather-icon");

    locationElement.textContent = data.title;
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherIconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

function fetchWeatherNews(city) {
    fetch(`${apiurl}q=${city}&apiKey=${apikey}`)
   .then(response => response.json())
   .then(data => {
            if (data.status === "ok") {
                updateWeatherNewsArticles(data.articles);
            } else {
                alert("City not found. Please try again.");
            }
        })
   .catch(error => console.error('Error fetching weather news data:', error));
}

function updateWeatherNewsArticles(articles) {
    const weatherNewsArticlesElement = document.getElementById("weatherNewsArticles");

    articles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("weather-news-article");

        const titleElement = document.createElement("h3");
        titleElement.textContent = article.title;
        articleElement.appendChild(titleElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = article.description;
        articleElement.appendChild(descriptionElement);

        const urlElement = document.createElement("a");
        urlElement.href = article.url;
        urlElement.textContent = "Read more";
        articleElement.appendChild(urlElement);

        weatherNewsArticlesElement.appendChild(articleElement);
    });
}