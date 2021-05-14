document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const head = document.querySelector('h1');

    let isJumping = false;
    let isGameOver = false;
    let gravity = 0.9;
    function control(e) {
        if (e.keyCode === 32) {
            //smething
            head.innerHTML = ""


            if (!isJumping) {
                isJumping = true;
                jump();

            }
        }
    }
    document.addEventListener('keyup', control);
    // document.addEventListener(; keyuo)
    let position = 0
    function jump() {

        let count = 0;
        let timid = setInterval(function () {
            //move down
            if (count === 15) {
                clearInterval(timid);
                console.log('down')
                let downtimid = setInterval(() => {
                    if (count === 0) {
                        clearInterval(downtimid)
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                }, 20)


            }
            //move up
            console.log('up')
            count++;
            position += 30
            position *= gravity;
            dino.style.bottom = position + 'px';

        }, 20)

    }

    function generateObstacle() {
        let rand = Math.random() * 4000;
        let obstaclePosition = 1500
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle')
        if (!isGameOver) grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px';

        let timerid = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerid);
                // alert("gameover")
                isGameOver = true;
                head.innerHTML = "Game Over"

                //  body.removeChild(body.firstChild)
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }

            }


            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20)
        if (!isGameOver) {
            setTimeout(generateObstacle, rand)

        }


    }
    generateObstacle();

})