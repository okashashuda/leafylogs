let firstTime = true;

function hideSplashScreen(selectedButton) {
    if (firstTime) {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        firstTime = false;

        // You can also use 'selectedButton' to determine which button was clicked
        console.log('Button clicked:', selectedButton);
    }
}

// If you want to save the state across page reloads, consider using localStorage or sessionStorage.
// Check if the user has interacted with the splash screen before
let hasSeenSplashScreen = localStorage.getItem('hasSeenSplashScreen');

// If the user has interacted before, we hide the splash screen and show the content immediately
if (hasSeenSplashScreen) {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

function hideSplashScreen(selectedButton) {
    if (!hasSeenSplashScreen) {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('content').style.display = 'block';

        // Set the localStorage flag to remember that the user has seen the splash screen
        localStorage.setItem('hasSeenSplashScreen', true);

        // You can also use 'selectedButton' to determine which button was clicked
        console.log('Button clicked:', selectedButton);
    }
}
