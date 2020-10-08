import _ from "lodash";

const CELLS = 15;

const buttonNumber = document.querySelector("#newNumber");
const extractedNumber = document.querySelector(".extracted-number");

const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");

const ALL_NUMBERS = _.shuffle(_.range(1, 91));
let playerNumbers = _.sampleSize(_.shuffle(ALL_NUMBERS), CELLS);
let computerNumbers = _.sampleSize(_.shuffle(ALL_NUMBERS), CELLS);

let bingoNumbers = _.shuffle(_.range(1, 91));

function checkNumberInBoard(number) {
    const cells = document.querySelectorAll(".cell-number.n" + number);

    for (let i = 0; i < cells.length; i++) {
        cells[i].id = "marked";
    }

    if (cells.length > 0) { return number; };
}

function takeOneNumber() {
    const number = bingoNumbers.pop();
    _.pull(bingoNumbers, number);
    extractedNumber.innerHTML = number;

    return number;
}

function fillUserBoard() {
    computerNumbers.sort(function(a, b) { return a - b; });

    for (let i = 0; i < playerNumbers.length; i++) {
        const div = document.createElement("div");
        div.className = "cell-number n" + playerNumbers[i];
        div.textContent = playerNumbers[i];

        playerBoard.appendChild(div);
    }
}

function fillComputerBoard() {
    computerNumbers.sort(function(a, b) { return a - b; });

    for (let i = 0; i < computerNumbers.length; i++) {
        const div = document.createElement("div");
        div.className = "cell-number n" + computerNumbers[i];
        div.textContent = computerNumbers[i];

        computerBoard.appendChild(div);
    }
}

function start() {
    fillUserBoard();
    fillComputerBoard();

    console.log("ONCE STARTED ARE");
    console.log("user: ", playerNumbers);
    console.log("comp: ", computerNumbers);
}

function checkWinner() {
    if ((playerNumbers.length === 0) && (computerNumbers.length === 0)) {
        alert("TIE!");
        window.location.reload();
    } else {
        if ((playerNumbers.length === 0) && (computerNumbers.length !== 0)) {
            alert("USER WINS!");
            window.location.reload();
        } else {
            if ((playerNumbers.length !== 0) && (computerNumbers.length === 0)) {
                alert("COMPUTER WINS!");
                window.location.reload();
            }
        }
    }
}

function clickButton() {
    const number = takeOneNumber();
    const markedNumber = checkNumberInBoard(number);

    if (markedNumber) {
        console.log("NEXT NUMBER IS ", markedNumber);
        if (playerNumbers.includes(markedNumber)) { _.pull(playerNumbers, markedNumber); };
        if (computerNumbers.includes(markedNumber)) { _.pull(computerNumbers, markedNumber); };

        console.log("before checkWinner user: ", playerNumbers);
        console.log("before checkWinner comp: ", computerNumbers);

        checkWinner();
    }
}

buttonNumber.addEventListener("click", clickButton);

window.onload = start();
