// Create particles
const numStars = 100;
const stars = [];

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = '5px';
    star.style.height = '5px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.zindex = '-2';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(star);
    stars.push(star);
}

// Animate stars
function animateStars() {
    stars.forEach(star => {
        let top = parseFloat(star.style.top);
        top += 0.5; // speed
        if (top > window.innerHeight) top = 0;
        star.style.top = top + 'px';
    });
    requestAnimationFrame(animateStars);
}

animateStars();