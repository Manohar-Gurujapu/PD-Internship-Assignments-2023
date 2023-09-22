// Get references to HTML elements
const locationInput = document.getElementById("locationInput");
const getForecastButton = document.getElementById("getForecastButton");
const weatherInfo = document.querySelector(".weather-info");

// Add a click event listener to the "Get Forecast" button
getForecastButton.addEventListener("click", function () {
    // Get the location input from the user
    const location = locationInput.value;

    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'b5114b84b994c49ac31cdf65681d1f4b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Check if the API response code indicates success (200)
            if (data.cod === 200) {
                // Call the displayWeatherInfo function to display weather data
                displayWeatherInfo(data);
            } else {
                // Call the displayError function to display an error message
                displayError("Weather Information not available for the specified city.");
            }
        })
        .catch((error) => {
            // Handle and log any errors that occur during the API request
            console.error("Error fetching weather data:", error);
            // Call the displayError function to display a generic error message
            displayError("Failed to fetch weather data. Please try again later.");
        });
});

// Function to display weather information
function displayWeatherInfo(data) {
    // Get references to HTML elements
    const locationName = document.getElementById("locationName");
    const temperature = document.getElementById("temperature");

    // Update the location name and temperature on the page with data from the API
    locationName.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;

    // Add the "active" class to the weatherInfo element to make it visible
    weatherInfo.classList.add("active");
}

// Function to display error messages
function displayError(errorMessage) {
    // Get a reference to the locationName element
    const locationName = document.getElementById("locationName");
    
    // Update the locationName element with the error message
    locationName.textContent = errorMessage;

    // Clear the temperature element
    temperature.textContent = ""; // Note: "temperature" is not defined in this scope
}
