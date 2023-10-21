// Retrieve lastLoginDate from localStorage and convert it to a Date object
const lastLoginDate = new Date(localStorage.getItem('lastLoginDate'));

// Get the current date
const todayLoginDate = new Date();
const dateString = todayLoginDate.toISOString();
localStorage.setItem('lastLoginDate', dateString);

// Calculate the time difference in milliseconds
const timeDifference = todayLoginDate - lastLoginDate;

// Convert the time difference to days
const daysPassed = 1; //Math.floor(timeDifference / (1000 * 60));

console.log("days passed " + daysPassed);

function decayRateCalculator(daysPassed) {
    //check if hyration less than 5, if so then it would be a linear decay rate
    return ((1/50)*(daysPassed)*(daysPassed))+5
}

// Initial hydration and nutrient levels
let hydration = 100;
let nutrients = 100;

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

//Diaster function, P(X) = 1/8, X = disaster happening
// Check for a disaster event upon login
function checkForDisaster() {
    if (Math.random() < 0.125) { // 1/8 chance
        alert("A disaster has occurred!");
        
        // Halve the hydration and nutrient levels
        hydration *= 0.5;
        nutrients *= 0.5;

        // Update the display to reflect the new levels
        updateDisplay();
    }
}

// Call the checkForDisaster function when the user logs in
checkForDisaster();

// Decay functions
function decayHydration() {
    hydration -= decayRateCalculator(daysPassed);
    if (hydration < 0) hydration = 0;
    updateDisplay();
}

function decayNutrients() {
    nutrients -= decayRateCalculator(daysPassed);
    if (nutrients < 0) nutrients = 0;
    updateDisplay();
}

//when opened use decayhydration and decay nutrients
decayHydration();
decayNutrients();

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
        alert("Plant watered!");
        localStorage.setItem('lastWatered', new Date().toString());

        hydration += 1;
        if (hydration > 100) hydration = 100;

        updateDisplay();
        
    } else {
        alert("You've already watered the plant today!");
    }
});

//mulching
mulchButton.addEventListener('click', function() {
    if (canMulch()) {
        // Logic for adding mulch
        // e.g., increase nutrient level
        alert("Mulch added!");
        localStorage.setItem('lastMulched', new Date().toString());

        if (Math.random() < 0.125) {
            alert("Bonus mulch recived!");
            nutrients += 10;
        }

        nutrients += 1;
        if (nutrients > 100) nutrients = 100; 

        updateDisplay();

    } else {
        alert("You've already added mulch today!");
    }
});

// New Leaf mechanic
const newLeafMsg = document.getElementById("newLeaf");
const submitButton = document.getElementById("submitMsg");

if (daysPassed > 0) {
    newLeafMsg.style.display = 'block';
    submitButton.style.display = 'block';
    
    submitButton.addEventListener("click", function () {
        const msg = newLeafMsg.value;

        newLeafMsg.style.display = 'none';
        submitButton.style.display = 'none';

        const messageElement = document.getElementById('div');
        messageElement.textContent = "Leaf written";
        document.body.appendChild(messageElement);
        
        setTimeout(function () {
            document.body.removeChild(doneMsg);
        }, 5000);
    });
}

//splash screen
document.addEventListener("DOMContentLoaded", function () {
    const splashScreen = document.getElementById("splashScreen");

    // Show the splash screen when the page loads
    splashScreen.style.display = "flex";

    splashScreen.addEventListener("click", function () {
        // Hide the splash screen when it's clicked
        splashScreen.style.display = "none";
    });
});

