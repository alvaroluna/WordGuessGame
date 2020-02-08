//                               //
// GAME LOGIC / HELPER FUNCTIONS //
//                               //

// CHOOSE RANDOM WORD //
function RandomWord() {
    var words = ["cat", "dog", "bird", "rabbit", "rhino"];
    var word = words[Math.floor(Math.random() * words.length)]
    return word;
};

// IS CHARACTER IN STRING? //
function IsCharInStr(str, char) {
    // is character in string?
    var charInStr = str.includes(char);

    // at what index is character in?
    if (charInStr) {
        // var charIndex = str.indexof(char);

        var charIndices = [];
        for (var i = 0; i < str.length; i++) {
            if (str[i] === char) charIndices.push(i);
        };
        // return charIndices;
        return true;
    }
    else {
        return false;
    };
};

// DISPLAY HOW MUCH OF WORD HAS BEEN SOLVED
function HowMuchOfStringIsGuessed() {
    // 
    var foo = (a, b, c) => "The lazy ${a} ${b} over the ${c}"
    return foo
}

//                       //
// MAIN / EVENT HANDLERS //
//                       //
function Main() {
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
    }

    // forever loop - listens for keyboard inputs
    document.onkeyup = function (event) {
        // do everything below when key is pressed...
        var letter = event.key.toLowerCase();

        var unRepeatableLetters = [];
        if (letter) {
            var charResult = IsCharInStr(secretWord, letter);
            console.log(charResult)
            if (charResult) {
                // length of list is score

                // can't repeat letters

                // record correctly guessed characters

                // count the number of unique guesses
                gameObj[guessCount]++;
            }
            else {
                gameObj[guessCount]++;
            }
        }

        console.log(secretWord);
        console.log("guessCount: ", gameObj[guessCount]);
        // console.log(HowMuchOfStringIsGuessed())

        // event player loses; exceeds limits
        if (gameObj[guessCount] > gameObj[guessLimit]) {
            // inform player she/he lost
            gameObj[youLose] = true;
            alert("You Lose!");

            // tally lost game score
            gameObj[gamesLost]++;

            // reset stuff
            secretWord = RandomWord();
            unRepeatableLetters = [];
            score = 0;
            scoreToWin = secretWord.length;
            console.log(secretWord);
        }

        // event player wins; level up? obscure architects?
        if (youWin === true) {
            // stuff happens

            // reset stuff
            secretWord = RandomWord();
            unRepeatableLetters = [];
            score = 0;
            scoreToWin = secretWord.length;
            console.log(secretWord);
        }
    }
};

// program entry point
Main()
