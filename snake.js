(function(){
  const canvas = document.getElementById('snake-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  const cellSize = 16;
  const cols = canvas.width / cellSize;
  const rows = canvas.height / cellSize;

  const scoreEl = document.getElementById('snake-score');
  const restartBtn = document.getElementById('snake-restart');

  let snake, direction, nextDirection, food, score, loopId, started, gameOver;

  function themeColor(name, fallback){
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function randomCell(){
    return {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
  }

  function spawnFood(){
    let cell;
    do {
      cell = randomCell();
    } while (snake.some((seg) => seg.x === cell.x && seg.y === cell.y));
    food = cell;
  }

  function resetGame(){
    snake = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = direction;
    score = 0;
    started = false;
    gameOver = false;
    if(scoreEl) scoreEl.textContent = '0';
    spawnFood();
    if(loopId) clearInterval(loopId);
    draw();
  }

  function startLoop(){
    if(loopId) clearInterval(loopId);
    loopId = setInterval(tick, 130);
  }

  function tick(){
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    const hitWall = head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows;
    const hitSelf = snake.some((seg) => seg.x === head.x && seg.y === head.y);

    if(hitWall || hitSelf){
      endGame();
      return;
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y){
      score += 1;
      if(scoreEl) scoreEl.textContent = score;
      spawnFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function endGame(){
    gameOver = true;
    clearInterval(loopId);
    draw();
  }

  function draw(){
    ctx.fillStyle = themeColor('--bg2', '#E9E0CC');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = themeColor('--rust', '#A9642A');
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2.6,
      0,
      Math.PI * 2
    );
    ctx.fill();

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? themeColor('--accent', '#4F6B45') : themeColor('--bark', '#7A5A3A');
      ctx.fillRect(seg.x * cellSize + 1, seg.y * cellSize + 1, cellSize - 2, cellSize - 2);
    });

    if(!started){
      overlayText('Click board, then press an arrow key');
    } else if(gameOver){
      overlayText('Game over \u2014 score ' + score + ' \u2014 hit restart');
    }
  }

  function overlayText(text){
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, canvas.height / 2 - 22, canvas.width, 44);
    ctx.fillStyle = '#F1ECE3';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 5);
  }

  const keyMap = {
    ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 }
  };

  canvas.addEventListener('keydown', (e) => {
    const dir = keyMap[e.key];
    if(!dir) return;
    e.preventDefault();

    if(gameOver) return;
    if(dir.x === -direction.x && dir.y === -direction.y) return;

    nextDirection = dir;

    if(!started){
      started = true;
      startLoop();
    }
  });

  canvas.addEventListener('click', () => canvas.focus());

  if(restartBtn){
    restartBtn.addEventListener('click', () => {
      canvas.focus();
      resetGame();
    });
  }

  resetGame();
})();
