let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    updateDisplay(0, 0, 0, 0);
    laps = [];
    updateLaps();
}

function recordLap() {
    if (running) {
        laps.push(difference);
        updateLaps();
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    const seconds = Math.floor((updatedTime / 1000) % 60);
    const minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    const hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    updateDisplay(hours, minutes, seconds, milliseconds);
}

function updateDisplay(hours, minutes, seconds, milliseconds) {
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        const lapTime = new Date(lap);
        const lapMilliseconds = Math.floor((lapTime % 1000) / 10);
        const lapSeconds = Math.floor((lapTime / 1000) % 60);
        const lapMinutes = Math.floor((lapTime / (1000 * 60)) % 60);
        const lapHours = Math.floor((lapTime / (1000 * 60 * 60)) % 24);
        lapItem.textContent = `lap ${index + 1}: ${formatTime(lapHours)}:${formatTime(lapMinutes)}:${formatTime(lapSeconds)}:${formatTime(lapMilliseconds)}`;
        lapsList.appendChild(lapItem);
    });
}

function formatTime(time) {
    return time.toString().padStart(2, '0');
}