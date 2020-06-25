console.log('Welcome to Project Tamagotchi!')

// Create Class For Pet
class Pet{
    constructor(name = 'Pet',){
        this.name = name;
        this.hunger = 0;
        this.hungerWidth = 0;
        this.sleep = 0;
        this.sleepWidth = 0;
        this.boredom = 0;
        this.boredomWidth = 0;
        this.time = 60;
        this.age = 1;
        this.selectedChar = 'owlet'
    }
}

//Instantiate Pet
let pet = new Pet;

//Game State
let petIdle = `../assets/${pet.selectedChar}-idle.png`;
let petDeath = `../assets/${pet.selectedChar}-death.png`
let paused = false;
let totalPets = 0;
let petGraveYard = [];

//------------DOM 
// Settings Page Elements
const startGameBtn = document.querySelector('#settings-contain button');
const petInput = document.querySelector('#settings-contain .pet-name');
const settings = document.querySelector('#settings-contain');
const characterSelect = document.querySelector('.pet-select');
const timeInput = document.getElementById('time');

// Main Game Elements
const gamePage = document.querySelector('#game-contain');

// Name Elements
const nameText = document.querySelector('#js-pet-info h3');

// Age Elements
const ageText =  document.querySelector('#js-pet-info p');

// Hunger Elements
const hungerText = document.querySelector('#hunger p');
const hungerBar = document.querySelector('#hunger .status-color');
const hungerBtn = document.querySelector('#hunger button');

// Sleep Elements
const sleepText = document.querySelector('#sleepiness p');
const sleepBar = document.querySelector('#sleepiness .status-color');
const sleepBtn = document.querySelector('#sleepiness button');

// Boredom Elements
const boredText = document.querySelector('#boredom p');
const boredBar = document.querySelector('#boredom .status-color');
const boredBtn = document.querySelector('#boredom button');

// Restart Elements
const restartButton = document.querySelector('.game-end button');

// Timer Elements
const timerText = document.querySelector('header p');
const pauseBtn = document.getElementById('js-pause');

// Graveyard Elements
const graveyard = document.querySelector('.graveyard-contain');
const graveyardUl = document.querySelector('.graveyard-contain ul');
const graveyardBtn = document.querySelector('.graveyard-contain button');


//-------------Event Handlers
// Handle Start Game if Button is clicked or Enter is pressed
startGameBtn.addEventListener('click', startGame);

window.addEventListener('keydown', pressEnter);

// Handle Character Selection
characterSelect.addEventListener('click', selectCharacter);

// Handle Status Updates
hungerBtn.addEventListener('click', () => lowerStat(pet, 'hunger', hungerText, 'hungerWidth', hungerBar));

sleepBtn.addEventListener('click', () => lowerStat(pet, 'sleep', sleepText, 'sleepWidth', sleepBar));

boredBtn.addEventListener('click', () => lowerStat(pet, 'boredom', boredText, 'boredomWidth', boredBar));

// Handle Restart
restartButton.addEventListener('click', restartGame);

// Handle Showing Graveyard
graveyardBtn.addEventListener('click', showDeadPets);

//-------------Functions

function pressEnter(e){
    // If enter is pressed
    if(e.keyCode === 13){
        // Only fire if settings page is open
        if(!document.querySelector('#settings-contain').classList.contains('hidden')){
            startGame();
        }
    }
}

// Function starts timer and sets name and age. Hides setting page and reveals main game screen
function startGame(){
    settings.classList.add('hidden');
    gamePage.classList.remove('hidden');
    setName();
    setAge();
    setTime();
    timerControl();
    addToGraveyard();
}

// Restart Game - Resets all variables to defaults
function restartGame(){
    if( document.querySelector('.pet-death')){
        document.querySelector('.pet-death').style.backgroundImage = `url(assets/${petIdle})`;
        document.querySelector('.pet-death').className = 'js-pet-image';
    }
    document.querySelector('.js-pet-image').style.filter = 'none';
    document.querySelector('.game-end').classList.remove('game-end-show');
    hungerBtn.addEventListener('click', () => lowerStat(pet, 'hunger', hungerText, 'hungerWidth', hungerBar));
    sleepBtn.addEventListener('click', () => lowerStat(pet, 'sleep', sleepText, 'sleepWidth', sleepBar));
    boredBtn.addEventListener('click', () => lowerStat(pet, 'boredom', boredText, 'boredomWidth', boredBar));
    settings.classList.remove('hidden');
    gamePage.classList.add('hidden');
    pet.hunger = 1;
    pet.hungerWidth = 0;
    pet.sleep = 1;
    pet.sleepWidth = 0;
    pet.boredom = 1;
    pet.boredomWidth = 0;
    pet.time = 60;
    pet.age = 1;
    paused = false;
    resetStat(pet, 'hunger', hungerText, 'hungerWidth', hungerBar);
    resetStat(pet, 'sleep', sleepText, 'sleepWidth', sleepBar);
    resetStat(pet, 'boredom', boredText, 'boredomWidth', boredBar);
}

