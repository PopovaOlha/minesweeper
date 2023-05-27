export default 'module-1';
import stopwatchUrl from "./images/stopwatch.png";
import flagUrl from './images/flag_ok.png';
import bombUrl from './images/Bomb-PNG-Free-Download.png';

const hour = document.createElement('span');
hour.setAttribute('id','hours');
const minute = document.createElement('span');
minute.setAttribute('id','minutes');
const second = document.createElement('span');
second.setAttribute('id', 'seconds');
const clicked = document.createElement('span');
clicked.setAttribute('id', 'click');
const smallOption = document.createElement('option');
smallOption.setAttribute('value', 'small');
const mediumOption = document.createElement('option');
mediumOption.setAttribute('value', 'medium');
const largeOption = document.createElement('option');
largeOption.setAttribute('value', 'large');

let WIDTH = 10;
let HEIGHT = 10;
let BOMB_AMOUNT = 10;
let FLAGS = 0;
const SQUARES = [];
let IS_GAME_OVER = false;
let SECONDS = 0;
let MINUTES = 0;
let HOURS = 0;
let CLICK = 0;
let PAUSED = false;
let INTERVALID = null;
let FIRST_CLICK = true;

const CssClasses = {
    WRAPPER: 'wrapper',
    CONTAINER: 'container',
    IMAGES: 'images',
    WATCH: 'watch',
    HEADER: 'header',
    GRID: 'grid',
    PARAGRAPH: 'paragraph',
    PAUSE_BUTTON: 'pause-button',
    START_GAME_BUTTON: 'start-game_button',
    SIZE_GRID: 'size-grid',
    CHANGE_COLOR: 'change-color-btn'
}

