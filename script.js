const apikey = "358916222b4c08fa19277a48b164e5b1";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchButton = document.getElementById("searchButton");
const locationInput = document.getElementById("locationInput");

searchButton.addEventListener("click", () => {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    fetch(`${apiurl}${city}&appid=${apikey}`)
    .then(response => response.json())
    .then(data => {
            if (data.cod === 200) {
                updateWeatherInfo(data);
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

    locationElement.textContent = data.name;
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherIconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const weatherCondition = data.weather[0].main;
    const temperature = data.main.temp;
    const clothingSuggestions = getClothingSuggestions(data, weatherCondition, temperature);
    const transportationSuggestions = getTransportationSuggestions(data, weatherCondition);

    document.getElementById("clothingSuggestions").textContent = clothingSuggestions;
    document.getElementById("transportationSuggestions").textContent = transportationSuggestions;
}

// Add clothing advice based on weather condition
function getClothingSuggestions(data, weatherCondition, temperature) {
    let clothingAdviceText = "";

    if (temperature < 10) {
        clothingAdviceText = "Wear warm clothing, such as a coat, gloves, and a hat.";
    } else if (temperature < 20) {
        clothingAdviceText = "Wear light jacket or sweater, and consider bringing an umbrella.";
    } else if (temperature < 30) {
        clothingAdviceText = "Wear light and breathable clothing, such as a t-shirt and shorts.";
    } else {
        clothingAdviceText = "Wear light and loose clothing, and don't forget to stay hydrated.";
    }

    if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
        clothingAdviceText += " Don't forget to bring an umbrella or raincoat.";
    }

    if (weatherCondition === "Snow") {
        clothingAdviceText += " Wear warm and waterproof clothing, including a coat, gloves, and boots.";
    }

    return clothingAdviceText;
}

// Add transportation advice based on weather condition
function getTransportationSuggestions(data, weatherCondition) {
    let transportationSuggestions;

    switch (weatherCondition) {
        case "Clear":
            transportationSuggestions = "Consider walking, biking, or driving to your destination.";
            break;
        case "Clouds":
            transportationSuggestions = "Consider walking, biking, or driving to your destination.";
            break;
        case "Rain":
            transportationSuggestions = "Consider taking public transportation or driving to your destination with caution.";
            break;
        case "Snow":
            transportationSuggestions = "Consider taking public transportation or driving to your destination with winter tires and caution.";
            break;
        case "Thunderstorm":
            transportationSuggestions = "Avoid traveling if possible, and be careful of slippery roads and strong winds.";
            break;
        default:
            transportationSuggestions = "Unknown weather condition.";
    }

    return transportationSuggestions;
}