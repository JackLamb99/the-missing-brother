/**
 * Dice roll animation and logic powered by Fantastic Dice: https://fantasticdice.games/
 * Fantastic Dice is a JavaScript library for creating animated dice rolls in web applications.
 * This file includes code adapted from the official Fantastic Dice documentation: https://fantasticdice.games/docs
 * The library is open-source and used here under its open licence.
 * Some logic and setup have been modified to integrate with the game's custom JavaScript structure.
 */

import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

const diceBox = new DiceBox({
    selector: "#dice-box",
    assetPath: "/assets/dice-box/",
    scale: 4
});

await diceBox.init();

window.rollDiceCheck = async (targetTotal, onSuccessScene, onFailScene) => {
    document.querySelectorAll('.btns').forEach(btn => btn.disabled = true);
    const results = await diceBox.roll('2d6');
    const total = results.reduce((sum, die) => sum + die.value, 0);

    setTimeout(() => {
        diceBox.clear();
        loadScene(total >= targetTotal ? onSuccessScene : onFailScene);
    }, 1500);
};