var gameObj = {
    RandomWord: function () {
        var words = ["cat", "dog", "bird", "rabbit", "rhino"];
        var word = words[Math.floor(Math.random() * words.length)];
        this.secretWord = word
        // return word;
    },

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

var a = gameObj.RandomWord()
a.secretWord