// Keep track of the current image
let currentBg = '';

/**
 * Sets the background image of the page based on the provided base name and the current screen orientation (portrait or 
 * landscape).
 * The function constructs the file path dynamically and avoids unnecessary updates if the background hasn't changed.
 * 
 * @param {string} imageBaseName - The base name of the image file (without orientation suffix).
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