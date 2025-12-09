<!DOCTYPE html> 

<html> 

<head> 

  <meta charset="UTF-8"> 

  <title>Drone.io Game</title> 

  <style> 

    body { margin: 0; background: #111; overflow: hidden; } 

    canvas { display: block; margin: auto; background: #222; } 

  </style> 

</head> 

<body> 

<canvas id="gameCanvas"></canvas> 

  

<script> 

// ====== Game Setup ====== 

const canvas = document.getElementById("gameCanvas"); 

const ctx = canvas.getContext("2d"); 

canvas.width = window.innerWidth; 

canvas.height = window.innerHeight; 

  

// ====== Player (Copter) ====== 

const player = { 

  x: canvas.width / 2, 

  y: canvas.height / 2, 

  size: 20, 

  speed: 4, 

  color: "lime", 

  bullets: [] 

}; 

  

// ====== Enemy ====== 

const enemies = []; 

function spawnEnemy() { 

  enemies.push({ 

    x: Math.random() * canvas.width, 

    y: Math.random() * canvas.height, 

    size: 20, 

    color: "red", 

    speed: 1 + Math.random() * 2 

  }); 

} 

setInterval(spawnEnemy, 2000); // spawn every 2 seconds 

  

// ====== Input Handling ====== 

const keys = {}; 

window.addEventListener("keydown", e => keys[e.key] = true); 

window.addEventListener("keyup", e => keys[e.key] = false); 

window.addEventListener("click", shootBullet); 

  

function shootBullet() { 

  player.bullets.push({ 

    x: player.x, 

    y: player.y, 

    size: 5, 

    color: "yellow", 

    speed: 8, 

    dx: Math.cos(angleToMouse), 

    dy: Math.sin(angleToMouse) 

  }); 

} 

  

// Track mouse for aiming 

let mouseX = player.x, mouseY = player.y, angleToMouse = 0; 

window.addEventListener("mousemove", e => { 

  mouseX = e.clientX; 

  mouseY = e.clientY; 

  angleToMouse = Math.atan2(mouseY - player.y, mouseX - player.x); 

}); 

  

// ====== Game Loop ====== 

function update() { 

  // Move player 

  if (keys["w"] || keys["ArrowUp"]) player.y -= player.speed; 

  if (keys["s"] || keys["ArrowDown"]) player.y += player.speed; 

  if (keys["a"] || keys["ArrowLeft"]) player.x -= player.speed; 

  if (keys["d"] || keys["ArrowRight"]) player.x += player.speed; 

  

  // Keep player in bounds 

  player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x)); 

  player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y)); 

  

   // Move bullets 

  player.bullets.forEach((b, i) => { 

    b.x += b.dx * b.speed; 

    b.y += b.dy * b.speed; 

    if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) { 

      player.bullets.splice(i, 1); 

    } 

  });  

  

  // Move enemies toward player 

  enemies.forEach((enemy, ei) => { 

    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x); 

    enemy.x += Math.cos(angle) * enemy.speed; 

    enemy.y += Math.sin(angle) * enemy.speed; 

  

    // Collision with player 

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y); 

    if (dist < player.size + enemy.size) { 

      alert("Game Over!"); 

      document.location.reload(); 

    } 

  

    // Bullet collision 

    player.bullets.forEach((b, bi) => { 

      const distB = Math.hypot(b.x - enemy.x, b.y - enemy.y); 

      if (distB < b.size + enemy.size) { 

        enemies.splice(ei, 1); 

        player.bullets.splice(bi, 1); 

      } 

    }); 

  }); 

} 

  

function draw() { 

  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  

  // Draw player 

  ctx.fillStyle = player.color; 

  ctx.beginPath(); 

  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2); 

  ctx.fill(); 

  

  // Draw bullets 

  player.bullets.forEach(b => { 

    ctx.fillStyle = b.color; 

    ctx.beginPath(); 

    ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2); 

    ctx.fill(); 

  }); 

  

  // Draw enemies 

  enemies.forEach(enemy => { 

    ctx.fillStyle = enemy.color; 

    ctx.beginPath(); 

    ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2); 

    ctx.fill(); 

  }); 

} 

  

function gameLoop() { 

  update(); 

  draw(); 

  requestAnimationFrame(gameLoop); 

} 

  

gameLoop(); 

</script> 

</body> 

</html>