document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const logsLeft = document.querySelectorAll('.log-left')
    const logsRight = document.querySelectorAll('.log-right')
    const carsLeft = document.querySelectorAll('.car-left')
    const carsRight = document.querySelectorAll('.car-right')
    const timeLeft = document.querySelector('h3')
    const result = document.querySelector('#result')
    const startBtn = document.querySelector('#button')
    const width = 9

    let currentIndex = 76
    let currentTime = 20
    let timerId
    let isGameOver = false;
    const h3 = document.querySelector('h3')


    //render frog on starting point
    squares[currentIndex].classList.add('frog')

    //movefrog
    function moveFrog(e) {
        if (!isGameOver) {
            squares[currentIndex].classList.remove('frog')
            switch (e.keyCode) {
                case 37:
                    if (currentIndex % width !== 0) currentIndex -= 1
                    break
                case 38:
                    if (currentIndex - width >= 0) currentIndex -= width
                    break
                case 39:
                    if (currentIndex % width < width - 1) currentIndex += 1
                    break
                case 40:
                    if (currentIndex + width < width * width) currentIndex += width
                    break
            }
            squares[currentIndex].classList.add('frog')
            lose()
            win()
        }
    }
    // movecars
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft))
        carsRight.forEach(carRight => moveCarRight(carRight))
    }
    // move the car left
    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1')
                carLeft.classList.add('c2')
                break
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2')
                carLeft.classList.add('c3')
                break
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3')
                carLeft.classList.add('c1')
                break
        }
    }
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1')
                carRight.classList.add('c3')
                break
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2')
                carRight.classList.add('c1')
                break
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3')
                carRight.classList.add('c2')
                break
        }
    }
    function autoMoveLogs() {
        logsLeft.forEach(logLeft => movelogLeft(logLeft))
        logsRight.forEach(logRight => movelogRight(logRight))
    }




    function movelogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1')
                logLeft.classList.add('l2')
                break;

            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2')
                logLeft.classList.add('l3')
                break;

            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3')
                logLeft.classList.add('l4')
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4')
                logLeft.classList.add('l5')
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5')
                logLeft.classList.add('l1')
                break;
        }
    }

    function movelogRight(logRight) {
        switch (true) {
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1')
                logRight.classList.add('l5')
                break;

            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2')
                logRight.classList.add('l1')
                break;

            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3')
                logRight.classList.add('l2')
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4')
                logRight.classList.add('l3')
                break;
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5')
                logRight.classList.add('l4')
                break;
        }
    }


    function moveFrogWithLogsLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove('frog');
            currentIndex++;
            squares[currentIndex].classList.add('frog');

        }
    }

    function moveFrogWithLogsRight() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove('frog');
            currentIndex--;
            squares[currentIndex].classList.add('frog');

        }
    }

    function win() {
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = "YOU WON"
            squares[currentIndex].classList.remove('frog');
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }
    function lose() {
        if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
            || (squares[currentIndex].classList.contains('l5'))
            || (squares[currentIndex].classList.contains('l4'))) {
            result.innerHTML = "YOU LOSE";
            squares[currentIndex].classList.remove('frog')
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }

    function movePiece() {
        currentTime--;
        h3.textContent = `Time Left ${currentTime}`
        autoMoveCars();
        autoMoveLogs();
        moveFrogWithLogsLeft();
        moveFrogWithLogsRight();
        lose();
    }

    //  window.addEventListener('keydown', moveFrog);


    // startBtn.addEventListener('click', () => {
    //     if (timerId) {
    //         clearInterval(timerId)
    //     }
    //     else {
    //         timerId = setInterval(movePiece, 1000)
    //         document.addEventListener('keyup', moveFrog);
    //     }
    // })
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            isGameOver = true;
        }
        else {
            // h3.style.display = 'none'
            timerId = setInterval(movePiece, 1000)
            document.addEventListener('keyup', moveFrog);
        }
    })
})

