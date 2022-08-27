const myBody = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let timerId = null;

startButton.addEventListener("click", changeBgc);

stopButton.addEventListener("click", clearTimerId);

function  changeBgc(event){
    timerId = setInterval(()=>{
        myBody.style.backgroundColor = getRandomHexColor()
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function clearTimerId(event){
    clearInterval(timerId);
    startButton.disabled = false;
    stopButton.disabled = true;
} 

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
