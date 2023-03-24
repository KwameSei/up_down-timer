let timer;
let countdownComplete = false;
let countDownDuration = 0;
let countdownStart;

// Get timer control elements
const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");

function startCountdown() {
    const hours = document.getElementById("hours").value;
    const minutes = document.getElementById("minutes").value;
    const seconds = document.getElementById("seconds").value;

    countDownDuration = (hours * 60 * 60) + (minutes * 60) + parseInt(seconds);
    countdownStart = Date.now();
    countdownComplete = false;

    updateTimerDisplay(countDownDuration);

    timer = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - countdownStart) / 1000);
        const timeRemaining = countDownDuration - timeElapsed;
        updateTimerDisplay(timeRemaining);

        if (timeElapsed >= countDownDuration) {
            countdownComplete = true;
            clearInterval(timer);
            startCountup();
        } else {
            const timeRemaining = countDownDuration - timeElapsed;
            updateTimerDisplay(timeRemaining);
        }
    }, 1000);
}

function startCountup() {
    const countupStart = Date.now() - (countDownDuration * 1000);
    timer = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - countupStart) / 1000);
        updateTimerDisplay(timeElapsed);
    }, 1000);
}

function updateTimerDisplay(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const hoursDisplay = hours.toString().padStart(2, "0");
    const minutesDisplay = minutes.toString().padStart(2, "0");
    const secondsDisplay = seconds.toString().padStart(2, "0");

    timerDisplay.textContent = `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
}

// Add event listeners to timer control elements
startButton.addEventListener("click", startCountdown);