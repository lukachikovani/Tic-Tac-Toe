const fullPage = document.querySelector('section');
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const submitButton = document.querySelector('.submit-btn');
const resetButton = document.querySelector('.reset-btn');
const player1Button = document.querySelector('#player1');
const player2Button = document.querySelector('#player2');
const gameTable = document.querySelector('.game-table');
const gameBox = document.querySelectorAll('.game-box');
const resultBox = document.querySelector('.result');
const resultText = document.querySelector('.result-text');
const resultButton = document.querySelector('.result-btn');

const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');
const box5 = document.querySelector('#box5');
const box6 = document.querySelector('#box6');
const box7 = document.querySelector('#box7');
const box8 = document.querySelector('#box8');
const box9 = document.querySelector('#box9');

let player1Score = 0;
let player2Score = 0;
let currentPlayer = 'X';


[input1, input2].forEach(input => {
    input.addEventListener('click', () => {
        input1.style.border = input === input1 ? '3px solid #3f42e5' : '3px solid transparent';
        input2.style.border = input === input2 ? '3px solid #3f42e5' : '3px solid transparent';
    });
});

submitButton.addEventListener('click', () => {
    if(input1.value !== '' && input2.value !== '') {
        localStorage.setItem('player1', input1.value);
        localStorage.setItem('player2', input2.value);

        player1Button.innerHTML = `${input1.value}: ${player1Score}`;
        player2Button.innerHTML = `${input2.value}: ${player2Score}`;
        startGame();
    }else if(input2.value !== '' && input1.value === ''){
        input1.style.border = '3px solid red';
    }else if(input1.value !== '' && input2.value === ''){
        input2.style.border = '3px solid red';
    }else {
        input2.style.border = '3px solid red';
        input1.style.border = '3px solid red';
    }
})

function startGame() {
    submitButton.disabled = true
    gameBox.forEach((box) => {
        box.addEventListener('click', (e) => {
            box.classList.add('xo');
            box.innerHTML = currentPlayer;
            e.target.disabled = true;

            function switchPlayer() {
                if(box.innerHTML === 'X') {
                    currentPlayer = 'O';
                    player1Button.style.background = '#872C3B';
                    player2Button.style.background = '#198754';
                }else if(box.innerHTML === 'O') {
                    currentPlayer = 'X';
                    player1Button.style.background = '#198754';
                    player2Button.style.background = '#872C3B';
                }
            }
            switchPlayer();
            isWinner();
        })
    })
}

let winner = '';

function isWinner() {
    if(
        (box1.innerHTML === 'X' && box2.innerHTML === 'X' && box3.innerHTML === 'X') ||
        (box1.innerHTML === 'X' && box4.innerHTML === 'X' && box7.innerHTML === 'X') ||
        (box1.innerHTML === 'X' && box5.innerHTML === 'X' && box9.innerHTML === 'X') ||
        (box2.innerHTML === 'X' && box5.innerHTML === 'X' && box8.innerHTML === 'X') ||
        (box3.innerHTML === 'X' && box6.innerHTML === 'X' && box9.innerHTML === 'X') ||
        (box3.innerHTML === 'X' && box5.innerHTML === 'X' && box7.innerHTML === 'X') ||
        (box4.innerHTML === 'X' && box5.innerHTML === 'X' && box6.innerHTML === 'X') ||
        (box7.innerHTML === 'X' && box8.innerHTML === 'X' && box9.innerHTML === 'X')
    ){
        console.log('1 is winner')
        player1Score++;
        player1Button.innerHTML = `${input1.value}: ${player1Score}`;
        gameBox.forEach(box => box.disabled = true);
        winner = input1.value;
        resultText.innerHTML = `${winner} is the winner!`;
        showResult();
    }else if(
        (box1.innerHTML === 'O' && box2.innerHTML === 'O' && box3.innerHTML === 'O') ||
        (box1.innerHTML === 'O' && box4.innerHTML === 'O' && box7.innerHTML === 'O') ||
        (box1.innerHTML === 'O' && box5.innerHTML === 'O' && box9.innerHTML === 'O') ||
        (box2.innerHTML === 'O' && box5.innerHTML === 'O' && box8.innerHTML === 'O') ||
        (box3.innerHTML === 'O' && box6.innerHTML === 'O' && box9.innerHTML === 'O') ||
        (box3.innerHTML === 'O' && box5.innerHTML === 'O' && box7.innerHTML === 'O') ||
        (box4.innerHTML === 'O' && box5.innerHTML === 'O' && box6.innerHTML === 'O') ||
        (box7.innerHTML === 'O' && box8.innerHTML === 'O' && box9.innerHTML === 'O')
    ){
        console.log('2 is winner')
        player2Score++;
        player2Button.innerHTML = `${input2.value}: ${player2Score}`;
        gameBox.forEach(box => box.disabled = true);
        winner = input2.value;
        resultText.innerHTML = `${winner} is the winner!`;
        showResult();
    }else {
        checkDraw()
    }
}
isWinner();

function checkDraw() {
    let checkedBoxes = 0;
    gameBox.forEach(box => {
        if(box.innerHTML === 'X' || box.innerHTML === 'O'){
            checkedBoxes++;
        }
    })
    if(checkedBoxes === 9) {
        console.log('draw')
        resultText.innerHTML = `Draw!`;
        gameBox.forEach(box => box.disabled = true);
        showResult()
    }
}


function reset() {
    currentPlayer = 'X'
    gameBox.forEach((box) => {
        box.innerHTML = '';
        gameBox.forEach(box => box.disabled = false);
        box.classList.remove('xo');
    })
    player1Button.style.background = '#198754';
    player2Button.style.background = '#872C3B';
}

resetButton.addEventListener('click', reset)

function showResult() {
    resultBox.style.display = 'block';
    fullPage.style.opacity = '0.2';
}

resultButton.addEventListener('click', () => {
    resultBox.style.display = 'none';
    fullPage.style.opacity = '1';
})
