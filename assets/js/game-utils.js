function resetGameData() {
    const keysToRemove = [
        'playerName',
        'pronounSubject',
        'pronounObject',
        'pronounPossessive',
        'pronounReflexive',
        'currentScene',
        'hasFlatKeyItem',
        'hasBetslipClue',
    ];

    keysToRemove.forEach(key => localStorage.removeItem(key));
}