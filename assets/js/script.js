var apiKey = "212a8df47dedd91589c2cf1f029cf330";
var searchedCityName = document.querySelector('#searched-city-name');
// current day API call w/ imperial units

// One Call Time Machine API Call also w/ imperial units, but excluding minutely, hourly, alerts
// var octmaUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
// fetch(queryUrl);
var searchBtn = $('#search-btn');






function getCurrentCity(e) {
    var currentDate = moment().format("M/DD/YYYY");
    e.preventDefault();
    var cityName = searchedCityName.value;
    var currentName = $('#current-name');
    fetchForecast(cityName);
    currentName.text(`${cityName} (${currentDate})`);
    currentName.append(`<img id="icon-link">`);
    $("#current-name").removeClass("hidden");
    

    // return searchedCityName;
}



function fetchForecast(cityName) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    var fetchCurrentData = {
        "url": queryUrl,
        "method": "GET",
        "timeout": 0,
    }
    $.ajax(fetchCurrentData).done(function (response) {
    console.log(response);
    console.log(response.weather[0].icon);
    console.log(response.main.temp);
    var iconID = response.weather[0].icon;
    var iconX = `http://openweathermap.org/img/w/${iconID}.png`
    var iconLink = $('#icon-link');
    iconLink.attr('src', iconX);
    var currentBox = $('#current-box');
    var currentTemp = response.main.temp;
    var currentWind = response.wind.speed;
    var currentHumidity = response.main.humidity;
    currentBox.append(`<p>
    Temp: ${currentTemp}
    </p>
    <br>
    <p>
    Wind: ${currentWind}
    </p>
    <br>
    <p>
    Humidity: ${currentHumidity}%
    </p>
    <br>
    `);
    });

    /*
    {
        "url": queryUrl,
        "method": "GET",
        "timeout": 0,
    }
    */
};



/*
loginEl.on("click", FUNCTIONNAME);

function logIn() {
    event.preventDefault();
    let usernameEl = document.querySelector()
}
*/



searchBtn.on("click", getCurrentCity);
/*
One Call API does it all, so I will use the current weather data call to 
retrieve the lat and lon of that inputted city to then input into the One
Call Time Machine API call

input the user's entered city into the api call stored as 'cityName'
send api call and retrieve the data using fetch method

and that does....:
    Gives me data, but I only care about: coord.lat and coord.lon to send to One Call
    API call

I then use that OCA call to retrieve this data:
    * Current Day: city name(USER INPUT --> first letter capitalized), date,
                   current.weather.icon, current.temp (temp:74.01*F),
                   current.wind_speed (wind:6.67mph), current.humidity (humidity: 46%),
                   current.uvi (formatted so that it is white text inside
                   green rounded box)
    * 5-Day Forecast: date, 


1.  HTML/CSS setup: displays weather dashboard
2.  set up in JS the search box (var cityName)
3.  Function that retrieves the specific data
    for current weather & city is added to
    search history (local storage)
4.  Current weather conditions: city name, the
    date, an icon representation of weather
    conditions, the temperature, the humidity,
    the wind speed, and the UV index
5.  4
6.  UV index color (gr, r, y) indicating that
    the conditions are favorable, moderate, or
    severe
7.  6
8.  Function that retrieves the specific data
    for the next 5 days: date, an icon
    representation of weather conditions, the
    temperature, the wind speed, and the
    humidity
9.  8
10: When clicking on a city in the serach
    history, it will again present user with
    current and future predictions for that
    city




I need to find the exceptions key thing
*/