'use strict'

const WALL = '<img style= width:25px src="img/wall.png" />'
const FOOD = '.'
const EMPTY = ''
const POWER_FOOD = '<img style= width:25px src="img/chiken.png" />'
const CHERRY = '<img style= width:25px src="img/cherry.png" />'


var foodCounter = 0
var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var isVictory = false
function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    printMat(gBoard, '.board-container')
    gGame.isOn = true

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
    foodCounter = 0
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

            if (gBoard[i][j] === ' ' && gBoard[i][j] !== WALL) {
                if (gBoard[i][j] !== PACMAN && gBoard[i][j] !== GHOST)
                    emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}



function drawNum(nums) {
    // console.log(`gNums.length:`, gNums.length)
    var num = getRandomInt(0, nums.length)
    var removedNum = nums.splice(num, 1)
    // console.log(`gNums:`, gNums)
    return removedNum
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}