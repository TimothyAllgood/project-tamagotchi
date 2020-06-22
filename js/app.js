console.log('Welcome to Project Tamagotchi!')

// Create Class For Pet
class Pet{
    constructor(){
        this.name = 'Pet';
        this.hunger = 0;
        this.hungerWidth = 0;
        this.sleep = 0;
        this.sleepWidth = 0;
        this.boredom = 0;
        this.boredomWidth = 0;
        this.time = 60;
        this.age = 1;
    }
}

//Instantiate Pet
const pet = new Pet;

console.log(pet);

//------------DOM Elements
//Hunger Elements
const hungerText = document.querySelector('#hunger p');
const hungerBar = document.querySelector('#hunger .status-color');
const hungerBtn = document.querySelector('#hunger button');

//Sleep Elements
const sleepText = document.querySelector('#sleepiness p');
const sleepBar = document.querySelector('#sleepiness .status-color');
const sleepBtn = document.querySelector('#sleepiness button');

//Boredom Elements

const boredText = document.querySelector('#boredom p');
const boredBar = document.querySelector('#boredom .status-color');
const boredBtn = document.querySelector('#boredom button');

//Timer Elements
const timerText = document.querySelector('header p');

timerControl();

function timerControl(){
    const timer = setInterval(()=>{
        if(pet.time>0){
            pet.time--;
            updateTime();
            raiseHunger();
            raiseSleep();
            raiseBoredom();
            // Every x seconds increase pet age
            if(pet.time % 30 === 0){
                pet.age++;
                console.log('Age:', pet.age);
            }
            // If pet hunger, sleep, or boredom stat reaches 10, player loses, and game ends
            if(pet.hunger === 10 || pet.sleep === 10 || pet.boredom === 10){
                endGame(timer);
            }
        }  else{
            endGame(timer);
        }
    }, 1000);
}

//-------------Event Handlers

hungerBtn.addEventListener('click', feedPet);

sleepBtn.addEventListener('click', turnOffLights);

boredBtn.addEventListener('click', playWithPet);


//-------------Functions

// Hunger Functions
function feedPet(){
    if(pet.hunger > 1){
        pet.hunger--;
        hungerText.textContent = `${pet.hunger}/10`
        pet.hungerWidth -= 10;
        hungerBar.style.width = `${pet.hungerWidth}%`
        console.log(pet.hunger);
    }
}

function raiseHunger(){
    pet.hunger++;
    hungerText.textContent = `${pet.hunger}/10`
    pet.hungerWidth += 10;
    hungerBar.style.width = `${pet.hungerWidth}%`
    console.log('Hunger: ', pet.hunger);
}

// Sleep Functions
function turnOffLights(){
    if(pet.sleep > 1){
        pet.sleep--;
        sleepText.textContent = `${pet.sleep}/10`
        pet.sleepWidth -= 10;
        sleepBar.style.width = `${pet.sleepWidth}%`
        console.log(pet.sleep);
    }
}

function raiseSleep(){
    pet.sleep++;
    sleepText.textContent = `${pet.sleep}/10`
    pet.sleepWidth += 10;
    sleepBar.style.width = `${pet.sleepWidth}%`
    console.log('Sleep: ', pet.sleep);
}

// Boredom Functions
function playWithPet(){
    if(pet.boredom > 1){
        pet.boredom--;
        boredText.textContent = `${pet.boredom}/10`
        pet.boredomWidth -= 10;
        boredBar.style.width = `${pet.boredomWidth}%`
        console.log(pet.boredom);
    }
}

function raiseBoredom(){
    pet.boredom++;
    boredText.textContent = `${pet.boredom}/10`
    pet.boredomWidth += 10;
    boredBar.style.width = `${pet.boredomWidth}%`
    console.log('Boredom: ', pet.boredom);
}
// UI Functions
// changes time to MM:SS format
function prettyTime(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function convertTime(){
    let minutes = Math.floor(pet.time / 60);
    let seconds = pet.time -  minutes * 60;
    return prettyTime(minutes,'0',2)+':' + prettyTime(seconds,'0',2);
    
}
// updates timer text
function updateTime(){
    timerText.textContent = `${convertTime()}`;
}

// End game

function endGame(timer){
    // Remove listeners once game is over, fixes bug that allows player to adjust stat values after game is over
    hungerBtn.removeEventListener('click', feedPet);
    sleepBtn.removeEventListener('click', turnOffLights);
    boredBtn.removeEventListener('click', playWithPet);
    // If player loses run this
    if(pet.hunger === 10 || pet.sleep === 10 || pet.boredom === 10){
        // Update pet image on death
        document.querySelector('#js-pet-image').style.backgroundImage = 'url(https://lh3.googleusercontent.com/proxy/zX_kjJBYozyE2r51ld_KLhkAsBmkVxcAlXEMrO2qbsgHp-80AzLDwOD9mZXdY9bi-AfhB2H2eLMkVnfjnY_d5Kkjp4vv6EA0)'
    } else{ 
        // Run this if player wins
    }

    clearInterval(timer);
}