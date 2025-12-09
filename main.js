// -------------------- Setup --------------------
const Player = document.createElement("div");
const ScoreDisplay = document.createElement("p");
const MenuButton = document.createElement("button");
Player.id = "player";

let mouseX = 0;
let mouseY = 0;
const bullets = [];
const keys = {};
const targets_table = [];
const bulletSpeed = 8;
const Targetamount = 400;
const TargetHealth = 100;
let Targets = 0;
let score = 0;
let damage = 50;

const mapWidth = 10000;
const mapHeight = 10000;
let MapX = (window.innerWidth / 2) - (mapWidth / 2);
let MapY = (window.innerHeight / 2) - (mapHeight / 2);

const DisplayImg = document.createElement("img");
DisplayImg.src = "assets/player.png";
DisplayImg.alt = "Player sprite";

//make player not selecetable or draggable
Player.setAttribute("draggable", "false");
DisplayImg.setAttribute("draggable", "false");
DisplayImg.style.userSelect = "none"; // Standard
DisplayImg.style.webkitUserSelect = "none"; // Safari
DisplayImg.style.msUserSelect = "none"; // IE/Edge

//displaying the player//
Player.appendChild(DisplayImg);
document.body.appendChild(Player);

// Map
const MapDiv = document.createElement("div");
MapDiv.style.position = "absolute";
MapDiv.style.width = mapWidth + "px";
MapDiv.style.height = mapHeight + "px";
MapDiv.style.background = "green";
MapDiv.style.zIndex = "1";

//Score
ScoreDisplay.style.position = "absolute";
ScoreDisplay.style.top = "10px";
ScoreDisplay.style.left = (window.innerWidth / 2 - 50) + "px";
ScoreDisplay.textContent = "Score: " + score;
ScoreDisplay.style.color = "white";
ScoreDisplay.style.fontFamily = "Arial, sans-serif";
ScoreDisplay.style.fontSize = "50px";
ScoreDisplay.style.zIndex = "20";

// Menu Button
MenuButton.textContent = "Menu";
MenuButton.style.position = "absolute";
MenuButton.style.top = "10px";
MenuButton.style.right = "10px";
MenuButton.style.zIndex = "20";

// Upgrades Design
const UpgradesFrame = document.createElement("div");
UpgradesFrame.style.position = "absolute";
UpgradesFrame.style.bottom = "1%";
UpgradesFrame.style.left = "1%";
UpgradesFrame.style.width = "250px";
UpgradesFrame.style.height = "350px";
UpgradesFrame.style.background = "rgba(0, 0, 0, 0.5)";
UpgradesFrame.style.opacity = "0.75";
UpgradesFrame.style.zIndex = "20";

const UpgradesTitle = document.createElement("h2");
UpgradesTitle.textContent = "Upgrades";
UpgradesTitle.style.color = "white";
UpgradesTitle.style.textAlign = "center";
UpgradesTitle.fontFamily = "Arial, sans-serif";

const UpgradesList = document.createElement("ul");
UpgradesList.style.listStyleType = "none";
UpgradesList.style.padding = "10px";
UpgradesList.style.color = "white";
UpgradesList.style.fontFamily = "Arial, sans-serif";
UpgradesList.style.height = "70%";
UpgradesList.style.width = "90%";
UpgradesList.style.position = "absolute";
UpgradesList.style.left = "0%";
UpgradesList.style.top = "10%";

//--const upgradeItems = {
//   "Speed" = 1,
//  "Bullet Speed" = 1,
//   "Fire Rate" = 1,
//   "Health" = 1,
//   "Damage" = 1
//};

UpgradesFrame.appendChild(UpgradesList);
UpgradesFrame.appendChild(UpgradesTitle);
document.body.appendChild(MapDiv);
document.body.appendChild(ScoreDisplay);
document.body.appendChild(MenuButton);
document.body.appendChild(UpgradesFrame);

document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

document.addEventListener("click", shootBullet);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    rotateTowardMouse();
});

MenuButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

function centerPlayer() {
    Player.style.width = "75px";
    Player.style.zIndex = "10";
    Player.style.position = "absolute";
    Player.style.left = `${window.innerWidth / 2}px`;
    Player.style.top = `${window.innerHeight / 2}px`;
    Player.style.transform = "translate(-50%, -50%)";
    Player.style.transformOrigin = "50% 50%";

    DisplayImg.style.width = "100%";
    DisplayImg.style.display = "block";
    DisplayImg.style.rotate = "270deg";
    DisplayImg.style.transformOrigin = "50% 50%";
    DisplayImg.style.transition = "transform 0.02s linear";
}

function rotateTowardMouse() {
    const rect = Player.getBoundingClientRect();
    const playerX = rect.left + rect.width / 2;
    const playerY = rect.top + rect.height / 2;

    const angle = Math.atan2(mouseY - playerY, mouseX - playerX);
    const degrees = angle * (180 / Math.PI);
    DisplayImg.style.transform = `rotate(${degrees}deg)`;
}

function updateMapPosition() {
    MapDiv.style.left = MapX + "px";
    MapDiv.style.top = MapY + "px";
}

function shootBullet() {
    const rect = Player.getBoundingClientRect();
    const playerX = rect.left + rect.width / 2;
    const playerY = rect.top + rect.height / 2;
    const angleToMouse = Math.atan2(mouseY - playerY, mouseX - playerX);

    const bullet = document.createElement("div");
    bullet.style.position = "absolute";
    bullet.style.width = "10px";
    bullet.style.height = "10px";
    bullet.style.background = "yellow";
    bullet.style.borderRadius = "50%";
    bullet.boxShadow = "0 0 10px rgba(255, 255, 0, 0.5)";
    bullet.style.zIndex = "15";

    bullets.push({ 

    el: bullet,
    x: playerX, 

    y: playerY, 

    size: 5, 

    color: "yellow", 

    speed: 8, 

    vx: Math.cos(angleToMouse), 

    vy: Math.sin(angleToMouse) 

    }); 


    document.body.appendChild(bullet);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function DisplayHealthBar(target, health,maxHealth) {
    const healthPercent = (health / maxHealth) * 100;
    const HealthBar = document.createElement("div");
    HealthBar.style.position = "absolute";
    HealthBar.style.width = 50 + "px";
    HealthBar.style.height = "8px";
    HealthBar.style.background = "red";
    HealthBar.style.top = "-10px";
    HealthBar.style.left = "0%";
    HealthBar.style.border = "1px solid white";

    const innerBar = document.createElement("div");
    innerBar.style.width = healthPercent + "%";
    innerBar.style.height = "100%";
    innerBar.style.background = "lime";

    let BarInfo = {
        HealthBar: HealthBar,
        innerBar: innerBar
    };

    return BarInfo;
};

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];

        b.x += b.vx * b.speed;
        b.y += b.vy * b.speed;

        b.el.style.left = b.x + "px";
        b.el.style.top = b.y + "px";

       // collision with targets
        for (let ii = targets_table.length - 1; ii >= 0; ii--) {
            let t = targets_table[ii];
         // Check bounding-box collision
        const bRect = b.el.getBoundingClientRect();
        const tRect = t.el.getBoundingClientRect();

        let tHealth = targets_table[ii].health;

            if (
                bRect.left < tRect.right &&
                bRect.right > tRect.left &&
                bRect.top < tRect.bottom &&
                bRect.bottom > tRect.top
            ) {
                console.log("collision detected");   
            
            // Apply damage to target
              if (tHealth > 0) {
                tHealth -= damage;
                console.log("Target Health: " + tHealth);
                targets_table[ii].health = tHealth;

                const HealthBar = DisplayHealthBar(t.el, tHealth, TargetHealth).HealthBar;
                let innerBar = DisplayHealthBar(t.el, tHealth, TargetHealth).innerBar;
                innerBar.style.width = clamp((tHealth / TargetHealth) * 100, 0, 100) + "%";

                HealthBar.appendChild(innerBar);
                t.el.appendChild(HealthBar);
            }

                // Check if target is destroyed
                if (tHealth <= 0) {
                    // Remove DOM element for target
                    if (t.el) t.el.remove();

                    // Remove from array safely
                    targets_table.splice(ii, 1);

                    // Update target count (if you need to track it separately)
                    Targets = targets_table.length;

                    // Score update
                    score++;
                    ScoreDisplay.textContent = "Score: " + score;
                }

                    // Remove bullet
                    b.el.remove();
                    bullets.splice(i, 1);

                    break;
                }
        }
            
        //remove bullet if out of bounds
        if (
            b.x < 0 ||
            b.x > window.innerWidth ||
            b.y < 0 ||
            b.y > window.innerHeight
        ) {
            b.el.remove();
            bullets.splice(i, 1);
        }
    }

    requestAnimationFrame(updateBullets);
}

