/**
 * Dice roll animation and logic powered by Fantastic Dice: https://fantasticdice.games/
 * Fantastic Dice is a JavaScript library for creating animated dice rolls in web applications.
 * This file includes code adapted from the official Fantastic Dice documentation: https://fantasticdice.games/docs
 * The library is open-source and used here under its open licence.
 * Some logic and setup have been modified to integrate with the game's custom JavaScript structure.
 */

import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

let diceBox;
let useFallback = false;

// Attempt to create and initialise the diceBox
try {
    diceBox = new DiceBox({
        selector: "#dice-box",
        assetPath: "/assets/dice-box/",
        scale: 4,
    });

    await diceBox.init();

} catch (error) {
    console.warn("Fantastic Dice failed to initialise. Using fallback dice logic.", error);
    useFallback = true;
}

/**
 * Fallback dice rolling function that simulates a simple dice roll.
 * This is used when the Fantastic Dice library fails to load or initialise.
 */
function fallbackRollDice(sides = 6, count = 2) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

window.rollDiceCheck = async (targetTotal, onSuccessScene, onFailScene) => {
    if (!onSuccessScene || !onFailScene) {
        console.error('Missing scene name in dice roll.');
        return;
    }

    // Disable choice buttons to prevent "spam" clicking
    document.querySelectorAll('.btns').forEach(btn => btn.disabled = true);

    let total;

    if (useFallback) {
        // Simple fallback roll
        total = fallbackRollDice();
        alert(`You rolled ${total} (need ${targetTotal}+)`);
        if (total >= targetTotal) {
            loadScene(onSuccessScene);
        } else {
            loadScene(onFailScene);
        }
    } else {
        // Animated dice roll
        const results = await diceBox.roll('2d6');
        total = results.reduce((sum, die) => sum + die.value, 0);

        setTimeout(() => {
            diceBox.clear();
            if (total >= targetTotal) {
                loadScene(onSuccessScene);
            } else {
                loadScene(onFailScene);
            }
        }, 1500);
    }
};