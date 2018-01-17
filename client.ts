declare let $: any;

$(document).ready(getWeather);

function getWeather()
{
    $.ajax({
        method: 'get',
        url: '/weather',
        success: (res: any) => {
            fetchWeatherData(JSON.parse(res));
        },
        error: (err: any) => {
            alert("der skete en fejl, prøv igen senere");
            console.log(err);
        }   
    })
}

function fetchWeatherData(data: any)
{
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (let i = 0; i < data.list.length; i++)
    {
        let elm = data.list[i];
        let date = new Date(elm.dt * 1000);
        if (date.getDay() === tomorrow.getDay()  && date.getMonth() == tomorrow.getMonth())
            $('#dates').append(`<li> ${elm.dt_txt} -  Temp: ${elm.main.temp} - Sky: ${elm.weather[0].description} - Wind-speed: ${elm.wind.speed}</li>`); // change 
    }
}