function movement() {
    const speed = playerSpeed;


    if (keys["w"]) MapY += speed;
    if (keys["s"]) MapY -= speed;
    if (keys["a"]) MapX += speed;
    if (keys["d"]) MapX -= speed;

    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;

    // Clamp map to player-centered view
    if (MapX > screenCenterX) MapX = screenCenterX;
    if (MapX < screenCenterX - mapWidth) MapX = screenCenterX - mapWidth;

    if (MapY > screenCenterY) MapY = screenCenterY;
    if (MapY < screenCenterY - mapHeight) MapY = screenCenterY - mapHeight;


    updateMapPosition();
    requestAnimationFrame(movement);
}

function LoadTargets() {
    if (Targetamount > Targets) {

        Targets+=1;

        const Target = document.createElement("div");
        Target.style.position = "absolute";
        Target.style.width = "50px";
        Target.style.height = "50px";
        Target.style.background = "blue";
        Target.style.boxShadow = "0 0 10px rgba(0, 153, 255, 0.5)";
        Target.health = TargetHealth;
       // Target.style.borderRadius = "5%";
        Target.style.border = "2px solid white";

        Target.style.top = Math.random() * (mapHeight - 50) + "px";
        Target.style.left = Math.random() * (mapWidth - 50) + "px";
        
        targets_table.push({
            el: Target,
            health: TargetHealth,
            x: parseFloat(Target.style.left),
            y: parseFloat(Target.style.top)
        });

        MapDiv.appendChild(Target);
    }
}

const Maxorages = 400;
const Orange_table = [];
let orages = 0;

function Loadorages() {
    if (Maxorages > orages) {

        orages+=1;

        const Orange = document.createElement("div");
        Orange.style.position = "absolute";
        Orange.style.width = "35px";
        Orange.style.height = "35px";
        Orange.health = 75;
        orages.opacity = "100%";
       // Target.style.borderRadius = "5%";

        const OrangeDisplayImg = document.createElement("img");
        OrangeDisplayImg.src = "assets/Orange.png";
        OrangeDisplayImg.alt = "Orange sprite";
        OrangeDisplayImg.style.width = "100%";
        OrangeDisplayImg.style.height = "100%";
        OrangeDisplayImg.style.display = "pixelated";
        OrangeDisplayImg.style.userSelect = "none";

        Orange.style.top = Math.random() * (mapHeight - 50) + "px";
        Orange.style.left = Math.random() * (mapWidth - 50) + "px";
        
        Orange_table.push({
            el: Orange,
            health: 75,
            x: parseFloat(Orange.style.left),
            y: parseFloat(Orange.style.top)
        });

        Orange.appendChild(OrangeDisplayImg);
        MapDiv.appendChild(Orange);
    }
}

// Player Health Bar (not functional yet)
let playerHealth = 100;
let playerMaxHealth = 100;
const HealthBar = DisplayHealthBar(Player, playerHealth, playerMaxHealth).HealthBar;
let innerBar = DisplayHealthBar(Player, playerHealth, playerMaxHealth).innerBar;

