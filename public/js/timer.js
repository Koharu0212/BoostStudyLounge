let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const endButton = document.getElementById('end');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = '開始';
        isRunning = false;
    } else {
        timer = setInterval(updateTime, 1000);
        startStopButton.textContent = '停止';
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = '開始';
    isRunning = false;
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

startStopButton.addEventListener('click', startStop);
endButton.addEventListener('click', reset);