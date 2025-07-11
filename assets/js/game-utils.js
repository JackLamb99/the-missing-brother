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
    'hasOverheardClue',
    'hasDetectiveClue',
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
    // Miscellaneous flags
    'pubCanReturn'
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
 * Refreshes the global `flags` object with updated values from localStorage.
 * Attempts to parse each value as JSON; if parsing fails, the raw value is used.
 * This ensures proper handling of both boolean and string values.
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
 * Returns a choice object in an array if the condition is true; otherwise returns an empty array.
 * This is used to conditionally include choices in a scene's `choices` array.
 * 
 * @param {boolean} condition - The condition to evaluate.
 * @param {object} choiceObj - The choice object to include if the condition is true.
 * @returns {Array} An array containing the choice object or an empty array.
 */
function conditionalChoice(condition, choiceObj) {
    return condition ? [choiceObj] : [];
}

/**
 * Returns one of two text strings based on a condition.
 * Useful for dynamically adjusting scene text depending on game state.
 * 
 * @param {boolean} condition - The condition to evaluate.
 * @param {string} textFirst - The text to return if the condition is true.
 * @param {string} textSecond - The text to return if the condition is false.
 * @returns {string} The appropriate text based on the condition.
 */
function conditionalText (condition, textFirst, textSecond) {
    return condition ? textFirst : textSecond;
}

/**
 * Simulates a 2d6 dice roll and determines success based on a target total.
 * Disables all choice buttons to prevent repeated clicks during the roll.
 * Displays an alert showing the result, then loads the appropriate scene based on whether the 
 * roll meets or exceeds the target.
 * 
 * @param {number} targetTotal - The minimum total needed for a successful roll.
 * @param {string} onSuccessScene - The name of the scene to load if the roll is successful.
 * @param {string} onFailScene - The name of the scene to load if the roll fails.
 */
function rollDiceCheck (targetTotal, onSuccessScene, onFailScene){
    document.querySelectorAll('.btns').forEach(btn => btn.disabled = true);
    const total = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
    if (total >= targetTotal) {
        alert(`Dice roll successful! You rolled ${total} (need ${targetTotal}+)`);
    } else {
        alert(`Dice roll failed. You rolled ${total} (need ${targetTotal}+)`);
    }
    loadScene(total >= targetTotal ? onSuccessScene : onFailScene);
}

/**
 * Clears all game-related data stored in localStorage.
 * Iterates through each key in the flagKeys array and removes it.
 * Used to reset game progress when starting a new game.
 */
function resetGameData() {
    flagKeys.forEach(key => localStorage.removeItem(key));
}