let word;
let counter;
let secretArray;
let guessArray;
let usedArray;

document.querySelector("#reset-btn").addEventListener('click', newGame);
document.querySelector("#guess-btn").addEventListener('click', makeGuess);

const container = document.querySelector("#flex-container");
const input = document.querySelector("#input");
const count = document.querySelector("#counter");
const helpText = document.querySelector("#text");
const letter = document.querySelector("#letter");


function newGame() {
    counter = 0;
    word = window.prompt('Enter a word')
    secretArray = [];
    guessArray = [];
    usedArray = [];

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    count.innerHTML = 8;
    helpText.innerHTML = 'Make a guess!';
    letter.innerHTML = '';
    input.disabled = false;
    document.querySelector("#guess-btn").disabled = false;
    
    for (let i = 0; i < word.length; i++) {
        secretArray.push(word[i]);

        let j = document.createElement("li");
        j.classList.add("flex-item");
        container.appendChild(j);
    }
    //console.log(secretArray);
}

function makeGuess() {
    let guess = input.value;

    if (guess.length > 1) {
        if (guess == word) {
            win();
        }
        else {
            counter++;
            count.innerHTML = `${8 - counter}`
            helpText.innerHTML = `${guess} is wrong!`;
        }
    }
    else {
        if (usedArray.includes(guess)) {
            helpText.innerHTML = `${guess} is already used!`;
        }
        else {
            if (secretArray.includes(guess)) {
                helpText.innerHTML = (`${guess} is in array`);
                for (let i = 0; i < secretArray.length; i++) {
                    if (guess == secretArray[i]) {
                        guessArray.splice(i, 0, secretArray[i]);
                        container.childNodes[i].innerHTML = guess;
                    }
                }
            }
            else {
                helpText.innerHTML = (`${guess} not in array`);
                counter++;
                count.innerHTML = `${8 - counter}`
            }
            usedArray.push(guess);
            letter.innerHTML = `${letter.innerHTML} ${guess},`;
        }
    }

    input.value = '';

    if (guessArray.length == secretArray.length) {
        win();
    }

    if (counter == 8) {
        lose();
    }
}

function win() {
    endGame('You win!');
}

function lose() {
    endGame('You lose!');
}

function endGame(message) {
    helpText.innerHTML = message;
    input.disabled = true;
    document.querySelector("#guess-btn").disabled = true;
}

newGame();