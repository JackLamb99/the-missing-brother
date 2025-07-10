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
    'hasEvidence2',
    // Clue flags
    'hasBetslipClue',
    // Item flags
    'hasFlatKeyItem',
    'hasBankNotesItem',
    'hasKnifeItem',
    // Location flags
    'visitedFlat',
    'visitedDock',
    'visitedPub',
    // Search flags
    'flatDeskSearched',
    'flatWardrobeSearched',
    'flatKitchenSearched',
    'flatFloorboardSearched',
    'dockMotorboatSearched',
    'dockContainerSearched',
    'dockPalletsSearched',
    'dockTugboatSearched',
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

/**
 * Refreshes the global flags object from localStorage.
 * This is useful to ensure the flags object is up-to-date with any changes made to localStorage.
 */
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

/**
 * Returns a choice object if the condition is true, otherwise returns an empty array.
 * Adds the choice object to the choices array if the condition is met.
 */
function conditionalChoice(condition, choiceObj) {
    return condition ? [choiceObj] : [];
}

/**
 * Returns a text string based on the condition.
 * If the condition is true, returns textFirst; otherwise returns textSecond.
 */
function conditionalText (condition, textFirst, textSecond) {
    return condition ? textFirst : textSecond;
}

/**
 * Resets all game data stored in localStorage.
 * Based on the flagKeys array, it removes all keys related to the game's state.
 */
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