console.log("Welcome to Tic Tac Toe");

const music = new Audio("bgm.mp3");
const turnm = new Audio("move.mp3");
const game_over = new Audio("game_over.mp3");

let turn = "X";
let gameOver = false;

// Function to change turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win or draw
const checkWin = () => {
    const boxtext = document.getElementsByClassName("boxtext");
    const wins = [
        [0, 1, 2, 0, 5, 0], [2, 5, 8 , 10 , 15 , 90],
        [6, 7, 8, 0, 25, 0], [0, 3, 6 , -10 , 15 , 90],
        [1, 4, 7 , 0 , 15 , 90], [3, 4, 5, 0, 15, 0],
        [0, 4, 8 , 0 , 15 , 45], [2, 4, 6 , 0 , 15 , -45]
    ];

    let isDraw = true;

    wins.forEach(e => {
        if (boxtext[e[0]].innerText === boxtext[e[1]].innerText && 
            boxtext[e[1]].innerText === boxtext[e[2]].innerText && 
            boxtext[e[1]].innerText !== "") {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameOver = true;
            game_over.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "12rem";
            document.querySelector('.line').style.width = `30vw`;
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            isDraw = false; // If there's a winning combination, it's not a draw
        }
    });

    // Check for a draw if no winning combination found
    if (isDraw) {
        let allBoxesFilled = true;
        Array.from(boxtext).forEach(box => {
            if (box.innerText === "") {
                allBoxesFilled = false;
                return;
            }
        });

        if (allBoxesFilled) {
            document.querySelector('.info').innerText = "It's a draw!";
            gameOver = true;
            // You can add any additional logic for handling a draw here
        }
    }
};

// Debounce function
const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        clearTimeout(debounceTimer);
        const context = this;
        const args = arguments;
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

// Main Game Logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    const boxtexts = element.querySelector('.boxtext');
    element.addEventListener('click', debounce(() => {
        if (boxtexts.innerText === '') {
            boxtexts.innerText = turn;
            turn = changeTurn();
            turnm.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    }, 300));  // 300 milliseconds debounce added
});

// Reset button
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    const boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameOver = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0";
    document.querySelector('.line').style.width = `0vw`;
});
