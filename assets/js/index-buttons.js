// Set landing page background
setBackground('index');
window.currentSceneName = 'index';

// Buttons
const newGameBtn = document.getElementById('newGameBtn');
const continueGameBtn = document.getElementById('continueGameBtn');
const confirmNewGameBtn = document.getElementById('confirmNewGameBtn');
const startNewGameFromNoSave = document.getElementById('startNewGameFromNoSave');

// Modals
const confirmNewGameModal = new bootstrap.Modal(document.getElementById('confirmNewGameModal'));
const noSaveModal = new bootstrap.Modal(document.getElementById('noSaveModal'));

// Event - "New Game" clicked
newGameBtn.addEventListener('click', () => {
    confirmNewGameModal.show(); // Show confirmation modal for starting a new game
});

// Event - Confirm start new game
confirmNewGameBtn.addEventListener('click', () => {
    resetGameData(); // Clear any existing save data
    window.location.href = 'game.html'; // Redirect to game page
    confirmNewGameModal.hide(); // Hide confirmation modal
});

// Event - Confirm start new game
confirmNewGameBtn.addEventListener('click', () => {
    confirmNewGameModal.hide(); // Hide 'confirm new game' modal
    setTimeout(() => {
        resetGameData(); // Clear any existing save data
        window.location.href = 'game.html'; // Redirect to game page
    }, 100); // Delay to allow Bootstrap to finish hiding modal
});

// Event - "Continue Game" clicked
continueGameBtn.addEventListener('click', () => {
    const hasSave = localStorage.getItem('currentScene') && localStorage.getItem('playerName');
    if (hasSave) {
        window.location.href = 'game.html'; // Redirect to game page if save exists
    } else {
        noSaveModal.show(); // Show modal if no save found
    }
});

// Event - Start new game from 'no save' modal
startNewGameFromNoSave.addEventListener('click', () => {
    noSaveModal.hide(); // Hide 'no save' modal
    setTimeout(() => {
        resetGameData(); // Clear any existing save data
        window.location.href = 'game.html'; // Redirect to game page
    }, 100); // Delay to allow Bootstrap to finish hiding modal
});