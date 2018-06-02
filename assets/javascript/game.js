//global variables
var word = "the word";
var userGuessList = [];
var wordState = [word.length];
var guessesLeft = 6;



function initWordState() {

    var html = "";
    for (var i = 0; i < word.length; i++) {
        html += "_ ";
    }
    return html;
}

document.getElementById("word").innerHTML = initWordState();


document.onkeyup = function (event) {

    var userGuess = event.key;

    //Put letter in wordState array if it's in word and check to see if letter has been guessed, return 0 if letter isn't in word
    function checkLetter() {

        for (var i = 0; i < wordState.length; i++) {
            if (userGuess == wordState[i]) {
                alert("You already guessed this letter");
                return null;
            }
        }

        for (var i = 0; i < word.length; i++) {
            if (userGuess == word[i]) {
                wordState[i] = userGuess;
                return null;
            }
        }

        for (var i = 0; i < userGuessList.length; i++) {
            if (" " + userGuess == userGuessList[i]) {
                alert("You already guessed this letter");
                return null;
            }
        }

        userGuessList.push(" " + userGuess);
        return 0;
    }

    //call checkLetter function & check to see if the letter is in the word
    if (checkLetter() == 0) {
        alert("Letter is not in word");
        guessesLeft--;
        document.getElementById("guesses").innerHTML = "Incorrect guesses: " + userGuessList;

        switch (guessesLeft) {
            case 5:
            document.getElementById("pic").setAttribute("src", "assets/images/Hangman-1.png");
            break;
            case 4:
            document.getElementById("pic").setAttribute("src", "assets/images/Hangman-2.png");
            break;
            case 3:
            document.getElementById("pic").setAttribute("src", "assets/images/Hangman-3.png");
            break;
            case 2:
            document.getElementById("pic").setAttribute("src", "assets/images/Hangman-4.png");
            break;
            case 1:
            document.getElementById("pic").setAttribute("src", "assets/images/Hangman-5.png");
            break;
            case 0:
            document.getElementById("pic").setAttribute("src", "assets/images/Hangman-6.png");
            break;
    }
}




var userWord = "";
for (var i = 0; i < wordState.length; i++) {
    userWord += wordState[i];
}

if (userWord == word) {
    document.write("you win!");
}

if (guessesLeft == 0) {
    document.write("you lose.");
}



console.log(userWord);
console.log(wordState);


};