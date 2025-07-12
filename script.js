// --- Animated Particle Background ---
const canvas = document.createElement('canvas');
canvas.id = 'bgParticles';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = 0;
canvas.style.pointerEvents = 'none';
document.body.prepend(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const ctx = canvas.getContext('2d');
const particles = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 1 + Math.random() * 2,
    dx: -1 + Math.random() * 2,
    dy: -1 + Math.random() * 2,
    color: `rgba(0,255,255,${0.2 + Math.random() * 0.4})`
}));

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#00e6ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// --- Glowing Score and Chart ---
const style = document.createElement('style');
style.textContent = `
#score {
    text-shadow: 0 0 12px #00e6ff, 0 0 24px #00e6ff;
    color: #00e6ff !important;
    font-weight: bold;
    font-size: 2em;
}
#chart_div {
    box-shadow: 0 0 32px 4px #00e6ff44;
    border-radius: 16px;
    background: #161b22;
    padding: 16px;
}
#threatLogs li {
    transition: text-shadow 0.3s;
}
#threatLogs li:hover {
    text-shadow: 0 0 8px #fff, 0 0 16px #00e6ff;
}
`;
document.head.appendChild(style);
