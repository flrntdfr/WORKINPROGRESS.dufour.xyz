---
hidden: true
theme-color: "#fff"
layout: blank
title: "404 (variation 1)"
permalink: "/404/1"
description: Ball not found.
result: [game, vibe]
tech: [Claude 4, GPT-5]
---

<style>
html, body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    background: #fff;
    color: #000;
    font-family: var(--font-family-main);
    font-size: 1.2rem;
    font-weight: 400;
}

#brick-breaker-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #fff;
    color: #000;
    z-index: 9999;
}

#brick-breaker-container a {
    position: absolute;
    top: 20px;
    left: 20px;
    text-decoration: none;
    color: #000;
    z-index: 100;
    font-size: 1.2rem;
    font-weight: 400;
}

#brick-breaker-container a:hover {
    color: #000;
    text-decoration: underline;
}

#game-area {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* Responsive game area: rectangular on small screens */
    width: min(94vw, 900px);
    height: min(84vh, 700px);
    /* Ensure a reasonable minimum size */
    min-width: 300px;
    min-height: 340px;
    border: 1px solid #000;
    cursor: crosshair;
    /* Account for search bar at bottom by shifting up */
    transform: translate(-50%, calc(-50% - 30px));
}

#score {
    font-family: var(--font-family-main);
    position: absolute;
    top: -30px;
    left: 0;
    font-size: 1.2rem;
    font-weight: 400;
    color: #000;
}

#ball {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
}

#paddle {
    position: absolute;
    bottom: 20px;
    width: 80px;
    height: 10px;
    background: #000;
}

#game-over {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #000;
    font-size: 1.2rem;
    font-weight: 400;
}

.brick {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #000;
    box-sizing: border-box;
}

.controls-info {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    opacity: 0.7;
    color: #000;
    font-size: 1.2rem;
    font-weight: 400;
}
</style>

<div id="brick-breaker-container">
    <div id="game-area">
        <div id="score">SCORE: <span id="score-value">0</span></div>
        <div id="bricks-container"></div>
        <div id="ball"></div>
        <div id="paddle"></div>
        <div id="game-over">
            <div>BALL NOT FOUND</div>
            <div>GAME OVER</div>
            <div>TAP TO RESPAWN</div>
        </div>
    </div>
    <div class="controls-info">
        <div id="mouse-hint" style="display:none;">AUTOPLAY</div>
        <div id="tap-instruction" style="display:none;">TAP TO RESPAWN</div>
    </div>
</div>

