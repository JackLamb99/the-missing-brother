function loadScene(sceneName) {
    const scene = scenes[sceneName];
        if (!scene) {
            console.error(`Scene "${sceneName}" not found.`);
            return;
    }

    // Save the scene name to memory for background-switcher etc.
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

    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('btns');
        button.innerText = choice.text;
        if (choice.action) {
            // Run a custom action
            button.addEventListener('click', choice.action);
        } else {
            button.addEventListener('click', () => {
                // Set any flags this choice defines
                if (choice.setFlags) {
                    for (const [key, value] of Object.entries(choice.setFlags)) {
                        localStorage.setItem(key, value);
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
