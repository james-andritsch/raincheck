var apiKey = '33f6cad16858e755388f2b3c7bab082f'
var storedLocation = JSON.parse(localstorage.getItem('city')) || [];

$(document).ready(function() {
    $('#searchButton').on('click', function(){
        var searchValue = $('#searchBar').val();

        console.log(searchValue)
        getCoord(searchValue);
        saveSearch(searchValue)
    });

    $('#previousSearch').on('click', 'li', function() {
        searchWeather($(this).text());
    });

    // to save search in local storage
    function saveSearch (searchValue) {
        storedCity.push(searchValue);
        localStorage.setItem('city', JSON.stringify(storedCity));
    }

    document.getElementById('previous').addEventListener('click', function (event) {
        var city = event.target.innerText;
        document.getElementById('currentInformation').innerHTML = '';
        searchValue(city)
    });

    // previous list
    function createRow(text) {
        var li = $('<button>').addClass('list-group-item list-group-item-action').text(text);
        $('#previous').append(li);
    }

    // reloads page using ajax
    function getCoord(searchValue) {
        $.ajax({
            type: "GET",
            url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&appid' + apiKey
        }) .then (data => {console.log(data[0])
        createRow(searchValue)
        searchWeather (data [0].lat, data[0].lon)
        futureWeather (data [0].lat, data[0].lon)
        })
    }

    // current weather ajax
    function searchWeather (lat, lon) {
        $.ajax({
            type: "GET",
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=daily, hourly, minutely' + '&appid=' + apiKey + '&units=imperial'
        }) .then(data => {console.log(data)

        var currentConditions = doucment.getElementById('currentInformation');
        currentConditions.innerHTML = '';
        document.getElementById('city').textContent = city + '' + date;
        var date = moment().format('MMM Do YYYY');
        var temp = data.current.temp;
        var humidity = data.current.humidity;
        var wind = data.current.wind_speed;
        var uvi = data.current.uvi;
        var icon = data.current.weather[0];

        var temporaryList = document.createElement('li');
        temporaryList.textContent = "Temperature: " + temp + "°F";
        currentConditions.appendChild(temporaryList);

        var windMPH = document.createElement('li');
        windMPH.textContent = "Wind Speed: " + wind + "MPH";
        currentConditions.appendChild(windMPH);

        var humid = document.createElement('li');
        humid.textContent = "Humidity: " + humidity + "%";
        currentConditions.appendChild(humid);

        var UVIndex = document.createElement('li');
        UVIndex.textContent = "UV Index: " + uvi;
        if (uvi < 3) {
            UVIndex.style.backgroundColor = 'green';
        } else if (uvi < 6) {
            UVIndex.style.backgroundColor = 'yellow';
        } else if (uvi < 8) {
            UVIndex.style.backgroundColor = 'orange';
        } else if (uvi < 11) {
            UVIndex.style.backgroundColor = 'red';
            test.style.color = 'white'
        }
        currentConditions.appendChild(UVIndex);
        });
    };

})