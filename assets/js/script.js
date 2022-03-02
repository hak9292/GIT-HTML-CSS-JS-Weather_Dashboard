var apiKey = "212a8df47dedd91589c2cf1f029cf330";
var searchedCityName = document.querySelector('#searched-city-name');
// current day API call w/ imperial units

// One Call Time Machine API Call also w/ imperial units, but excluding minutely, hourly, alerts
// var octmaUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
// fetch(queryUrl);
var searchBtn = $('#search-btn');






function getCurrentCity(e) {
    var cityName = searchedCityName.value;
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    var fetchCurrentData = {
        "url": queryUrl,
        "method": "GET",
        "timeout": 0,
    }
    $.ajax(fetchCurrentData).done(function (response) {
        currentEpoch = response.dt;
        var currDate = new Date(currentEpoch * 1000);
        var currentDate = currDate.toLocaleDateString();
        e.preventDefault();
        var cityName = searchedCityName.value;
        var currentName = $('#current-name');
        fetchForecast(cityName);
        currentName.text(`${cityName} (${currentDate})`);
        currentName.append(`<img id="icon-link">`);
        $("#current-name").removeClass("hidden");
        fetch5Day(e);
    });



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
        var currentLon = response.coord.lon;
        var currentLat = response.coord.lat;
        fetch5Day(currentLon, currentLat);

    });

    /*
    {
        "url": queryUrl,
        "method": "GET",
        "timeout": 0,
    }
    */
};
function fetch5Day(currentLon, currentLat) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
    var fetchCurrentData = {
        "url": queryUrl,
        "method": "GET",
        "timeout": 0,
    }
    $.ajax(fetchCurrentData).done(function (response) {
        // console.log(response);
        // console.log(response.weather[0].icon);
        // console.log(response.main.temp);
        var fiveDayEl = $("#fiveDay");
        fiveDayEl.text("5-Day Forecast:");
        for (i = 0; i < 5; i ++) {
            j = i + 1;
            var tm = response.daily[j].dt;
            var tmDate = new Date(tm * 1000).toLocaleDateString();
            var tmIcon = response.daily[j].weather[0].icon;
            console.log(tmIcon);
            var tmIconX = `http://openweathermap.org/img/w/${tmIcon}.png`
            var tmIconLink = $(`#tm${j}-icon-link`);
            tmIconLink.attr('src', tmIconX);
            var tmTemp = response.daily[j].temp.day;
            var tmWind = response.daily[j].wind_speed;
            var tmHumidity = response.daily[j].humidity;
            var tmEl = $(`#tm${j}`);

            tmEl.append(`<h5>
        ${tmDate}

    <img id="tm${j}-icon-link">
    </h5>
    <p>
        Temp: ${tmTemp}\u00B0F
    </p>
    <p>
        Wind: ${tmWind} MPH
    </p>
    <p>
        Humidity: ${tmHumidity}%
    </p>`)
    var tmIconLink = $(`#tm${j}-icon-link`);
    tmIconLink.attr('src', tmIconX);
            // var tm1 = response.daily[2].dt;
            // var tm1Date = new Date(tm * 1000).toLocaleDateString();
            // var tm2 = response.daily[3].dt;
            // var tm2Date = new Date(tm * 1000).toLocaleDateString();
            // var tm3 = response.daily[4].dt;
            // var tm3Date = new Date(tm * 1000).toLocaleDateString();
            // var tm4 = response.daily[5].dt;
            // var tm4Date = new Date(tm * 1000).toLocaleDateString();
        }
        // 01/10/2020, 10:35:02
        // var iconX = `http://openweathermap.org/img/w/${iconID}.png`
        // var iconLink = $('#icon-link');
        // iconLink.attr('src', iconX);
        // var currentBox = $('#current-box');
        // var currentTemp = response.main.temp;
        // var currentWind = response.wind.speed;
        // var currentHumidity = response.main.humidity;
        // currentBox.append(`<p>
        // Temp: ${currentTemp}
        // </p>
        // <br>
        // <p>
        // Wind: ${currentWind}
        // </p>
        // <br>
        // <p>
        // Humidity: ${currentHumidity}%
        // </p>
        // <br>
        // `);
        // var currentLon = response.coord.lon;
        // var currentLat = response.coord.lat;
        // fetch5Day(currentLon, currentLat);

    });
}


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