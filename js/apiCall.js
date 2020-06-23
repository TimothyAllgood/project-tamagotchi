const apiKey = 'c88446589340e6dbc0a34a6d02703918'
const url = `https://api.openweathermap.org/data/2.5/weather?q=Covington,us&appid=${apiKey}`;

// https://openweathermap.org/weather-conditions

const apiCall = async()=> {
    let response = await (await fetch(url)).json();
    let currentWeather = response.weather[0].main;
    console.log(currentWeather);
}

apiCall();