// Resets hunger, sleepiness, and boredom text and progress bars to default values.
function resetStat(obj, stat, text, width, bar){ //obj = object, stat = hunger, sleep, boredom
    text.textContent = `${obj[stat]}/10`
    obj[width] += 10;
    bar.style.width = `${obj[width]}%`
}

// Character Selection Function
function selectCharacter(e){
    //if target has src it is an image
   if(e.target.src){
    addBorder(e);
    pet.selectedChar = e.target.alt;
    petIdle = `${pet.selectedChar}-idle.png`;
    petDeath = `../assets/${pet.selectedChar}-death.png`;
    setPetImage();
   }   
}

// Adds border around character that is currently selected to make it clear which character you have picked
function addBorder(e){
    if(e.target.id === 'owlet'){ 
        e.target.classList.add('selected-pet'); // add class to add border around clicked image
        document.getElementById('pinky').classList.remove('selected-pet');
        document.getElementById('dude').classList.remove('selected-pet');
    } else if(e.target.id === 'pinky'){ // add class to add border around clicked image
        e.target.classList.add('selected-pet');
        document.getElementById('owlet').classList.remove('selected-pet');
        document.getElementById('dude').classList.remove('selected-pet');
    } else if(e.target.id === 'dude'){ // add class to add border around clicked image
        e.target.classList.add('selected-pet');
        document.getElementById('owlet').classList.remove('selected-pet');
        document.getElementById('pinky').classList.remove('selected-pet');
    }
}
// Set background-image for idle animation
function setPetImage(){
    document.querySelector('.js-pet-image').style.backgroundImage = `url(assets/${petIdle})`;
}

// Timer - Main Game logic goes here

function timerControl(){
    
    let timer = setInterval(timerFunc, 500); // Initialize timer on game start, will update every second

    // Callback function for timer, houses main game logic
    function timerFunc (){
        if(pet.time>0){ // If time is above 0, game will keep updating
            pet.time--;
            updateTime(); // Updates timer ui
            raiseStats(3, 2, 1); // Change these values to control the time that boredom, hunger, sleepiness decay in that order,
            agePet(30); // Every x seconds increase pet age
            morphPet(pet, 'age'); // Add filters to change image color at certain breakpoints
            // If pet hunger, sleep, or boredom stat reaches 10, player loses, and game ends
            if(pet.hunger === 10 || pet.sleep === 10 || pet.boredom === 10){
                endGame(timer);
                pauseBtn.removeEventListener('click', pause);
            }
        } else{
            endGame(timer);
            pauseBtn.removeEventListener('click', pause);
        }
    }
    // Pause Game
    pauseBtn.addEventListener('click', pause);
    function pause(){
        if(!paused){ // Checks if game is paused, if its not stop timer
            clearInterval(timer);
            pauseBtn.textContent = 'Play'
            paused = true;
        } else{ // else restart timer
            paused = false;
            pauseBtn.textContent = 'Pause';
            timer = setInterval(timerFunc, 1000);
        }
    }
}

// Pet Name and Age
function agePet(ageInterval){
    if(pet.time % ageInterval === 0){
        pet.age++;
        setAge();
    }
}

function morphPet(obj, age){
    if(obj[age] === 2){
        document.querySelector('.js-pet-image').style.filter='hue-rotate(45deg)';
    } else if(obj[age]  > 2){
        document.querySelector('.js-pet-image').style.filter='grayscale(1)';
    } else{
        document.querySelector('.js-pet-image').style.filter = 'none';
    }
}

// Functions to change pet name, amount of time to play, and age
function setName(){
    let petName = petInput.value; // Player input for pet name
    pet.name = petName || 'Pet'; // Give Name a default value
    nameText.textContent = `Name:${pet.name}`
}

function setAge(){
    ageText.textContent = `Age:${pet.age}`;
}

function setTime(){
    pet.time = timeInput.value * 60;
    updateTime();
}

