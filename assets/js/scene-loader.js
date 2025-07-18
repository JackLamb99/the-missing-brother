/**
 * Loads the specified scene and updates the game interface accordingly.
 * This includes updating the header, text, background image, and available choices.
 * It also saves progress to localStorage and handles any flag updates or custom actions.
 * 
 * @param {string} sceneName - The key of the scene to load.
 */
function loadScene(sceneName) {
    // Reset scroll position to top
    window.scrollTo(0, 0);

    // Call refreshFlags function before rendering scene
    refreshFlags();

    // Check if the scene exists
    const scene = scenes[sceneName];
        if (!scene) {
            console.error(`Scene "${sceneName}" not found.`);
            return;
    }

    // Save the scene name to memory for background-switcher
    window.currentSceneName = sceneName;

    // Apply background image
    setBackground(scene.background);

    // Replace content in header
    document.getElementById('game-header').innerText = scene.header;

    // Replace content in text, processing variables
    const name = localStorage.getItem('playerName');
    const pronounSubject = localStorage.getItem('pronounSubject');
    const pronounObject = localStorage.getItem('pronounObject');
    const pronounPossessive = localStorage.getItem('pronounPossessive');
    const pronounReflexive = localStorage.getItem('pronounReflexive');

    const gameText = scene.text({
        name,
        pronounSubject,
        pronounObject,
        pronounPossessive,
        pronounReflexive
    });

    document.getElementById('game-text').innerHTML = gameText;

    // Generate buttons for choices
    const choicesContainer = document.getElementById('game-choices');
    choicesContainer.innerHTML = ''; // Clear old choices

    const resolvedChoices = typeof scene.choices === 'function' ? scene.choices() : scene.choices;

    resolvedChoices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('btns');
        button.innerHTML = choice.text;
        if (choice.action) {
            // Run a custom action
            button.addEventListener('click', choice.action);
        } else {
            button.addEventListener('click', () => {
                // Set any flags this choice defines
                if (choice.setFlags) {
                    for (const [key, value] of Object.entries(choice.setFlags)) {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                    if (typeof refreshFlags === 'function') {
                        refreshFlags(); // Update the global flags object immediately
                    }
                }
                // Load the next scene
                loadScene(choice.next);
            });
        }
    choicesContainer.appendChild(button);
    });

    // Save progress
    localStorage.setItem('currentScene', sceneName);
}