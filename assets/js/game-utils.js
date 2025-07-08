// List of all flag keys
const flagKeys = [
    // Current scene
    'currentScene',
    // Character ceation and pronouns
    'playerName',
    'pronounSubject',
    'pronounObject',
    'pronounPossessive',
    'pronounReflexive',
    // Evidence flags
    'hasEvidence1',
    // Clue flags
    'hasBetslipClue',
    // Item flags
    'hasFlatKeyItem',
    'hasBankNotesItem',
    // Location flags
    'visitedFlat',
    'visitedDock',
    'visitedPub',
    // Search flags
    'flatDeskSearched',
    'flatWardrobeSearched',
    'flatKitchenSearched',
    'flatFloorboardSearched'
];

// Load all flag values into a global 'flags' object
window.flags = {};
flagKeys.forEach(key => {
    const value = localStorage.getItem(key);
    try {
        window.flags[key] = JSON.parse(value);
    } catch {
        window.flags[key] = value;
    }
});

// Refresh flags during gameplay
function refreshFlags() {
    flagKeys.forEach(key => {
        const value = localStorage.getItem(key);
        try {
            window.flags[key] = JSON.parse(value);
        } catch {
            window.flags[key] = value;
        }
    });
}

// Create a conditional choice output for scenes
function conditionalChoice(condition, choiceObj) {
    return condition ? [choiceObj] : [];
}

// Create a conditional text output for scenes
function conditionalText (condition, textFirst, textSecond) {
    return condition ? textFirst : textSecond;
}

// Reset all saved game data
function resetGameData() {
    flagKeys.forEach(key => localStorage.removeItem(key));
}

// Temporary, remove later
// Log current flag states to console
function logFlagStates() {
    console.log('--- Current Flag States ---');
    flagKeys.forEach(key => {
        console.log(`${key}:`, window.flags[key]);
    });
}