// ==================== ENEMY SYSTEM ====================

// Enemy list
const enemies = [];
const enemySpawnRate = 2000; // ms
const enemySpeed = 1.2;
const enemyMaxHealth = 100;

// === Spawn Enemies ===
function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.style.position = "absolute";
  enemy.style.width = "50px";
  enemy.style.height = "50px";
  enemy.style.background = "red";
  enemy.style.border = "2px solid white";
  enemy.style.borderRadius = "5px";
  enemy.style.zIndex = "5";

  // Random spawn location
  enemy.style.left = Math.random() * (mapWidth - 50) + "px";
  enemy.style.top = Math.random() * (mapHeight - 50) + "px";

  // Create health bar
  const barContainer = document.createElement("div");
  barContainer.style.position = "absolute";
  barContainer.style.top = "-10px";
  barContainer.style.left = "0";
  barContainer.style.width = "100%";
  barContainer.style.height = "6px";
  barContainer.style.background = "rgba(255,0,0,0.4)";
  barContainer.style.border = "1px solid white";

  const bar = document.createElement("div");
  bar.style.height = "100%";
  bar.style.width = "100%";
  bar.style.background = "lime";

  barContainer.appendChild(bar);
  enemy.appendChild(barContainer);

  MapDiv.appendChild(enemy);

  enemies.push({
    el: enemy,
    health: enemyMaxHealth,
    bar: bar
  });
}

// === Enemy follows player ===
function moveEnemies() {
  const playerRect = Player.getBoundingClientRect();
  const playerX = playerRect.left + playerRect.width / 2;
  const playerY = playerRect.top + playerRect.height / 2;

  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    const rect = e.el.getBoundingClientRect();
    const ex = rect.left + rect.width / 2;
    const ey = rect.top + rect.height / 2;

    const dx = playerX - ex;
    const dy = playerY - ey;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      e.el.style.left = parseFloat(e.el.style.left) + (dx / distance) * enemySpeed + "px";
      e.el.style.top = parseFloat(e.el.style.top) + (dy / distance) * enemySpeed + "px";
    }
  }

  requestAnimationFrame(moveEnemies);
}

// === Collision between bullets and enemies ===
function checkBulletEnemyCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    const bRect = b.el.getBoundingClientRect();

    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      const eRect = e.el.getBoundingClientRect();

      if (
        bRect.left < eRect.right &&
        bRect.right > eRect.left &&
        bRect.top < eRect.bottom &&
        bRect.bottom > eRect.top
      ) {
        // Hit detected 💥
        e.health -= damage;
        e.bar.style.width = Math.max((e.health / enemyMaxHealth) * 100, 0) + "%";

        // Remove bullet
        b.el.remove();
        bullets.splice(i, 1);

        if (e.health <= 0) {
          // Remove enemy
          e.el.remove();
          enemies.splice(j, 1);

          // Add score
          score += 5;
          ScoreDisplay.textContent = "Score: " + score;
        }

        break;
      }
    }
  }

  requestAnimationFrame(checkBulletEnemyCollisions);
}

// === Start spawning enemies ===
setInterval(spawnEnemy, enemySpawnRate);
moveEnemies();
checkBulletEnemyCollisions();