HealthBar.appendChild(innerBar);
Player.appendChild(HealthBar);
// ------------------ Upgrade System ------------------

// Upgrade stats
let upgradeStats = {
    speed: 1,
    bulletSpeed: 1,
    fireRate: 1,
    maxHealth: 1,
    damage: 1
};

// Costs
let upgradeCosts = {
    speed: 50,
    bulletSpeed: 50,
    fireRate: 75,
    maxHealth: 100,
    damage: 100
};

// Actual applied gameplay values
let playerSpeed = 5;
let bulletSpeedGlobal = 8;
let fireCooldown = 100; // ms, lower = faster shooting

function applyUpgrades() {
    playerSpeed = 5 + upgradeStats.speed * 0.75;
    bulletSpeedGlobal = 8 + upgradeStats.bulletSpeed * 1.5;
    damage = 50 + upgradeStats.damage * 10;

    // Fire rate improves by decreasing cooldown
    fireCooldown = Math.max(80 - upgradeStats.fireRate * 5, 20);

    playerMaxHealth = 100 + upgradeStats.maxHealth * 25;
    if (playerHealth > playerMaxHealth) playerHealth = playerMaxHealth;
}

let lastShotTime = 0;

// 🔥 Modified shooting system (uses upgraded bullet speed + fire rate)
document.addEventListener("click", () => {
    const now = performance.now();
    if (now - lastShotTime < fireCooldown) return;
    lastShotTime = now;

    const rect = Player.getBoundingClientRect();
    const playerX = rect.left + rect.width / 2;
    const playerY = rect.top + rect.height / 2;
    const angleToMouse = Math.atan2(mouseY - playerY, mouseX - playerX);

    const bullet = document.createElement("div");
    bullet.style.position = "absolute";
    bullet.style.width = "10px";
    bullet.style.height = "10px";
    bullet.style.background = "yellow";
    bullet.style.borderRadius = "50%";
    bullet.style.zIndex = "15";

    bullets.push({
        el: bullet,
        x: playerX,
        y: playerY,
        speed: bulletSpeedGlobal,
        vx: Math.cos(angleToMouse),
        vy: Math.sin(angleToMouse)
    });

    document.body.appendChild(bullet);
});

// 🔥 BUILD UPGRADE UI
function buildUpgradeList() {
    UpgradesList.innerHTML = "";

    const entries = [
        ["Speed", "speed"],
        ["Bullet Speed", "bulletSpeed"],
        ["Fire Rate", "fireRate"],
        ["Max Health", "maxHealth"],
        ["Damage", "damage"]
    ];

    entries.forEach(([label, key]) => {
        const li = document.createElement("li");
        li.style.marginBottom = "12px";
        li.style.cursor = "pointer";
        li.style.background = "rgba(166, 26, 194, 0.59)";
        li.style.padding = "8px";
        li.style.borderRadius = "5px";

        li.textContent = `${label} (Lv. ${upgradeStats[key]}) — Cost: ${upgradeCosts[key]}`;

        li.addEventListener("click", () => {
            if (score >= upgradeCosts[key]) {
                score -= upgradeCosts[key];
                upgradeStats[key]++;

                upgradeCosts[key] = Math.round(upgradeCosts[key] * 1.5);

                applyUpgrades();
                ScoreDisplay.textContent = "Score: " + score;
                buildUpgradeList();
            }
        });

        UpgradesList.appendChild(li);
    });
}

// initialize upgrades
applyUpgrades();
buildUpgradeList();
//update loop
setInterval(() => {
    LoadTargets();
    Loadorages();   
    innerBar.style.width = clamp((playerHealth / playerMaxHealth) * 100, 0, 100) + "%";
}, 100);
// Initial
centerPlayer();
rotateTowardMouse();
movement();
updateBullets();

window.addEventListener("resize", () => {
    centerPlayer();
});