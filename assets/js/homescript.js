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
      displayData(data);
      // Save to local storage
      localStorage.setItem("lastData", JSON.stringify(data));
    });
}

function displayData(data) {
  if (data.length === 0) {
    $("#forecast").html("<h3>No Weather Information Found</h3>");
    return;
  }
  // Get current day from DayJS
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  // Get city name
  var city = data.city.name;
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
$("#forecast-current").append(`
    <h3>Current Weather for ${city}</h3>
    <div class="card border border-black col-auto p-2">
            <h4 style="text-decoration: underline;">${currentDay}</h4>
            <p>Temperature: ${currentTemp}°C</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p>Wind Speed: ${currentWind} km/h</p>
    </div>
`);

// Append and show the 5 day forecast on page
$("#forecast-5day").append(`<h3>5-Day Forecast</h3>`);

// Append data list items 1-6 to #forecast-5day
for (var i = 1; i <= 6; i++) {
    var forecastWeather = data.list[i];
    var forecastTemp = forecastWeather.main.temp;
    var forecastHumidity = forecastWeather.main.humidity;
    var forecastWind = forecastWeather.wind.speed;
    forecastTemp = Math.round(forecastTemp); // Round temperature to nearest whole number
    var forecastDay = dayjs().add(i, 'day').format("dddd, D"); // Get the day for each forecast item
    $("#forecast-5day").append(`
            <div class="card border border-black col-auto p-2 mb-1">
                            <h4 style="text-decoration: underline;">${forecastDay}</h4>
                            <p>Temperature: ${forecastTemp}°C</p>
                            <p>Humidity: ${forecastHumidity}%</p>
                            <p>Wind Speed: ${forecastWind} km/h</p>
            </div>
    `);
}
}

// Event listener for search button
$(".btn").on("click", function (event) {
  event.preventDefault();
  var location = $("#city").val();
  getWeather(location);
});

// Check if there is data saved in local storage
var lastData = JSON.parse(localStorage.getItem("lastData"));

// If there is data saved in local storage, display it
if (lastData) {
  displayData(lastData);
}
