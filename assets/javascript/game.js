//global variables
var word = "new york";
var userGuessList = [];
var wordState = [];
wordState.length = word.length;
var guessesLeft = 6;
var wins = 0;
var winStop = false;



console.log(wordState);



function initWordState() {

    var html = "";
    for (var i = 0; i < wordState.length; i++) {
        if (word[i] != " ") {
            wordState[i] = "_ ";
            html += "_ ";
        }
        else {
            wordState[i] = " ";
            html += "&nbsp;";
        }
    }
    return html;
}

document.getElementById("word").innerHTML = initWordState();


    document.onkeypress = function (event) {
        
        if (guessesLeft > 0 && winStop == false) {
            
        var userGuess = event.key.toLowerCase();
        console.log(guessesLeft);

        var inp = String.fromCharCode(event.keyCode);

        //only run script when player has gueses left

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
                        return null;
                    }
                }

                for (var i = 0; i < userGuessList.length; i++) {
                    if (" " + userGuess.toUpperCase() == userGuessList[i]) {
                        alert("You already guessed this letter");
                        return null;
                    }
                }

                userGuessList.push(" " + userGuess.toUpperCase());
                return 0;
            }

            //call checkLetter function & check to see if the letter is in the word
            if (checkLetter() == 0) {
                //alert("Letter is not in word");
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
            var userWord = "";
            for (var i = 0; i < wordState.length; i++) {
                userWord += wordState[i];
            }

            document.getElementById("win-lose").innerHTML = "";

            //user wins if userWord equals the word or phrase
            if (userWord == word) {
                document.getElementById("win-lose").innerHTML = "You win! =) <span id='reset'></span>";
                wins++;
                winStop = true;
                document.getElementById("wins").innerHTML = "Wins: " + wins;
                document.getElementById("reset").innerHTML = "Play again";

            }

            //user loses if they guessed 6 times
            if (guessesLeft == 0) {
                document.getElementById("win-lose").innerHTML = "You lose. =( <span id='reset'></span>";
                document.getElementById("reset").innerHTML = "Play again";

            }



            document.getElementById("guesses-left").innerHTML = "Guesses left: " + guessesLeft;



            //console.log(userWord);
            //console.log(wordState);
        }
    }


}