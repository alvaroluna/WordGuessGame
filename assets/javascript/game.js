//                               //
// GAME LOGIC / HELPER FUNCTIONS //
//                               //

function WriteSecretWordUI(secretWord) {
    var idStr = "dashedSecretWord";
    var hiddenCharacter = "_ ";
    var dashedWord = "";

    for (i = 0; i < secretWord.length; i++) {
        dashedWord = dashedWord + hiddenCharacter
    }

    var element = document.getElementById(idStr);
    element.innerHTML = dashedWord;

    // write dashed
    return (dashedWord)
}

function UpdateSecretWordUI() {

}

// CHOOSE RANDOM WORD //
function RandomWord() {
    var words = ["caat", "doog", "biird", "rabbit", "rhiino"];
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
        return charIndices;
    }
    else {
        return false;
    }
};

// DISPLAY HOW MUCH OF WORD HAS BEEN SOLVED
function HowMuchOfStringIsGuessed() {
    // 
    var foo = (a, b, c) => "The lazy ${a} ${b} over the ${c}"
    return foo
}

// UTILITIES //
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// var hello = "Hello World";
// alert(hello.replaceAt(2, "!!"));

//                       //
// MAIN / EVENT HANDLERS //
//                       //
function Main() {
    // word to solve
    var secretWord = RandomWord();

    // guess limit and current count
    var guessCount = 0;
    var guessLimit = (secretWord.length * 3);

    // "score" variables - to track if word is solved
    var score = 0;
    var scoreToWin = secretWord.length;

    // game victory/defeat variables
    var youLose = false;
    var youWin = false;

    var gamesWon = 0;
    var gamesLost = 0;

    function ResetGameSettings() {
        youLose = false;
        youWin = false;
        guessCount = 0;
        unRepeatableLetters = [];
        secretWord = RandomWord();
        score = 0;
        scoreToWin = secretWord.length;
        WriteSecretWordUI(secretWord);
    }

    // initially set UI
    var dashedSecretWord = WriteSecretWordUI(secretWord);
    console.log(dashedSecretWord);

    // forever loop - listens for keyboard inputs
    var unRepeatableLetters = [];
    document.onkeyup = function (event) {
        // do everything below when key is pressed...
        var letter = event.key.toLowerCase();

        // do not allow a previous correct letter to be selected again.
        if (letter) {
            var charResult = IsCharInStr(secretWord, letter);
            console.log(charResult)
            if (charResult) {
                // can't repeat letters | record correctly guessed characters
                for (i = 0; i < charResult.length; i++) {
                    unRepeatableLetters.push(letter);
                }
                // count the number of unique guesses
                guessCount++;

                // event player wins; unRepeatableLetters ='s secretWord length
                if (unRepeatableLetters.length === secretWord.length) {
                    // inform player she/he won
                    youWin = true;
                    alert("You Win!");

                    // tally won game score
                    gamesWon++;

                    // reset stuff
                    ResetGameSettings()
                }
            }
            else {
                guessCount++;
            }
        }

        // event player loses; exceeds limits
        if (guessCount > guessLimit) {
            // inform player she/he lost
            youLose = true;
            alert("You Lose!");

            // tally lost game score
            gamesLost++;

            // reset stuff
            ResetGameSettings()
        }

        // print tests...
        console.log(secretWord);
        console.log("guessCount: ", guessCount);
        console.log(unRepeatableLetters);
        console.log(dashedSecretWord);
    }
};

// program entry point
Main()
