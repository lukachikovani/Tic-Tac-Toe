const playerFirstIndicatorBtn = document.querySelector("#playerFirstIndicator");
const playerSecondIndicatorBtn = document.querySelector("#playerSecondIndicator");
const allGameBoxes = document.querySelectorAll(".game-box");
const resetGamebtn = document.querySelector("#resetGame")
const firstPlayerInp = document.querySelector("#playerFirst");
const secondPlayerInp = document.querySelector("#playerSecond");
const submitPlayersInfoBtn = document.querySelector("#submitPlayersInfo");
var playerFirstTurn = true;
var playGame = false;
var playerFirst;
var playerSecond;

var winnerLogic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function getPlayerObj(playerName, playerInd) {
    return {
        playerIndicator: playerInd,
        playerName: playerName,
        playerScore: 0,
        inc: function () {
            this.playerScore++;
        }
    }
}


function changePlayerIndicator() {
    playerFirstIndicatorBtn.classList.toggle("btn-success");
    playerFirstIndicatorBtn.classList.toggle("btn-danger");
    playerSecondIndicatorBtn.classList.toggle("btn-success");
    playerSecondIndicatorBtn.classList.toggle("btn-danger");
}

function logPlayersActions(gameBoxIndex) {
    winnerLogic.forEach((winnerLogicItem, index) => {
        var gameBoxItemIndex = winnerLogicItem.indexOf(gameBoxIndex);
        if (gameBoxItemIndex >= 0)
            winnerLogic[index][gameBoxItemIndex] = playerFirstTurn ? "x" : "o";
    })
}

function checkForWinner() {
    var winning = {
        firstPlayerIsWinner: false,
        secondPlayerIsWinner: false,
        gameOver: false
    };

    // winnerLogic.some(winnerLogicItem => {
    //     winning.firstPlayerIsWinner = winnerLogicItem.every(o => o == "x");
    //     winning.secondPlayerIsWinner = winnerLogicItem.every(o => o == "o");
    // })
    for (var i = 0; i < winnerLogic.length; i++) {
        winning.firstPlayerIsWinner = winnerLogic[i].every(o => o == "x");
        winning.secondPlayerIsWinner = winnerLogic[i].every(o => o == "o");
        if (winning.firstPlayerIsWinner || winning.secondPlayerIsWinner) {
            break;
        }
    }

    winning.gameOver = winnerLogic.every(winnerLogicItem => winnerLogicItem.every(item => isNaN(Number(item))));

    return winning;
}


function getIconForGameBox() {
    return playerFirstTurn ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-o"></i>';
}

allGameBoxes.forEach((btnItem, index) => {
    btnItem.id = index;
    btnItem.addEventListener("click", function () {
        if (this.innerHTML.length == 0 && playGame) {
            this.innerHTML = getIconForGameBox();
            logPlayersActions(Number(this.id));
            playerFirstTurn = !playerFirstTurn;
            changePlayerIndicator();
            var weHaveWinner = checkForWinner();
            if (weHaveWinner.firstPlayerIsWinner) {
                swal("winner is " + playerFirst.playerName);
                playerFirst.inc();
                changeIndicators();
                playGame = false;
            } else if (weHaveWinner.secondPlayerIsWinner) {
                swal("winner is " + playerSecond.playerName);
                playerSecond.inc();
                changeIndicators();
                playGame = false;
            }
            else if (weHaveWinner.gameOver) {
                swal("Game Over");
                playGame = false;
            }
        }
    });
});



function resetPlayerIndicators() {
    playerFirstIndicatorBtn.classList.add("btn-success");
    playerFirstIndicatorBtn.classList.remove("btn-danger");
    playerSecondIndicatorBtn.classList.remove("btn-success");
    playerSecondIndicatorBtn.classList.add("btn-danger");
}

function addErroBorder(inp) {
    inp.classList.add("error-border")
}

function removeErrorBorder(inp) {
    inp.classList.remove("error-border")
}

function validateInputs() {
    if (firstPlayerInp.value == undefined || firstPlayerInp.value.length == 0) {
        addErroBorder(firstPlayerInp)
        return false;
    } else if (secondPlayerInp.value == undefined || secondPlayerInp.value.length == 0) {
        addErroBorder(secondPlayerInp)
        removeErrorBorder(firstPlayerInp);
        return false;
    }
    removeErrorBorder(secondPlayerInp)

    return true;
}

submitPlayersInfoBtn.addEventListener("click", function () {
    if (validateInputs()) {
        playGame = true;
        playerFirst = getPlayerObj(firstPlayerInp.value, "player1");
        playerSecond = getPlayerObj(secondPlayerInp.value, "player2");
        changeIndicators();
    }
});

function changeIndicators() {
    playerFirstIndicatorBtn.textContent = `${playerFirst.playerName} : ${playerFirst.playerScore}`
    playerSecondIndicatorBtn.textContent = `${playerSecond.playerName} : ${playerSecond.playerScore}`
}

resetGamebtn.addEventListener("click", function () {
    allGameBoxes.forEach(item => { item.innerHTML = "" });
    playGame = true;
    playerFirstTurn = true;
    resetPlayerIndicators();
    winnerLogic = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
})

