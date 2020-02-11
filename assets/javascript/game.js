//                               //
// GAME LOGIC / HELPER FUNCTIONS //
//                               //

// DOM FUNCTIONS
function WriteSecretWordUI(secretWord) {
    var idStr = "dashedSecretWord";
    var hiddenCharacter = "_";
    var dashedWord = "";

    for (i = 0; i < secretWord.length; i++) {
        dashedWord = dashedWord + hiddenCharacter
    }

    // write dashed to DOM
    var element = document.getElementById(idStr);
    element.innerHTML = dashedWord;

    // return dashed string for use; maybe
    return (dashedWord)
};

function UpdateSecretWordUI(dashedWord, char, indexList) {
    var idStr = "dashedSecretWord";

    var dashedWord = dashedWord.split("");
    for (i = 0; i < indexList.length; i++) {
        dashedWord[indexList[i]] = char;
    }
    dashedWord = dashedWord.join("");

    // write dashed to DOM
    var element = document.getElementById(idStr);
    element.innerHTML = dashedWord;

    return dashedWord;
};

function UpdateHTML_DOM(idStr, text) {
    var element = document.getElementById(idStr);
    element.innerHTML = text;
};

// CHOOSE RANDOM WORD
function RandomWord() {
    var words = ["salk", "kimbell", "exeter", "jatiya", "yale", "richards",
        "fisher", "esherick", "fdr", "trenton",];
    var word = words[Math.floor(Math.random() * words.length)]
    return word;
};

// IS CHARACTER IN STRING?
function IsCharInStr(str, char) {
    // is character in string?
    var charInStr = str.includes(char);

    if (charInStr) {
        // at what index is character in?
        var charIndices = [];
        for (var i = 0; i < str.length; i++) {
            if (str[i] === char) {
                charIndices.push(i)
            }
        };

        // return charIndices;
        return charIndices;
    }
    else {
        return false;
    }
};

//                       //
// MAIN / EVENT HANDLERS //
//                       //
function Main() {
    function ResetGameSettings() {
        youLose = false;
        youWin = false;
        unRepeatableLetters = [];
        charDict = {};
        secretWord = RandomWord();
        guessCount = 0;
        guessLimit = (secretWord.length * 2);

        // update DOM
        UpdateHTML_DOM("guessCount", "Guess Count: " + guessCount);
        UpdateHTML_DOM("guessLimit", "Guess Limit: " + guessLimit);
        dashedSecretWord = WriteSecretWordUI(secretWord);
    };

    // word to solve
    var secretWord = RandomWord();

    // guess limit and current count
    var guessCount = 0;
    var guessLimit = (secretWord.length * 2);

    // display guess limit for the current game
    UpdateHTML_DOM("guessLimit", "Guess Limit: " + guessLimit);

    // "score" variables - to track if word is solved
    var gamesWon = 0;
    var gamesLost = 0;

    // game victory/defeat variables
    var youLose = false;
    var youWin = false;

    // initially set UI
    var dashedSecretWord = WriteSecretWordUI(secretWord);

    // forever loop - listens for keyboard inputs
    var unRepeatableLetters = []; // THIS IS THE VARIABLE TO VERIFY A WIN!
    var charDict = {};
    document.onkeyup = function (event) {
        // do everything below when key is pressed...
        var letter = event.key.toLowerCase();

        // do not allow a previous correct letter to be selected again.
        if (letter) {
            var charResult = IsCharInStr(secretWord, letter);
            if (charResult && unRepeatableLetters.includes(letter) === false) {
                // create a dictionary of indices of found characters
                charDict[letter] = charResult;

                // can't repeat letters | record ALL correct characters 4 WIN!
                for (i = 0; i < charResult.length; i++) {
                    unRepeatableLetters.push(letter);
                }

                // count the number of unique guesses
                guessCount++;
                UpdateHTML_DOM("guessCount", "Guess Count: " + guessCount);

                // update how much of word has been solved in UI
                dashedSecretWord = UpdateSecretWordUI(dashedSecretWord, letter, charResult);

                // event player wins; unRepeatableLetters ='s secretWord length
                if (unRepeatableLetters.length === secretWord.length) {
                    // inform player she/he won
                    youWin = true;

                    setTimeout(function () { alert("You Win!"); }, 500)

                    // tally won game score
                    gamesWon++;
                    UpdateHTML_DOM("gamesWon", "Games Won: " + gamesWon);

                    // reset game
                    setTimeout(ResetGameSettings, 1000);
                }
            }
            else {
                guessCount++;
                UpdateHTML_DOM("guessCount", "Guess Count: " + guessCount);
            }
        }

        // event player loses; exceeds limits
        if (guessCount > guessLimit) {
            // inform player she/he lost
            youLose = true;
            alert("You Lose!");

            // reset game
            ResetGameSettings()

            // tally lost game score
            gamesLost++;
            UpdateHTML_DOM("gamesLost", "Games Lost: " + gamesLost);
        }

        function Print() {
            // print tests...
            console.log(letter);
            console.log("un-repeatable letters: ", unRepeatableLetters);
            console.log(charDict)
            for (var keys in charDict) {
                console.log(charDict[keys]);
            }
            console.log("secret word: " + secretWord);
            console.log("guessCount: ", guessCount);
            console.log("dashed secret word: " + dashedSecretWord);
        }
        Print()
    }
};

// program entry point
Main();