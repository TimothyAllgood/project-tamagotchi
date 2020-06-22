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
        this.time = 10;
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

timerControl();

function timerControl(){
    const timer = setInterval(()=>{
        if(pet.time>0){
            pet.time--;
            // console.log(pet.time)
            raiseHunger();
            raiseSleep();
            raiseBoredom();
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
    console.log('Hunger: ', pet.hungerWidth);
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
        pet.boredWidth -= 10;
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


// End game

function endGame(timer){
    if(pet.hunger || pet.sleep || pet.boredom)
    clearInterval(timer);
}