<script>
/* Only initialize if not already done */
if (!window.brickBreakerInitialized) {
    window.brickBreakerInitialized = true;

    const gameArea = document.getElementById('game-area');
    const ball = document.getElementById('ball');
    const paddle = document.getElementById('paddle');
    const bricksContainer = document.getElementById('bricks-container');
    const scoreElement = document.getElementById('score-value');
    const mouseHint = document.getElementById('mouse-hint');
    const tapInstruction = document.getElementById('tap-instruction');
    function showMouseHint() { mouseHint.style.display = 'block'; }
    function hideMouseHint() { mouseHint.style.display = 'none'; }
    const gameOverElement = document.getElementById('game-over');

    /* Game area size derived from element to be responsive */
    let gameWidth = 0;
    let gameHeight = 0;
    const paddleWidth = 80;
    const paddleHeight = 10;
    const ballSize = 10;

    let paddleX = 0;
    let ballX = 0;
    let ballY = 0;
    let ballDX = 3;
    let ballDY = -3;
    let score = 0;
    let isPlaying = false;
    let isGameOver = false;
    let isAutopilot = false;
    let bricks = [];
    let bricksAnchorX = 0;
    let bricksMessageWidth = 0;

    let ballSpeedMultiplier = 1.0;
    let targetBallSpeedMultiplier = 1.0;
    const speedTransitionFactor = 0.1;
    let boostStartTime = null;
    const BOOST_DURATION_BEFORE_INFINITE_INCREASE = 5000;
    const INFINITE_SPEED_INCREASE_RATE = 0.005;

    function updateScore(newScore) {
        score = newScore;
        scoreElement.textContent = score;
    }

    /* Update cached game area size from DOM */
    function updateGameSize() {
        const rect = gameArea.getBoundingClientRect();
        gameWidth = Math.max(0, Math.floor(rect.width));
        gameHeight = Math.max(0, Math.floor(rect.height));
    }

    /* Center paddle and place ball on paddle (used on init and when resizing idle) */
    function centerPaddleAndBall() {
        paddleX = Math.max(0, Math.min(gameWidth - paddleWidth, Math.floor(gameWidth / 2 - paddleWidth / 2)));
        ballX = paddleX + paddleWidth / 2;
        ballY = gameHeight - 20 - paddleHeight - ballSize;
    }

    /* Create bricks */
    function createBricks() {
        bricksContainer.innerHTML = '';
        bricks = [];

        const brickWidth = 20;
        const brickHeight = 20;
        const brickPadding = 4;
        const digitPadding = brickWidth;

        const digit4 = [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]
        ];

        const digit0 = [
            [1, 1, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1]
        ];

        const message = [digit4, digit0, digit4];
        const digitGridHeight = digit4.length;
        const digitGridWidth = digit4[0].length;

        const messageWidth = (message.length * digitGridWidth * (brickWidth + brickPadding)) + ((message.length - 1) * digitPadding);
        const startX = (gameWidth - messageWidth) / 2;
        bricksMessageWidth = messageWidth;
        bricksAnchorX = startX;
        const startY = 80;

        let currentX = startX;

        message.forEach(digit => {
            for (let r = 0; r < digitGridHeight; r++) {
                for (let c = 0; c < digitGridWidth; c++) {
                    if (digit[r][c] === 1) {
                        const brick = document.createElement('div');
                        brick.className = 'brick';

                        const x = currentX + c * (brickWidth + brickPadding);
                        const y = startY + r * (brickHeight + brickPadding);

                        brick.style.left = x + 'px';
                        brick.style.top = y + 'px';

                        bricksContainer.appendChild(brick);
                        bricks.push({
                            element: brick,
                            x,
                            y,
                            width: brickWidth,
                            height: brickHeight,
                            alive: true
                        });
                    }
                }
            }
            currentX += (digitGridWidth * (brickWidth + brickPadding)) + digitPadding;
        });
    }

    /* Shift remaining bricks horizontally to keep them centered after resize */
    function recenterBricks() {
        if (!bricks.length || !bricksMessageWidth) return;
        const newStartX = (gameWidth - bricksMessageWidth) / 2;
        const deltaX = newStartX - bricksAnchorX;
        if (Math.abs(deltaX) < 0.5) return;
        bricks.forEach(brick => {
            if (!brick.alive) return;
            brick.x += deltaX;
            brick.element.style.left = brick.x + 'px';
        });
        bricksAnchorX = newStartX;
    }

    /* Collision detection */
    function checkCollision(ballX, ballY, objX, objY, objWidth, objHeight) {
        return ballX < objX + objWidth &&
               ballX + ballSize > objX &&
               ballY < objY + objHeight &&
               ballY + ballSize > objY;
    }

    /* Update game */
    function update() {
        if (!isPlaying) return;

        /* After 10s, slowly increase speed to infinity */
        if (boostStartTime && (Date.now() - boostStartTime > BOOST_DURATION_BEFORE_INFINITE_INCREASE)) {
            targetBallSpeedMultiplier += INFINITE_SPEED_INCREASE_RATE;
        }

        /* Smooth speed transition */
        if (Math.abs(targetBallSpeedMultiplier - ballSpeedMultiplier) > 0.01) {
            ballSpeedMultiplier += (targetBallSpeedMultiplier - ballSpeedMultiplier) * speedTransitionFactor;
        } else {
            ballSpeedMultiplier = targetBallSpeedMultiplier;
        }

        /* Paddle movement */
        if (isAutopilot) {
            paddleX = Math.max(0, Math.min(gameWidth - paddleWidth, ballX - paddleWidth / 2));
        } else {
            if (keys['ArrowLeft']) {
                paddleX = Math.max(0, paddleX - 8);
            }
            if (keys['ArrowRight']) {
                paddleX = Math.min(gameWidth - paddleWidth, paddleX + 8);
            }
        }

        /* Move ball */
        ballX += ballDX * ballSpeedMultiplier;
        ballY += ballDY * ballSpeedMultiplier;

        /* Wall collisions */
        if (ballX <= 0 || ballX >= gameWidth - ballSize) {
            ballDX = -ballDX;
        }
        if (ballY <= 0) {
            ballDY = -ballDY;
        }

        /* Paddle collision with angle control */
        if (checkCollision(ballX, ballY, paddleX, gameHeight - 40, paddleWidth, paddleHeight)) {
            /* Compute hit position (-1 left, 0 center, 1 right) */
            const hitPos = ((ballX + ballSize / 2) - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
            /* Maximum bounce angle (in radians) – 60° gives good control */
            const maxAngle = Math.PI / 3;
            const bounceAngle = hitPos * maxAngle;

            /* Preserve the current speed magnitude */
            const speed = Math.sqrt(ballDX * ballDX + ballDY * ballDY) || 5;

            /* New velocity components */
            ballDX = speed * Math.sin(bounceAngle);
            ballDY = -Math.abs(speed * Math.cos(bounceAngle));
        }

        /* Brick collisions */
        let collided = false;
        bricks.forEach(brick => {
            if (brick.alive && checkCollision(ballX, ballY, brick.x, brick.y, brick.width, brick.height)) {
                brick.alive = false;
                brick.element.remove();
                updateScore(score + 1);
                collided = true;
            }
        });

        if (collided) {
            ballDY = -ballDY;

            /* Check if all bricks destroyed */
            if (bricks.every(b => !b.alive)) {
                /* All bricks destroyed: redirect to home */
                window.location.href = '/';
            }
        }

        /* Ball out of bounds */
        if (ballY > gameHeight) {
            isPlaying = false;
            isGameOver = true;
            hideMouseHint();
            gameOverElement.style.display = 'block';
            gameOverElement.innerHTML = `
                <div>GAME OVER</div>
                <div>BALL NOT FOUND</div>
                <div>TAP TO RESPAWN</div>
            `;
        }

        /* Update positions */
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        paddle.style.left = paddleX + 'px';

        requestAnimationFrame(update);
    }

    /* Input handling */
    let keys = {};

    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    /* Tap / click to start or respawn, and speed boost */
    gameArea.addEventListener('pointerdown', (e) => {
        if (!isPlaying) {
            if (isGameOver) {
                /* Don't reset score or recreate bricks - just respawn the ball */
                isGameOver = false;
                gameOverElement.innerHTML = `<div>TAP TO START</div>`;
            }
            resetBall();
            isPlaying = true;
            gameOverElement.style.display = 'none';
            update();
        }

        if (e.button === 0) {
            targetBallSpeedMultiplier = 2.0;
            if (!boostStartTime) {
                boostStartTime = Date.now();
            }
        }
    });

    document.addEventListener('pointerup', (e) => {
        if (e.button === 0) {
            targetBallSpeedMultiplier = 1.0;
            boostStartTime = null;
        }
    });

    /* Mouse control */
    gameArea.addEventListener('mousemove', (e) => {
        if (isAutopilot) return;
        const rect = gameArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        paddleX = Math.max(0, Math.min(gameWidth - paddleWidth, mouseX - paddleWidth / 2));
        
        /* Update paddle position immediately */
        paddle.style.left = paddleX + 'px';
        
        /* Keep ball on paddle when not playing */
        if (!isPlaying) {
            ballX = paddleX + paddleWidth / 2;
            ballY = gameHeight - 20 - paddleHeight - ballSize;
            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';
        }
    });

    /* Adjust to window resizes by updating game area size */
    window.addEventListener('resize', () => {
        updateGameSize();
        /* Keep bricks centered regardless of play state */
        recenterBricks();
        if (!isPlaying) {
            /* Re-center layout when idle */
            centerPaddleAndBall();
            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';
            paddle.style.left = paddleX + 'px';
        } else {
            /* Keep entities within bounds during play */
            paddleX = Math.max(0, Math.min(gameWidth - paddleWidth, paddleX));
            ballX = Math.max(0, Math.min(gameWidth - ballSize, ballX));
        }
    });

    gameArea.addEventListener('pointerleave', () => {
        if (isPlaying) {
            isAutopilot = true;
            showMouseHint();
            targetBallSpeedMultiplier = 1.0;
            boostStartTime = null;
        }
    });

    gameArea.addEventListener('pointerenter', () => {
        isAutopilot = false;
        hideMouseHint();
    });

    /* Reset ball position */
    function resetBall() {
        ballX = paddleX + paddleWidth / 2;
        ballY = gameHeight - 20 - paddleHeight - ballSize;
        ballDX = (Math.random() - 0.5) * 6;
        ballDY = -3;
    }

    /* Initialize game */
    updateGameSize();
    createBricks();
    centerPaddleAndBall();

    /* Set initial positions */
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddle.style.left = paddleX + 'px';

    /* Start message */
    gameOverElement.style.display = 'block';
    gameOverElement.innerHTML = `<div>TAP TO START</div>`;
}
</script> 