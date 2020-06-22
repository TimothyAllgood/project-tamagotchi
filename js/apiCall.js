const apiCall = async()=> {
    let response = await (await fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c88446589340e6dbc0a34a6d02703918')).json();
    let currentWeather = response.weather[0].main;
    console.log(currentWeather);
}

apiCall();