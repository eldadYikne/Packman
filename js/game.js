'use strict'

const WALL = '<img style= width:25px src="img/wall.png" />'
const FOOD = '.'
const EMPTY = ''
const POWER_FOOD = '<img style= width:25px src="img/chiken.png" />'
const CHERRY = '🍒'
var cherryInt

var foodCounter = 0
var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var isVictory = false
function init() {
    
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    isVictory = false
    printMat(gBoard, '.board-container')
    gGame.isOn = true

     cherryInt = setInterval(() => {
        getCgerry()
    }, 5000)


}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            foodCounter++

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                foodCounter--
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8) {

                board[i][j] = POWER_FOOD
                foodCounter--
            }

            if (i === 5 && j === 2) {
                board[i][j] = CHERRY
                foodCounter--
            }

        }

    }

    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {

    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    var elRstBtn = document.querySelector('.gameOver')
    if (isVictory) {
        var strHTML = ` Victory! `
        strHTML += `<button onclick="restGame()" >Restart Game</button>`
        elRstBtn.innerHTML = strHTML
        elRstBtn.style.display = 'block'
    } else {
        var strHTML = ` Game Over! `
        strHTML += `<button onclick="restGame()" >Restart Game</button>`
        elRstBtn.innerHTML = strHTML
        elRstBtn.style.display = 'block'
    }
    gGhosts=[]
    foodCounter = 0
    collectedFood=0
    clearInterval(cherryInt)
}

function restGame() {
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    var elRstBtn = document.querySelector('.gameOver')
    elRstBtn.style.display = 'none'
    init()
}

function getEmptyCells() {
    var emptyCells = []
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {

            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (emptyCells.length === 0) return 0
    return emptyCells
}

function getCgerry() {

    var emptyCells = getEmptyCells()
    if (emptyCells.length===0) return
    var cherryIdx = drawNum(emptyCells)
    console.log(cherryIdx);
    gBoard[cherryIdx[0].i][cherryIdx[0].j] = CHERRY
    console.log( gBoard[cherryIdx[0].i][cherryIdx[0].j]);
    renderCell(cherryIdx[0], CHERRY)
}


function drawNum(nums) {
    var num = getRandomInt(0, nums.length)
    var removedNum = nums.splice(num, 1)
    // console.log(`gNums:`, gNums)
    console.log(removedNum)
    return removedNum
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}