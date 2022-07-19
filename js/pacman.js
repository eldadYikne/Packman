'use strict'

const PACMAN = '😷';
var gPacman;
var isPowerFull = false
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    foodCounter--
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === POWER_FOOD) {
        if (isPowerFull) return
        updateScore(1)
        superMod()

    }


    if (nextCell === GHOST && !isPowerFull) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    } else if (nextCell === GHOST) {
        eatGhost(nextLocation)

    }
    var emptyCell = getEmptyCells()
    var cherryInt = setInterval(() => {
        getCgerry()
    }, 2000)
  
    
    if (emptyCell.length === foodCounter) {
        isVictory = true

        gameOver()
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function superMod() {
    isPowerFull = true
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'blue'
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    setTimeout(() => {
        isPowerFull = false
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))

        }
    }, 10000)
}

function eatGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
            var currGhost = gGhosts[i]
            gGhosts.splice(i, 1)
            setTimeout(() => { gGhosts.push(currGhost) }, 5000)

        }
    }
}
function getCgerry() {
    var emptyCell = getEmptyCells()
    console.log(emptyCell);
    if (emptyCell === 0) return
    var cherryIdx = drawNum(emptyCell)
    console.log(cherryIdx);
    gBoard[cherryIdx.i][cherryIdx.j] = CHERRY
    renderCell(cherryIdx, CHERRY)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}