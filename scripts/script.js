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
    
}

//Get Weather Icon
function getWeatherIcon(iconCode) 
{
    
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