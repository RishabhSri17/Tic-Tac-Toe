console.log("Welcome to Tic Tac Toe")
let music = new Audio("bgm.mp3")
let turnm = new Audio("move.mp3")
let game_over = new Audio("game_over.mp3")

let turn = "X"
let gameOver = false;

//Function to change turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

//function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 0, 5, 0], [2, 5, 8 , 10 , 15 , 90],
        [6, 7, 8, 0, 25, 0], [0, 3, 6 , -10 , 15 , 90],
        [1, 4, 7 , 0 , 15 , 90], [3, 4, 5, 0, 15, 0],
        [0, 4, 8 , 0 , 15 , 45], [2, 4, 6 , 0 , 15 , -45]
    ]

    wins.forEach(e => {
        if (boxtext[e[0]].innerText === boxtext[e[1]].innerText && boxtext[e[1]].innerText === boxtext[e[2]].innerText && boxtext[e[1]].innerText != 0) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameOver = true;
            game_over.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "12rem";
            document.querySelector('.line').style.width= `30vw`
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
        }
    })
}

//Main Game  Logic 
/* music.play(); */
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtexts = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtexts.innerText === '') {
            boxtexts.innerText = turn;
            turn = changeTurn();
            turnm.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

//reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for" + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0";
    document.querySelector('.line').style.width= `0vw`
})