// Status Update Function
function raiseStats(x,y,z){
    if(pet.time % x === 0){ // Raise Sleep every x seconds
        raiseStat(pet, 'sleep', sleepText, 'sleepWidth', sleepBar);    
    } else if(pet.time % y === 0){ // Raise Hunger every y seconds
        raiseStat(pet, 'hunger', hungerText, 'hungerWidth', hungerBar);
    } else if (pet.time % z === 0){// Raise Boredom every z seconds
        raiseStat(pet, 'boredom', boredText, 'boredomWidth', boredBar);    }
}
// Update Any Stat - Refactored with help from Michael Petty
function raiseStat(obj, stat, text, width, bar){ //obj = object, stat = hunger, sleep, boredom
    if(obj[stat] > 10){
        obj[stat] = 10;
    }
    obj[stat]++;
    text.textContent = `${obj[stat]}/10`;
    obj[width] += 10;
    bar.style.width = `${obj[width]}%`;
}

function lowerStat(obj, stat, text, width, bar){ //obj = object, stat = hunger, sleep, boredom
    if(obj[stat] > 1){
        obj[stat]--;
        text.textContent = `${obj[stat]}/10`;
        obj[width] -= 10;
        bar.style.width = `${obj[width]}%`;
    }
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
// Updates timer text
function updateTime(){
    timerText.textContent = `${convertTime()}`;
}

// End game

function endGame(timer){
    // Remove listeners once game is over, fixes bug that allows player to adjust stat values after game is over
    hungerBtn.removeEventListener('click', () => lowerStat(pet, 'hunger', hungerText, 'hungerWidth', hungerBar));
    sleepBtn.removeEventListener('click', () => lowerStat(pet, 'sleep', sleepText, 'sleepWidth', sleepBar));
    boredBtn.removeEventListener('click', () => lowerStat(pet, 'boredom', boredText, 'boredomWidth', boredBar));
    // If player loses run this
    if(pet.hunger === 10 || pet.sleep === 10 || pet.boredom === 10){
        // Update pet image on death
        document.querySelector('.game-end').classList.add('game-end-show');
        document.querySelector('.js-pet-image').className = 'pet-death';
        // Call this here because .pet-death is not created until this point
        document.querySelector('.pet-death').style.backgroundImage = `url(assets/${petDeath})`;
        populateGraveyard();
        displayDeathMessage();
        
        console.log(petGraveYard);
    } else{ 
        // Run this if player wins
        document.querySelector('.game-end').classList.add('game-end-show');
        document.querySelector('.game-end h2').textContent = 'You won!';
    }
    clearInterval(timer); // Stop timer
}
// creates object containing info about each pet's death
function populateGraveyard(){
    petGraveYard.push({   
    });
    petGraveYard[totalPets].name = pet.name;
    petGraveYard[totalPets].age = pet.age;
    if(pet.hunger === 10){
        petGraveYard[totalPets].cause = 'Starvation';
    } else if(pet.boredom === 10){
        petGraveYard[totalPets].cause = 'Boredom';
    } else if(pet.sleep === 10){
        petGraveYard[totalPets].cause = 'Sleep Deprivation';
    }
    totalPets++;
}

// displays a different message for each type of death
function displayDeathMessage(){
    if(pet.hunger === 10){
        document.querySelector('.game-end h2').textContent = `${pet.name} starved! You lost!`;
    } else if(pet.boredom === 10){
        document.querySelector('.game-end h2').textContent = `${pet.name} died of boredom! You lost!`;
    } else if(pet.sleep === 10){
        document.querySelector('.game-end h2').textContent = `${pet.name} didn't get enough sleep! You lost!`;
    }
}

// add each pet to graveyard and add to DOM

function addToGraveyard(){
    if(petGraveYard.length > 0){
        graveyardUl.innerHTML = ''; // clear out ul to prevent duplicates
        for(let pet in petGraveYard){
            let petLi = `<li>Name:${petGraveYard[pet].name}</li>
            <li>Age:${petGraveYard[pet].age}</li>
            <li>Cause of Death:${petGraveYard[pet].cause}</li>
            </br>`
            graveyardUl.insertAdjacentHTML('beforeend', petLi);
        }
    }
}

// show all pets player has let die

function showDeadPets(){
    graveyardUl.classList.toggle('show-graveyard'); // toggles opacity class
    if(graveyardUl.classList.contains('show-graveyard')){
        graveyardBtn.textContent = 'Hide Graveyard';
    } else{
        graveyardBtn.textContent = 'Show Graveyard';
    }
}