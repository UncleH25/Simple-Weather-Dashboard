//Simple Weather Dashboard

// Global Variables
const locationForm = document.querySelector(".location-form");
const locationInput = document.querySelector(".location-input");
const weatherSection = document.querySelector(".weather-info");
//API Key
const apiKey = config.apiKey;

//Location Search Event
locationForm.addEventListener("submit", async event => 
{
    //Prevent the page from refreshing
    event.preventDefault();
    
    //Get the location input value
    const location = locationInput.value;

    //If the location value is true
    if (location) 
    {
        //Try to get the weather data
        try
        {
            //Fetch the weather data from the API
            const weatherData = await getWeatherData(location);
            //Call the function to display the weather data
            displayWeatherInfo(weatherData);

        }//Catch any errors
        catch (error) 
        {
            console.error("Error fetching weather data:", error);
            //Display an error message
            displayErrorMessage("Unable to fetch weather data. Please try again later.", error);
        }
    } 
    else 
    {
        displayErrorMessage("Please enter a location.");
    } 
});

//Get Weather Data
async function getWeatherData(location) 
{
    //API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    //Response from the API
    const response = await fetch(apiUrl);

    //Check if the response is ok
    console.log(response);

    //If the response is not ok, throw an error
    if (!response.ok)
    {
        //If not ok, throw an error
        throw new Error("Network response was not ok");
    }

    //Parse the response as JSON
    //If the response is ok, return the JSON data
    return await response.json();
}

//Display Weather Info
function displayWeatherInfo(weatherData) 
{
    //Display the data retrieved from the API
    console.log(weatherData);

    //Object destructuring to get the data
    const 
    {
        name: location,
        main: { temp: temperature, humidity },
        wind: { speed: windSpeed },
        weather: [{ main: weatherCondition, description, id }],
        sys: { country, sunrise, sunset }
    } = weatherData;

    //Clear any existing content in the section
    weatherSection.innerHTML = "";
    //Make the section visible
    weatherSection.style.display = "block";

    //Display the data in the section
    //Location
    const locationElement = document.createElement("h2");
    locationElement.textContent = location;
    locationElement.classList.add("location");
    weatherSection.appendChild(locationElement);

    //Temperature
    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    temperatureElement.classList.add("temperature");
    weatherSection.appendChild(temperatureElement);

    //Humidity
    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${humidity}%`;
    humidityElement.classList.add("humidity");
    weatherSection.appendChild(humidityElement);

    //Wind Speed
    const windSpeedElement = document.createElement("p");
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    windSpeedElement.classList.add("wind-speed");
    weatherSection.appendChild(windSpeedElement);

    //Weather Condition
    const weatherConditionElement = document.createElement("p");
    weatherConditionElement.textContent = `Weather Condition: ${weatherCondition}`;
    weatherConditionElement.classList.add("weather-condition");
    weatherSection.appendChild(weatherConditionElement);

    //Weather Description
    const weatherDescriptionElement = document.createElement("p");
    weatherDescriptionElement.textContent = `Description: ${description}`;
    weatherDescriptionElement.classList.add("weather-description");
    weatherSection.appendChild(weatherDescriptionElement);

    //Sunrise
    const sunriseElement = document.createElement("p");
    const sunriseDate = new Date(sunrise * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
    sunriseElement.classList.add("sunrise");
    weatherSection.appendChild(sunriseElement);

    //Sunset
    const sunsetElement = document.createElement("p");
    const sunsetDate = new Date(sunset * 1000);
    const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunsetElement.textContent = `Sunset: ${sunsetTime}`;
    sunsetElement.classList.add("sunset");
    weatherSection.appendChild(sunsetElement);

    //Weather Icon
    const weatherIconElement = document.createElement("img");
    weatherIconElement.textContent = getWeatherIcon(id);
    weatherIconElement.classList.add("weather-icon");
    weatherSection.appendChild(weatherIconElement);
}

//Get Weather Icon
function getWeatherIcon(iconCode) 
{
    //Switch case to get the icon based on the weather condition
    switch (true) {
        case (iconCode >= 200 && iconCode < 300):
            return "⛈️";
        case (iconCode >= 300 && iconCode < 400):
            return "🌦️";
        case (iconCode >= 500 && iconCode < 600):
            return "🌧️";
        case (iconCode >= 600 && iconCode < 700):
            return "❄️";
        case (iconCode >= 700 && iconCode < 800):
            return "🌫️"; 
        case (iconCode === 800):
            return "☀️";   
        case (iconCode > 801 && iconCode < 810):
            return "🌥️";
        default:
            return "❓";
}

//Display Error Message
function displayErrorMessage(errorMessage) 
{
    //Clear any existing content in the section
    weatherSection.innerHTML = "";

    //Create a paragraph element for the error message
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = errorMessage;

    //Add a class for styling (optional)
    errorParagraph.classList.add("error-message");

    //Append the error message to the section
    weatherSection.appendChild(errorParagraph);

    //Make the section visible
    weatherSection.style.display = "block";

    //Remove the error message after 5 seconds
    setTimeout(() => {
        weatherSection.style.display = "none";
    }, 2000);
}