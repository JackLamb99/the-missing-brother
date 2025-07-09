// Keep track of the current image
let currentBg = '';

// Function to set the background based on the current scene
function setBackground(imageBaseName) {
    if (!imageBaseName) return;

    const isPortrait = window.innerHeight > window.innerWidth;
    const newBg = `assets/images/${imageBaseName}-${isPortrait ? 'portrait' : 'landscape'}.png`;

    if (newBg !== currentBg) {
        document.body.style.backgroundImage = `url('${newBg}')`;
        currentBg = newBg;
    }
}

// Auto-update background on screen resize
window.addEventListener('resize', () => {
    if (window.currentSceneName && scenes[window.currentSceneName]) {
        const backgroundKey = scenes[window.currentSceneName].background;
        setBackground(backgroundKey);
    }
});