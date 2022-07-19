'use strict'

const PACMAN = '😷';
var gPacman;
var isPowerFull = false
var collectedFood=0
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
    if (nextCell === FOOD){
        updateScore(1)
        collectedFood++
    } 
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
        updateScore(10)

    }
    var emptyCell = getEmptyCells()
    console.log(collectedFood,foodCounter);
    if (collectedFood=== foodCounter-1) {
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