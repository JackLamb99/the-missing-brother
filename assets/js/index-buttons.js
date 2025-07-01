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
    localStorage.removeItem('missingBrotherSave'); // Clear any existing save data
    window.location.href = 'game.html'; // Redirect to game page
});

// Event - "Continue Game" clicked
continueGameBtn.addEventListener('click', () => {
    const save = localStorage.getItem('missingBrotherSave');
    if (save) {
        window.location.href = 'game.html'; // Redirect to game page if save exists
    } else {
        noSaveModal.show(); // Show modal if no save found
    }
});

// Event - Start new game from "no save" modal
startNewGameFromNoSave.addEventListener('click', () => {
    localStorage.removeItem('missingBrotherSave'); // Clear any existing save data
    window.location.href = 'game.html'; // Redirect to game page
});
