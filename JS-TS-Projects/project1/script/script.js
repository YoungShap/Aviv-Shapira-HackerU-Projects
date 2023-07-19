const height = 36;
const width = 39;
const length = 10;
const snake = new Array(length).fill(null).map((n, i) => i);
snake.reverse();
let score = 0;
let timer = 0;
let timerInterval;
let highscore = localStorage.getItem("highscore") || 0;


// const snake = [, 9 ,8,7,6,5,4,3,2,1,0]

// const snake = [0,1,2,3,4,5,6,7,8,9,]

let head = snake[0];
let direction = 'left';
let isGameOver = false;
let random;
let interval;

const rightBoundaries = [];
const leftBoundaries = [];

// גבולות ימין
for (let i = 0; i < height; i++) {
    rightBoundaries.push(width * i - 1);
}

// גבולות שמאל
for (let i = 1; i <= height; i++) {
    leftBoundaries.push(width * i);
}

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
//פונקציה שיוצרת את לוח המשחק//
function createBoard() {
    for (let i = 0; i < height * width; i++) {
        const div = document.createElement('div');
        board.appendChild(div);
    }
    document.querySelector(".highscore").innerHTML = highscore;

    color();
    setApple();

    timerInterval = setInterval(() => {
        const date = new Date(timer * 1000);
        const s = date.getSeconds();
        const m = date.getMinutes();
        document.querySelector(".timer").innerHTML = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
        timer++;
    }, 1000);
}

function color() {
    // Get all board elements.
    const divs = document.querySelectorAll('.board div');

    // Remove all classes.
    divs.forEach(elem => {
        elem.classList.remove('active');
        elem.classList.remove('head');
        elem.classList.remove('up');
        elem.classList.remove('right');
        elem.classList.remove('down');
        elem.classList.remove('left');
        elem.classList.remove('topLeftRadius');
        elem.classList.remove('topRightRadius');
        elem.classList.remove('bottomRightRadius');
        elem.classList.remove('bottomLeftRadius');
    });

    // Add the class "Active" to the element of the snake.
    snake.forEach((num, i) => {
        divs[num].classList.add('active');


        const prev = snake[i + 1];
        const next = snake[i - 1];

        if (prev && next) {
            if ((next == num - 1 && prev == num + width) || (next == num + width && prev == num - 1)) {
                divs[num].classList.add('topLeftRadius');
            } else if ((next == num + width && prev == num + 1) || (prev == num + width && next == num + 1)) {
                divs[num].classList.add('topRightRadius');
            } else if ((next == num + 1 && prev == num - width) || (prev == num + 1 && next == num - width)) {
                divs[num].classList.add('bottomRightRadius');
            } else if ((next == num - 1 && prev == num - width) || (prev == num - 1 && next == num - width)) {
                divs[num].classList.add('bottomLeftRadius');
            }
        }
    });

    divs[head].classList.add('head');
    divs[head].classList.add(direction);
}
//a function that moves the snake//
function move(dir) {
    if (isGameOver) {
        return;
    }
    const divs = document.querySelectorAll('.board div');

    if (dir === 'up') {
        if (direction === 'down') {
            return;
        }

        head -= width;

        if (!divs[head]) {
            gameOver();
            return;
        }
    } else if (dir === 'down') {
        if (direction === 'up') {
            return;
        }

        head += width;

        if (!divs[head]) {
            gameOver();
            return;
        }
    } else if (dir === 'left') {
        if (direction === 'right') {
            return;
        }

        head++;

        if (leftBoundaries.includes(head)) {
            gameOver();
            return;
        }
    } else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }

        head--;

        if (rightBoundaries.includes(head)) {
            gameOver();
            return;
        }
    }

    if (snake.includes(head)) {
        gameOver();
        return;
    }

    direction = dir;
    snake.unshift(head);

    if (head === random) {
        const audio = document.createElement('audio');
        audio.src = "assets/beep.mp3";
        audio.play();
        setApple();
        document.querySelector(".score").innerHTML = score += 10;
        if (score > highscore) {
            localStorage.setItem("highscore", score);
            document.querySelector(".highscore").innerHTML = score;
            return;
        }
    } else {
        snake.pop();
    }

    color();
    startAuto();
}

function gameOver() {
    isGameOver = true;
    clearInterval(interval);
    clearInterval(timerInterval);

    const audio = document.createElement('audio');
    audio.src = "assets/gameover.mp3";
    audio.play();

    setTimeout(() => {
        alert("Game Over😒");
        location.reload();
    }, 50);
}

function setApple() {
    const divs = document.querySelectorAll('.board div');
    random = Math.floor(Math.random() * divs.length);

    if (snake.includes(random)) {
        setApple();
    } else {
        divs.forEach(elem => elem.classList.remove('apple'));
        divs[random].classList.add('apple');
    }
}

function startAuto() {
    clearInterval(interval);
    interval = setInterval(() => move(direction), 80);

}


window.addEventListener('keydown', ev => {


    // Checks which key was pressed.
    switch (ev.key) {
        case 'ArrowUp': move('up'); break;
        case 'ArrowRight': move('right'); break;
        case 'ArrowDown': move('down'); break;
        case 'ArrowLeft': move('left'); break;
        case 'Escape': clearInterval(interval); break;
    }
});