// API Key (Yes I know this is unsecure)
const apiKey = "97ab71ad2c3f100f5a1a5488ddb347bd";

// Function to get the current weather
function getWeather(location) {
    // Split city into city, state, and country variables
    var citySplit = location.split(",");
    var city = citySplit[0];
    var state = citySplit[1];
    var country = citySplit[2];
    console.log(city, state, country);

    // Get the weather forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${apiKey}&units=metric`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

var city = window.prompt("Enter a city, state, and country code (separated by commas):");
currentWeather = getWeather(city);