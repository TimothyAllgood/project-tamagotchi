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