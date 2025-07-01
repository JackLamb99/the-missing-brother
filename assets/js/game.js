function showCharacterCreation() {
    // Set header and text
    document.getElementById('game-header').textContent = "Who are you?";
    document.getElementById('game-text').innerHTML = `
        <p>Before we begin, you need to give your character a name and pick their pronouns. These choices will be 
        used throughout the game for a more immersive experience.</p>
        <input type="text" id="playerName" class="form-control mb-3" placeholder="Enter your character's name" maxlength="20" />
    `;

    // Clear any existing buttons
    const choiceBox = document.getElementById('game-choices');
        choiceBox.innerHTML = '';

    // Pronoun button options
    const pronounOptions = [
        {type: 'masc', label: 'Masculine (he/him)'},
        {type: 'fem', label: 'Feminine (she/her)'},
        {type: 'neutral', label: 'Neutral (they/them)'}
    ];

    // Render each pronoun button
    pronounOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'btns';
        btn.textContent = option.label;
        btn.onclick = () => setPronouns(option.type);
        choiceBox.appendChild(btn);
    });
}

function setPronouns(type) {
    const nameInput = document.getElementById('playerName');
    const name = nameInput ? nameInput.value.trim() : '';

    if (!name) {
        alert("Please enter your name before selecting a pronoun.");
        return;
    }

    const pronounMap = {
        masc: {
            pronounSubject: 'he',
            pronounObject: 'him',
            pronounPossessive: 'his',
            pronounReflexive: 'himself'
        },
        fem: {
            pronounSubject: 'she',
            pronounObject: 'her',
            pronounPossessive: 'hers',
            pronounReflexive: 'herself'
        },
        neutral: {
            pronounSubject: 'they',
            pronounObject: 'them',
            pronounPossessive: 'their',
            pronounReflexive: 'themselves'
        }
    };

    const pronouns = pronounMap[type];

    // Save all to localStorage
    localStorage.setItem('missingBrotherSave', JSON.stringify({
        name: name,
        ...pronouns,
        currentScene: 'prologue'
    }));

    // Start the game
    loadScene('prologue');
}

document.addEventListener('DOMContentLoaded', () => {
    const save = JSON.parse(localStorage.getItem('missingBrotherSave'));

    if (!save || !save.name || !save.pronounSubject) {
        // No valid save – start character creation
        showCharacterCreation();
    } else {
        // Valid save found – load saved scene
        loadScene(save.currentScene || 'prologue');
    }
});