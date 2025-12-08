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

// Move enemies toward player 

enemies.forEach(enemy, ei) => {

const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x); 

enemy.x += Math.cos(angle) * enemy.speed; 

enemy.y += Math.sin(angle) * enemy.speed; 

  

// Collision with player 
const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y); 

if (dist < player.size + enemy.size) { 

// player health  later

};