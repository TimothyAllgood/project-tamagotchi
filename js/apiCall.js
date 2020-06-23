const apiKey = 'c88446589340e6dbc0a34a6d02703918'
let city = 'Covington';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`;

const cityInput = document.querySelector('.city');

const apiGameBtn = document.querySelector('#settings-contain button');

apiGameBtn.addEventListener('click', apiStartGame);

window.addEventListener('keydown', apiPressEnter);

// https://openweathermap.org/weather-conditions

function apiStartGame(){
    city = cityInput.value.replace(/\s/g, '+').toLowerCase() || 'Covington';
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`;
    const apiCall = async()=> {
        let response = await (await fetch(url)).json();
        let currentWeather = response.weather[0].main;
        if(currentWeather === 'Clouds'){
            document.querySelector('body').style.backgroundImage = 'url("./assets/cloud-bg.png")';
        } else if(currentWeather === 'Thunderstorm' || currentWeather === 'Rain' || currentWeather === 'Drizzle'){
            document.querySelector('body').style.backgroundImage = 'url("./assets/cloud-bg.png")';
            document.querySelector('.rain').style.display = 'block';
        }
        console.log(response);
    };
    apiCall();
}

function apiPressEnter(e){
    // If enter is pressed
    if(e.keyCode === 13){
        // Only fire if settings page is open
        if(!document.querySelector('#settings-contain').classList.contains('hidden')){
            apiStartGame();
        }
    }
}
