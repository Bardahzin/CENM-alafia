console.log("Script loaded successfully");
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  const container = document.getElementById("subcontent");
  w = canvas.width = container.clientWidth;
  h = canvas.height = container.clientHeight;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
}

window.addEventListener("resize", resize);
resize();

const particles = [];
const PARTICLE_COUNT = 400;
const MAX_DIST = 120;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    radius: 2 + Math.random() * 2,
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // desenha partículas
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.shadowColor = "aqua";
    ctx.shadowBlur = 8;
    ctx.fill();
  }

  // ligações entre próximas
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      let a = particles[i];
      let b = particles[j];
      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DIST) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / MAX_DIST})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // movimento das partículas
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    // rebote nas bordas
    if (p.x <= 0 || p.x >= w) p.vx *= -1;
    if (p.y <= 0 || p.y >= h) p.vy *= -1;
  }

  requestAnimationFrame(draw);
}

draw();
