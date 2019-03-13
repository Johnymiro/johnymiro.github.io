let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let startButton = document.getElementById("start");
let currentlyPlaying = true;

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

// Random Door image function
const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  }else if(choreDoor === 1){
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
  else if(choreDoor === 2) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  }
};

/*class Door{
  constructor(door, sourc){
    this.door = door;
    this.sourc = sourc;
  }
  meth(){
    if(this.door.src === this.sourc){
      return true;
    }else {return false};
  }
};

let isBot = new Door(door, botDoorPath);
isBot.meth();

let isClicked = new Door(door, closedDoorPath);
isClicked.meth();*/

// In case bot appears you lose function

const isBot = (door) => {
  if(door.src === botDoorPath){
    return true;
  }else return false;
}
// In case you try to cheat and click 3 times 1 door
const isClicked = (door) => {
  if(door.src === closedDoorPath){
    return false;
  }else return true;
}

//function that decide either you lost or won
const playDoor = (door) => {
  numClosedDoors -= 1;
  if(numClosedDoors === 0){
    gameOver("win");
  }else if(isBot(door)){
    gameOver();
  } 
}



//Door functions
doorImage1.onclick = function () {
  if(!isClicked(doorImage1) && currentlyPlaying){
    doorImage1.src = openDoor1;
  playDoor(door1);
  }
};
doorImage2.onclick = function () {
  if(!isClicked(doorImage2 ) && currentlyPlaying){
  doorImage2.src = openDoor2;
  playDoor(door2);
  }
};
doorImage3.onclick = function () {
  if(!isClicked(doorImage3 ) && currentlyPlaying){
  doorImage3.src = openDoor3;
  playDoor(door3);
  }
};

// In case you want to play more without refreshing the page
startButton.onclick = () => {
  if(currentlyPlaying === false){
  startRound();
  }
};
const startRound = () => {
  
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = "Good luck";
  currentlyPlaying = true;
  
  randomChoreDoorGenerator();

  };

// Game over function
const gameOver = (status) => {
  if(status === "win"){
    startButton.innerHTML = "You win! Play again?";
  }else {
    startButton.innerHTML ="Game over! Play again?"
  }
  currentlyPlaying = false;
};

startRound();