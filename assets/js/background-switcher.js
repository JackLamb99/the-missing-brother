// Set paths to portrait and landscape background images
const portraitBg = 'assets/images/index-portrait.png';
const landscapeBg = 'assets/images/index-landscape.png';

// Keep track of the current image to avoid unnecessary updates
let currentBg = '';

// Function to check screen shape and set the correct background
function setLandingBackground() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const newBg = isPortrait ? portraitBg : landscapeBg;

    if (newBg !== currentBg) {
        document.body.style.backgroundImage = `url('${newBg}')`;
        currentBg = newBg;
    }
}

// Run this function when the page loads
window.addEventListener('DOMContentLoaded', setLandingBackground);

// Run it again if the screen size changes
window.addEventListener('resize', setLandingBackground);