document.addEventListener('DOMContentLoaded', () => { 
   
const section = createElements('section', CssClasses.WRAPPER);
const container = createElements('div', CssClasses.CONTAINER);
const bomb = createElements('img', CssClasses.IMAGES);
bomb.src = bombUrl;
const watch = createElements('img', CssClasses.WATCH);
watch.src = stopwatchUrl;
const header = createElements('h1', CssClasses.HEADER);
const grid = createElements('div', CssClasses.GRID);
grid.style.visibility = 'visible'
const p = createElements('p', CssClasses.PARAGRAPH);
const pause = createElements('button', CssClasses.PAUSE_BUTTON);
const newGame = createElements('button', CssClasses.START_GAME_BUTTON);
const sizeGrid = createElements('select', CssClasses.SIZE_GRID);
const changeColor = createElements('button', CssClasses.CHANGE_COLOR);

 header.appendChild(bomb);
 section.append(container, grid);
 container.append(watch, p, clicked, pause, newGame, sizeGrid, changeColor);
 p.append(hour, minute, second);
 sizeGrid.append(smallOption, mediumOption, largeOption);
 document.body.append(header, section);
 header.innerHTML = 'Welcome to minesweeper game 💥';
 pause.innerHTML = 'Pause';
 newGame.innerHTML = 'New Game';
 smallOption.innerHTML = 'Small';
 mediumOption.innerHTML = 'Medium';
 largeOption.innerHTML = 'Large';
 changeColor.innerHTML = '🤹';
 hour.innerHTML = '00:';
 minute.innerHTML = '00:';
 second.innerHTML = '00';
 clicked.innerHTML = `Clicks:`
 

 function createElements( tagName, className) {
   const element =  document.createElement(tagName);
   element.classList.add(className);
   return element;
 }

 const createBoard = function() {
       
        const bombsArray = Array(BOMB_AMOUNT).fill('bomb');
        const emptyArray = Array(WIDTH*HEIGHT - BOMB_AMOUNT).fill('valid');
        const gameAray = emptyArray.concat(bombsArray);
        const shuffledArray = gameAray.sort(() => Math.random() -0.5);
   
    for (let i = 0; i < WIDTH*HEIGHT; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add(shuffledArray[i]);
        grid.append(square);
        SQUARES.push(square);
       
        square.addEventListener('click', (e) => {
          if (FIRST_CLICK) {
            FIRST_CLICK = false
            startTimer()
          }
            click(square);
             CLICK++; 
             clicked.innerHTML = `✔:${CLICK + FLAGS}`; 
        })

        square.oncontextmenu = function(e) {
            e.preventDefault()
            addFlag(square);
         }
    }

    for (let i = 0; i < SQUARES.length; i++) {
        let total = 0;
        const leftEdge = (i % WIDTH === 0);
        const rightEdge = (i % WIDTH === WIDTH - 1);

        if (SQUARES[i].classList.contains('valid')) {
            if (i > 0 && !leftEdge && SQUARES[i - 1].classList.contains('bomb')) total ++
            if (i > 9 && !rightEdge && SQUARES[(i + 1) - WIDTH].classList.contains('bomb')) total ++
            if (i > 10 && SQUARES[i - WIDTH].classList.contains('bomb')) total ++
            if (i > 11 && !leftEdge && SQUARES[i - 1 - WIDTH].classList.contains('bomb')) total ++
            if (i < 98 && !rightEdge && SQUARES[i + 1].classList.contains('bomb')) total ++
            if (i < 90 && !leftEdge && SQUARES[i - 1 + WIDTH].classList.contains('bomb')) total ++
            if (i < 88 && !rightEdge && SQUARES[i + 1 + WIDTH].classList.contains('bomb')) total ++
            if (i < 89 && SQUARES[i + WIDTH].classList.contains('bomb')) total ++
            SQUARES[i].setAttribute('data', total);
        }
    }
 }

 pause.addEventListener('click',clickOnPause)


newGame.addEventListener('click', () => {
   location.reload()
});
smallOption.addEventListener('click', () => {
    if (FIRST_CLICK) {
      FIRST_CLICK = false;
    } else {
      location.reload()
    }
});
mediumOption.addEventListener('click', () => { 
  if (FIRST_CLICK) {
    startTimer()
    changeGame()
    FIRST_CLICK = false;
  } else {
    location.reload()
  }
});
largeOption.addEventListener('click', () => {
  if (FIRST_CLICK) {
    startTimer()
    changeGame()
    FIRST_CLICK = false;
  } else {
    location.reload()
  }
});

changeColor.addEventListener('click', () => {
  const body = document.querySelector('body');
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  body.style.backgroundColor = "#" + randomColor;
  changeColor.style.backgroundColor = "#" + randomColor;
});

 function clickOnPause() {
    PAUSED = !PAUSED
    console.log(PAUSED)
    if (PAUSED) {
      pause.innerHTML = 'Continue';
      grid.style.visibility = 'hidden'
    }  else {
      pause.innerHTML = 'Pause'
      grid.style.visibility = 'visible'
    } 
  } 

  createBoard();

function startTimer() {
  
    INTERVALID = setInterval(() => {  
        if (!PAUSED) { 
      SECONDS++
        }  
  if (SECONDS <= 9) {
    second.innerHTML = `:0${SECONDS}`;
  }
  if (SECONDS > 9 && SECONDS < 60) {
    second.innerHTML = `:${SECONDS}`;
  }
  if (SECONDS > 59) {
    SECONDS = 0
    second.innerHTML = `:${SECONDS}`;
    MINUTES++
  }

  if (MINUTES <= 9) {
    minute.innerHTML = `:0${MINUTES}`;
  }
  if (MINUTES > 9 && MINUTES < 60) {
    minute.innerHTML = `:${MINUTES}`;
  }
  if (MINUTES > 59) {
    MINUTES = 0
    minute.innerHTML = `:${MINUTES}`;
    MINUTES++
  }

  if (HOURS <= 9) {
    hour.innerHTML = `0${HOURS}`;
  }
  if (HOURS > 9 && HOURS < 60) {
    hour.innerHTML = HOURS;
  }
  if (HOURS > 59) {
    HOURS = 0
    hour.innerHTML = HOURS;
    HOURS++
  }
 
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(INTERVALID);
    SECONDS = SECONDS;
    second.innerHTML = `:${SECONDS}`;
    
  }
 
function addFlag(square) {
    if (IS_GAME_OVER) return
    if (!square.classList.contains('checked') && (FLAGS < BOMB_AMOUNT)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag');
            square.innerHTML = '🚩'
            FLAGS ++;
            clicked.innerHTML = `✔:${CLICK + FLAGS}`; 
            checkForWin();
        } else {
            square.classList.remove('flag');
            square.innerHTML = '';
            FLAGS --;
        }
    }
}

function click(square) {
    let currentId = square.id;
    if (IS_GAME_OVER) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
        gameOver(square);
    } else {
        let total = square.getAttribute('data');
        if (total != 0) {
            square.classList.add('checked');
            square.innerHTML = total;
            square.style.fontSize = 25 + 'px';
            if (total === "1") {
                square.style.color = 'red';
            } else if (total === "2") {
                square.style.color = 'blue';
            } else if (total === "3") {
                square.style.color = "green";
            }
            return
        }
       
        checkSquare(square, currentId);
    }
    square.classList.add('checked')
}

function changeGame(){
  const size = document.querySelector('.size-grid');
  switch (size.value) {
    case 'small':
        grid.style.height = 600 + 'px'
        FIRST_CLICK = false
      break;
    case 'medium':
        WIDTH = 10
        HEIGHT = 1
        BOMB_AMOUNT = 5
        container.style.height = 650 + 'px'
        grid.style.height = 660 + 'px'
      break;
    case 'large':
        WIDTH = 10
        HEIGHT = 2
        BOMB_AMOUNT = 5
        container.style.height = 710 + 'px'
        grid.style.height = 720 + 'px'
        break;

    default: 
      break;
  }
  createBoard()
}

function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % WIDTH === 0);
    const isRightEdge = (currentId % WIDTH === WIDTH -1);
    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
            const newId = SQUARES[parseInt(currentId) -1].id
            const newSquare = document.getElementById(newId)
            click(newSquare);
        }
        if (currentId > 9 && !isRightEdge) {
            const newId = SQUARES[parseInt(currentId) + 1 -WIDTH].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId > 10) {
            const newId = SQUARES[parseInt(currentId -WIDTH)].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId > 11 && !isLeftEdge) {
            const newId = SQUARES[parseInt(currentId) -1 -WIDTH].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 98 && !isRightEdge) {
            const newId = SQUARES[parseInt(currentId) +1].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 90 && !isLeftEdge) {
            const newId = SQUARES[parseInt(currentId) -1 +WIDTH].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 88 && !isRightEdge) {
            const newId = SQUARES[parseInt(currentId) +1 +WIDTH].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
        if (currentId < 89) {
            const newId = SQUARES[parseInt(currentId) +WIDTH].id
            const newSquare = document.getElementById(newId);
            click(newSquare);
        }
    },10)
}

function gameOver(square) {
  
    console.log('BOOM, game over!');
    IS_GAME_OVER = true;
 for (let i = 0; i < SQUARES.length; i ++) {
    if ( SQUARES[i].classList.contains('bomb')) {
        SQUARES[i].innerHTML = '💣';
        }
    }
    header.innerHTML = "Game over. Try again 😞";
    stopTimer();
  }

function checkForWin() {
    let matches = 0;
    for (let i = 0; i < SQUARES.length; i++) {
        if (SQUARES[i].classList.contains('flag') && SQUARES[i].classList.contains('bomb')) {
            matches ++;
        }
        if (matches === BOMB_AMOUNT) {
            header.innerHTML = `Hooray! You found all mines in ${SECONDS} seconds and ${CLICK+FLAGS} moves!😄`;
            stopTimer()
        }
    }  
}

})



