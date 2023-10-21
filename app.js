const lastLoginDate = localStorage.getItem('lastLoginDate');
const todayLoginDate = localStorage.setItem('lastLoginDate', new Date().toString());

// Initial hydration and nutrient levels
let hydration = 100;
let nutrients = 100;

// Decay rates per second

//change decay rate so it decays exponentially
const hydrationDecayRate = 0.1;
const nutrientDecayRate = 0.25;



// Get DOM elements
const waterButton = document.getElementById("waterButton");
const mulchButton = document.getElementById("mulchButton");
const hydrationStatus = document.getElementById("hydrationStatus");
const nutrientStatus = document.getElementById("nutrientStatus");

// Update the display
function updateDisplay() {
    hydrationStatus.textContent = `${hydration.toFixed(2)}%`;
    nutrientStatus.textContent = `${nutrients.toFixed(2)}%`;

    if (hydration <= 0 || nutrients <= 0) {
        alert("Your plant has died! Refresh the page to start over.");
        // Stop the decay intervals
        clearInterval(hydrationInterval);
        clearInterval(nutrientInterval);
    }
}

//function to see if watering is possible 
function canWater() {
    const lastWatered = localStorage.getItem('lastWatered');
    if (!lastWatered) return true;

    const lastWateredTime = new Date(lastWatered).getTime();
    const currentTime = new Date().getTime();
    const tenSeconds = 10 * 1000; // 10 seconds in milliseconds

    return (currentTime - lastWateredTime) >= tenSeconds;
}

function canMulch() {
    const lastMulched = localStorage.getItem('lastMulched');
    if (!lastMulched) return true;

    const lastMulchedTime = new Date(lastMulched).getTime();
    const currentTime = new Date().getTime();
    const tenSeconds = 10 * 1000; // 10 seconds in milliseconds

    return (currentTime - lastMulchedTime) >= tenSeconds;
}

//watering 
waterButton.addEventListener('click', function() {
    const messageDiv = document.getElementById('message');

    if (canWater()) {
        // Logic for watering the plant
        // e.g., increase hydration level
        console.log("Plant watered!");
        localStorage.setItem('lastWatered', new Date().toString());

        messageDiv.textContent = ''; // Clear any previous messages

        hydration += 1;

        updateDisplay();
        
    } else {
        console.log("You've already watered the plant today!");
        messageDiv.textContent = "Can't water"; // Display the message on the screen
    }
});

//mulching
mulchButton.addEventListener('click', function() {
    if (canMulch()) {
        // Logic for adding mulch
        // e.g., increase nutrient level
        console.log("Mulch added!");
        localStorage.setItem('lastMulched', new Date().toString());

        nutrients += 1;
        if (nutrients > 100) nutrients = 100; 

        updateDisplay();

    } else {
        console.log("You've already added mulch today!");
    }
});

// Decay functions
function decayHydration() {
    hydration -= hydrationDecayRate;
    if (hydration < 0) hydration = 0;
    updateDisplay();
}

function decayNutrients() {
    nutrients -= nutrientDecayRate;
    if (nutrients < 0) nutrients = 0;
    updateDisplay();
}

// Set intervals for decay
const hydrationInterval = setInterval(decayHydration, 1000); // Decrease hydration every second
const nutrientInterval = setInterval(decayNutrients, 1000); // Decrease nutrients every second

const lastLogin = new Date(lastLoginDate);
const timeDifference = todayLoginDate - lastLoginDate;
const daysPassed = Math.floor(timeDifference / (1000*60*60*24));

console.log("Days since last login: " + daysPassed);