// Keep track of the current image
let currentBg = '';

/**
 * Sets the background image based on the provided image base name.
 * The image is selected based on the current orientation (portrait or landscape).
 */
function setBackground(imageBaseName) {
    if (!imageBaseName) return;

    const isPortrait = window.innerHeight > window.innerWidth;
    const newBg = `assets/images/${imageBaseName}-${isPortrait ? 'portrait' : 'landscape'}.webp`;

    if (newBg !== currentBg) {
        document.body.style.backgroundImage = `url('${newBg}')`;
        currentBg = newBg;
    }
}

// Auto-update background on screen resize
window.addEventListener('resize', () => {
    if (typeof scenes !== 'undefined' && window.currentSceneName && scenes[window.currentSceneName]) {
        const backgroundKey = scenes[window.currentSceneName].background;
        setBackground(backgroundKey);
    }
});