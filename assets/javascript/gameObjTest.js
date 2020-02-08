var gameObj = {
    RandomWord: function () {
        var words = ["cat", "dog", "bird", "rabbit", "rhino"];
        var word = words[Math.floor(Math.random() * words.length)];
        return word;
    },
    secretWord: this.RandomWord(),

    // guess limit and current count
    guessCount: 0,
    guessLimit: (this.secretWord.length * 3),

    // "score" variables - to track if word is solved
    score: 0,
    scoreToWin: this.secretWord.length,

    // game victory/defeat variables
    youLose: false,
    youWin: false,

    gamesWon: 0,
    gamesLost: 0
};