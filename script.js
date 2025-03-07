// Load bell sound
const bell = new Audio('./sound/bell.wav.wav'); 
bell.volume = 1.0; // Set volume to 100%
// Initial values
let minutes = 25;
let seconds = 0;
let timer = null;
let isPaused = false;

// Get DOM elements
const startBtn = document.getElementById("btn-start");
const pauseBtn = document.getElementById("btn-pause");
const resetBtn = document.getElementById("btn-reset");
const minuteDisplay = document.getElementById("minutes");
const secondDisplay = document.getElementById("seconds");

// Update timer display
function updateDisplay() {
    minuteDisplay.textContent = String(minutes).padStart(2, "0");
    secondDisplay.textContent = String(seconds).padStart(2, "0");
}

// Start timer function
function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (!isPaused) {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        timer = null;
                        bell.play(); // Play bell sound when timer ends
                        alert("Time's up! Take a break!");
                        minutes = 10; // Switch to a 10-minute break
                        seconds = 0;
                        updateDisplay();
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateDisplay();
            }
        }, 1000);
    }
}

// Pause timer function
function pauseTimer() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause"; // Change button text
}

// Reset timer function
function resetTimer() {
    clearInterval(timer);
    timer = null;
    isPaused = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    pauseBtn.textContent = "Pause"; // Reset pause button text
}

// Add event listeners to buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize display on page load
updateDisplay();
