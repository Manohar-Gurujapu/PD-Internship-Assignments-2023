// Get references to HTML elements
const locationInput = document.getElementById("locationInput");
const getForecastButton = document.getElementById("getForecastButton");
const weatherInfo = document.querySelector(".weather-info");


// Add a click event listener to the "Get Forecast" button
getForecastButton.addEventListener("click", function () {
    // Get the location input from the user
    const location = locationInput.value;

    const apiKey = 'b5114b84b994c49ac31cdf65681d1f4b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                displayWeatherInfo(data);
            } else {
                displayError("Weather Information not available for the specified city.");
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            displayError("Failed to fetch weather data. Please try again later.");
        });
});

// Function to display weather information
function displayWeatherInfo(data) {
    const locationName = document.getElementById("locationName");
    const temperature = document.getElementById("temperature");
    minTemp.textContent = `Min Temperature: ${data.main.temp_min}°C`;
    maxTemp.textContent = `Max Temperature: ${data.main.temp_max}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    locationName.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    weatherInfo.classList.add("active");
}


// Function to display error messages
function displayError(errorMessage) {
    const locationName = document.getElementById("locationName");
    const minTemp = document.getElementById("minTemp"); 
    const maxTemp = document.getElementById("maxTemp"); 
    const humidity = document.getElementById("humidity"); 
    locationName.textContent = errorMessage;
    temperature.textContent = ""; // Note: "temperature" is not defined in this scope
    minTemp.textContent = "";
    maxTemp.textContent = "";
    humidity.textContent = "";
}
