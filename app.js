// Retrieve lastLoginDate from localStorage and convert it to a Date object
const lastLoginDateString = localStorage.getItem("lastLoginDate");
const lastLoginDate = lastLoginDateString
  ? new Date(lastLoginDateString)
  : null;

const todayLoginDate = new Date();

// Calculate the time difference in milliseconds
const timeDifference = lastLoginDate ? todayLoginDate - lastLoginDate : 0;

// Function to update last login time
function updateLastLogin() {
  const todayLoginDate = new Date();
  const dateString = todayLoginDate.toISOString();
  localStorage.setItem("lastLoginDate", dateString);
}

//updates last time logged on every time
const updatingTime = setInterval(updateLastLogin, 1000); // updates last login time

// Convert the time difference to days
const daysPassed = Math.floor(timeDifference/(1000*60*60*24));

function decayRateCalculator(daysPassed) {
  //check if hyration less than 5, if so then it would be a linear decay rate
  return (1 / 50) * daysPassed * daysPassed;
}

// Retrieve values from localStorage or set default values
let hydration = localStorage.getItem("hydration")
  ? parseFloat(localStorage.getItem("hydration"))
  : 100;
let nutrients = localStorage.getItem("nutrient")
  ? parseFloat(localStorage.getItem("nutrient"))
  : 100;

function updateHydrationNutrients() {
  localStorage.setItem("hydration", hydration);
  localStorage.setItem("nutrient", nutrients);
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
    localStorage.clear();
  }
}

//Disaster function, P(X) = 1/8, X = disaster happening
// Check for a disaster event upon login
// Check for a disaster event upon login
function checkForDisaster() {
  if (Math.random() < 0.125) {
    // 1/8 chance
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
  const lastWatered = localStorage.getItem("lastWatered");
  if (!lastWatered) return true;

  const lastWateredTime = new Date(lastWatered).getTime();
  const currentTime = new Date().getTime();
  const hour = 3600 * 1000; // 10 seconds in milliseconds

  return currentTime - lastWateredTime >= hour;
}

function canMulch() {
  const lastMulched = localStorage.getItem("lastMulched");
  if (!lastMulched) return true;

  const lastMulchedTime = new Date(lastMulched).getTime();
  const currentTime = new Date().getTime();
  const hour = 3600 * 1000; // 10 seconds in milliseconds

  return currentTime - lastMulchedTime >= hour;
}

//watering
waterButton.addEventListener("click", function () {
  const messageDiv = document.getElementById("message");

  if (canWater()) {
    // Logic for watering the plant
    // e.g., increase hydration level
    alert("Plant watered!");
    localStorage.setItem("lastWatered", new Date().toString());

    hydration += 50;
    if (hydration > 100) hydration = 100;

    updateDisplay();

    if (daysPassed > 0) {
      displayNewLeaf();
    }
  } else {
    alert("You've already watered the plant today!");
  }
});

//mulching
mulchButton.addEventListener("click", function () {
  if (canMulch()) {
    // Logic for adding mulch
    // e.g., increase nutrient level
    alert("Mulch added!");
    localStorage.setItem("lastMulched", new Date().toString());

    if (Math.random() < 0.125) {
      alert("Bonus mulch recieved!");
      nutrients = 100;
    }

    nutrients += 50;
    if (nutrients > 100) nutrients = 100;

    updateDisplay();
  } else {
    alert("You've already added mulch today!");
  }
});

// New Leaf mechanic
const fallAlert = document.getElementById("leafFall");
const newLeafMsg = document.getElementById("newLeaf");
const submitButton = document.getElementById("submitMsg");
const reply = document.getElementById("replyMsg");

function displayNewLeaf() {
  // Displaying and hiding the message box and button
  fallAlert.style.display = "block";
  newLeafMsg.style.display = "block";
  submitButton.style.display = "block";
}

submitButton.addEventListener("click", function () {
  const msg = newLeafMsg.value;

  const currentDate = new Date();
  const key = "message_" + currentDate.toISOString();
  localStorage.setItem(key, msg);

  fallAlert.style.display = "none";
  newLeafMsg.style.display = "none";
  submitButton.style.display = "none";

  reply.style.display = "block";

  getMessage();

  setTimeout(function () {
    reply.style.display = "none";
  }, 5000);
});

//make it load on a leaf background

function getMessage() {
    const messageKeys = [];
    let newVar = 0;
  
    if (localStorage.length < 14) {
        alert("Not enough messages to display");

    } else {

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith("message_")) {
                messageKeys.push(key);
                newVar = i;
                break;
            }
        }

        const randomMessageKey = messageKeys[newVar];
        const randomMessage = localStorage.getItem(randomMessageKey);
    
        alert('Random Saved Message:\n\n' + `Date: ${randomMessageKey}\nMessage: ${randomMessage}`);
        localStorage.removeItem(randomMessageKey);
    }
}  

// JavaScript code for changing the plant image based on the button clicked

// Get references to the buttons and the image element
const button1 = document.getElementById("spring");
const button2 = document.getElementById("summer");
const button3 = document.getElementById("fall");
const button4 = document.getElementById("winter");
const seasonImage = document.getElementById("seasonImage");

// Event listeners for each button
button1.addEventListener("click", () => {
    setImageAndStorePath("assets/spring/4.png");
       document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
});

button2.addEventListener("click", () => {
    setImageAndStorePath("assets/summer/4.png");
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
});

button3.addEventListener("click", () => {
    setImageAndStorePath("assets/fall/4.png");
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
});

button4.addEventListener("click", () => {
    setImageAndStorePath("assets/winter/4.png");
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
});

// Function to set the image source and store the path in local storage
function setImageAndStorePath(imagePath) {
    seasonImage.src = imagePath;
    // Store the selected image path in local storage
    localStorage.setItem("selectedImagePath", imagePath);
}

    // Check if there is a stored image path in local storage and set the image
    const storedImagePath = localStorage.getItem("selectedImagePath");
    if (storedImagePath) {
        seasonImage.src = storedImagePath;
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }
