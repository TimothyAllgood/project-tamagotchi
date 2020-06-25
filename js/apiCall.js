const apiKey = 'c88446589340e6dbc0a34a6d02703918' 
let city = 'Covington'; // give city a default value
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`; // set url to use apiKey and city

const cityInput = document.querySelector('.city'); // Get value from player

const apiGameBtn = document.querySelector('#settings-contain button');

apiGameBtn.addEventListener('click', apiStartGame); // Starts Game, saves city value

window.addEventListener('keydown', apiPressEnter); // Starts game if enter is pressed

// https://openweathermap.org/weather-conditions => list of all conditions form openweather


// Starts Game
function apiStartGame(){
    city = cityInput.value.replace(/\s/g, '+').toLowerCase() || 'Covington'; // convert city to format openweather url takes
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`;
    const apiCall = async()=> { // Function to fetch weather from city
        let response = await (await fetch(url)).json();
        let currentWeather = response.weather[0].main; // current weather condition
        //Change background dynamically, not all conditions accounted for
        if(currentWeather === 'Clouds'){
            document.querySelector('body').style.backgroundImage = 'url("./assets/cloud-bg.png")';
            document.querySelector('.rain').style.display = 'none';
        } else if(currentWeather === 'Thunderstorm' || currentWeather === 'Rain' || currentWeather === 'Drizzle'){
            document.querySelector('body').style.backgroundImage = 'url("./assets/cloud-bg.png")';
            document.querySelector('body').style.backgroundColor = '#333';
            document.querySelector('body').style.backgroundBlendMode = 'multiply';
            document.querySelector('body').style.color = '#f1f1f1';
            document.querySelector('.rain').style.display = 'block';
        } else if(currentWeather === 'Clear'){
            document.querySelector('body').style.backgroundImage = 'url("./assets/bg.png")';
            document.querySelector('.rain').style.display = 'none';
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
