"use strict";
$(document).ready(getWeather);
function getWeather() {
    $.ajax({
        method: 'get',
        url: '/weather',
        success: function (res) {
            fetchWeatherData(JSON.parse(res));
        },
        error: function (err) {
            alert("der skete en fejl, prøv igen senere");
            console.log(err);
        }
    });
}
function fetchWeatherData(data) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    for (var i = 0; i < data.list.length; i++) {
        var elm = data.list[i];
        var date = new Date(elm.dt * 1000);
        if (date.getDay() === tomorrow.getDay() && date.getMonth() == tomorrow.getMonth() && date.getFullYear() == tomorrow.getFullYear())
            $('#dates').append("<li> " + date + " -  Temp: " + elm.main.temp + " - Sky: " + elm.weather[0].description + " - Wind-speed: " + elm.wind.speed + "</li>"); // change 
    }
}
