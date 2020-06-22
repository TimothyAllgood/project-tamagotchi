console.log('Welcome to Project Tamagotchi!')

// Create Class For Pet
class Pet{
    constructor(){
        this.name = 'Pet';
        this.hunger = 1;
        this.sleep = 1;
        this.boredom = 1;
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
            console.log(pet.time)
        } else{
            clearInterval(timer);
        }
    }, 1000);
}

//-------------Event Handlers

hungerBtn.addEventListener('click', ()=>{
    console.log('Hunger Clicked');
});

sleepBtn.addEventListener('click', ()=>{
    console.log('Sleepy Clicked');
});

boredBtn.addEventListener('click', ()=>{
    console.log('Bored Clicked');
});


//-------------Functions