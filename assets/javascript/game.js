//global arrays
var aryWord = ["new york", "los angeles", "chicago", "san antonio", "san diego", "dallas", "san jose", "phoenix", "houston", "philadelphia"];
var userGuessList = [];
var wordState = [];

//global variables
var guessesLeft = 6;
var wins = 0;
var winStop = false;

//assign word a random string from aryWord
var randomWord = Math.floor(Math.random() * aryWord.length);
var word = aryWord[randomWord];
wordState.length = word.length;

//audio variables
var correct = new Audio('assets/sounds/correct.mp3');
var incorrect = new Audio('assets/sounds/incorrect.mp3');
var yay = new Audio('assets/sounds/yay.mp3');
var boo = new Audio('assets/sounds/boo.mp3');

//give wordState initial values and return printable values without commas
function initWordState() {
    var html = "";
    for (var i = 0; i < wordState.length; i++) {
        if (word[i] != " ") {
            wordState[i] = "_ ";
            html += "_ ";
        }
        else {
            wordState[i] = " ";
            html += "&nbsp;&nbsp;";
        }
    }
    return html;
}
document.getElementById("word").innerHTML = initWordState();


document.onkeydown = function (event) {

    //only run onkeypress when player has guesses left
    if (guessesLeft > 0 && winStop == false) {

        var userGuess = event.key.toLowerCase();

        var inp = String.fromCharCode(event.keyCode);



        //check to see if character is a letter
        if (/[a-zA-Z]/.test(inp)) {

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
                        var letterExists = 1;
                    }
                }



                for (var i = 0; i < userGuessList.length; i++) {
                    if (" " + userGuess.toUpperCase() == userGuessList[i]) {
                        alert("You already guessed this letter");
                        return null;
                    }
                }


                if (letterExists == 1) {
                    if (word == didWin()) {
                        yay.play();
                    }
                    else {
                        correct.play();
                    }

                    return null;
                }
                else {
                    if (guessesLeft - 1 == 0) {
                        boo.play();
                    }
                    else {
                        incorrect.play();
                    }
                    userGuessList.push(" " + userGuess.toUpperCase());
                    return 0;
                }
            }



            //call checkLetter function & check to see if the letter is in the word
            if (checkLetter() == 0) {
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

            //convert wordState array to printable string
            var printStatus = "";
            for (var i = 0; i < wordState.length; i++) {
                if (wordState[i] == " ") {
                    printStatus += wordState[i] + "&nbsp;";
                }
                else {
                    printStatus += wordState[i] + " ";
                }
            }
            document.getElementById("word").innerHTML = printStatus;



            //convert wordState to string userWord to check against chosen word or phrase
            function didWin() {
                var userWord = "";
                for (var i = 0; i < wordState.length; i++) {
                    userWord += wordState[i];
                }
                return userWord;
            }


            //clear the win-lose div
            document.getElementById("win-lose").innerHTML = "";

            //user wins if userWord equals the word or phrase
            if (didWin() == word) {
                document.getElementById("win-lose").innerHTML = "<span id='reset'></span>";
                wins++;
                winStop = true;
                document.getElementById("wins").innerHTML = "Wins: " + wins;
                document.getElementById("reset").innerHTML = "You win! =)&nbsp;&nbsp;Click here to play again";
                reset();

            }

            //user loses if they guessed 6 times
            if (guessesLeft == 0) {
                document.getElementById("win-lose").innerHTML = "<span id='reset'></span>";
                document.getElementById("reset").innerHTML = "You lose. =(&nbsp;&nbsp;Click here to play again";
                reset();

            }
            document.getElementById("guesses-left").innerHTML = "Guesses left: " + guessesLeft;

            //reset function
            function reset() {
                document.getElementById("reset").onclick = function () {
                    randomWord = Math.floor(Math.random() * aryWord.length);
                    word = aryWord[randomWord];
                    wordState.length = word.length;

                    document.getElementById("word").innerHTML = initWordState();
                    guessesLeft = 6;
                    winStop = 0;
                    userGuessList = [];
                    document.getElementById("guesses-left").innerHTML = "Guesses left: " + guessesLeft;
                    document.getElementById("guesses").innerHTML = "Incorrect guesses: " + userGuessList;
                    document.getElementById("win-lose").innerHTML = "";
                    document.getElementById("pic").setAttribute("src", "assets/images/Hangman-0.png");

                };
            }

        }
    }


}