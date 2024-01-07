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
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      displayData(data, city, state, country);
    });
}

function displayData(data, city, state, country) {
    if (data.length === 0) {
        $("#forecast").html("<h3>No Weather Information Found</h3>");
        return;
    }

    // Current weather
    var currentWeather = data.list[0];
    var currentTemp = currentWeather.main.temp;
    var currentHumidity = currentWeather.main.humidity;
    var currentWind = currentWeather.wind.speed;

    // Round temperature to nearest whole number
    currentTemp = Math.round(currentTemp);

    // Clear previous weather data
    $("#forecast-current").empty();
    $("#forecast-5day").empty();

    // Append and show weather data on page
    $("#forecast-current").append(`<p>Temperature: ${currentTemp}°C</p>`);
    $("#forecast-current").append(`<p>Humidity: ${currentHumidity}%</p>`);
    $("#forecast-current").append(`<p>Wind Speed: ${currentWind} km/h</p>`);
    
    // Append and show the 5 day forecast on page
    $("#forecast-5day").append(`<h3>5-Day Forecast</h3>`);
    
    // Append data list items 1-6 to #forecast-5day
    for (var i = 1; i <= 6; i++) {
        var forecastWeather = data.list[i];
        var forecastTemp = forecastWeather.main.temp;
        var forecastHumidity = forecastWeather.main.humidity;
        var forecastWind = forecastWeather.wind.speed;
        forecastTemp = Math.round(forecastTemp);
        $("#forecast-5day").append(`<p>Day ${i} - Temperature: ${forecastTemp}°C, Humidity: ${forecastHumidity}%, Wind Speed: ${forecastWind} km/h</p>`);
    }
}

// Event listener for search button
$(".btn").on("click", function (event) {
  event.preventDefault();
  var location = $("#city").val();
  getWeather(location);
});
