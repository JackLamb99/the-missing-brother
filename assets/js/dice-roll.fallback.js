/**
 * Fallback dice roll function for mobile devices
 * This function simulates a simple dice roll when the Fantastic Dice library fails to load or initialise.
 */
window.rollDiceCheck = async (targetTotal, onSuccessScene, onFailScene) => {
    document.querySelectorAll('.btns').forEach(btn => btn.disabled = true);
    const total = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
    alert(`You rolled ${total} (need ${targetTotal}+)`);
    loadScene(total >= targetTotal ? onSuccessScene : onFailScene);
};