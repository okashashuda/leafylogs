// Retrieve lastLoginDate from localStorage and convert it to a Date object
const lastLoginDateString = localStorage.getItem('lastLoginDate');
const lastLoginDate = lastLoginDateString ? new Date(lastLoginDateString) : null;

const todayLoginDate = new Date();

// Calculate the time difference in milliseconds
const timeDifference = lastLoginDate ? todayLoginDate - lastLoginDate : 0;

// Function to update last login time
function updateLastLogin() {
    const todayLoginDate = new Date();
    const dateString = todayLoginDate.toISOString();
    localStorage.setItem('lastLoginDate', dateString);
}

//updates last time logged on every time
const updatingTime = setInterval(updateLastLogin, 1000); // updates last login time

// Convert the time difference to days
const daysPassed = Math.floor(timeDifference/(1000));

console.log("days passed " + daysPassed);

function decayRateCalculator(daysPassed) {
    //check if hyration less than 5, if so then it would be a linear decay rate
    return ((1/50)*(daysPassed)*(daysPassed))+5
}

// Retrieve values from localStorage or set default values
let hydration = localStorage.getItem('hydration') ? parseFloat(localStorage.getItem('hydration')) : 100;
let nutrients = localStorage.getItem('nutrient') ? parseFloat(localStorage.getItem('nutrient')) : 100;

function updateHydrationNutrients() {
    localStorage.setItem('hydration', hydration);
    localStorage.setItem('nutrient', nutrients);
}

//continusally updates hydration and nutrients
const hydrationAndNutrient = setInterval(updateHydrationNutrients, 1000); // Updates hydration & nutrient

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

//Disaster function, P(X) = 1/8, X = disaster happening
// Check for a disaster event upon login
// Check for a disaster event upon login
function checkForDisaster() {
    if (Math.random() < 0.125) { // 1/8 chance
        alert("A disaster has occurred!");

        // Halve the hydration and nutrient levels
        hydration *= 0.5;
        nutrients *= 0.5;

        // Update the display to reflect the new levels
        updateDisplay();

        // Show the fire effect
        const fireEffect = document.getElementById("fireEffect");
        fireEffect.style.display = "block";

        // Hide the fire effect after a few seconds (adjust the timeout as needed)
        setTimeout(() => {
            fireEffect.style.display = "none";
        }, 3000); // Hide after 3 seconds
    }
}

// Call the checkForDisaster function when the user logs in
// checkForDisaster();

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
// decayHydration();
// decayNutrients();

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
const reply = document.getElementById("replyMsg");

if (daysPassed > 0) {
    newLeafMsg.style.display = 'block';
    submitButton.style.display = 'block';

    submitButton.addEventListener("click", function () {
        const msg = newLeafMsg.value;

        newLeafMsg.style.display = 'none';
        submitButton.style.display = 'none';

        reply.style.display = 'block';

        setTimeout(function () {
            reply.style.display = 'none';
        }, 5000);

        //retrieveMessages();
    });
}

// function retrieveMessages() { // Retrieve saved messages from leaves
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
        
//         if (key.startsWith("message_")) {
//             const message = localStorage.getItem(key);
//             const alertMessage = "Date: ${key}\nMessage: ${message}";
//             alert(alertMessage);
//         }
//     }
// }

function hideSplashScreen() {
    document.getElementById("splashScreen").style.display = "none";
}