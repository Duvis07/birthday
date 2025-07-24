let isGiftOpened = false;
let currentMessage = 0;
const messages = ['message1', 'message2', 'message3', 'message4', 'message5'];
let musicPlaying = false; // Nueva variable para controlar el estado de la música

function openGift() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  
  if (!isGiftOpened) {
    // Primera vez - abrir caja y empezar música
    isGiftOpened = true;
    
    document.querySelector('.lid').style.transform = 'rotateX(-140deg) translateY(-30px)';
    
    // Play celebration sound
    const audio = document.getElementById('celebrationSound');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Reproducir canción vallenata
    if (backgroundMusic) {
      backgroundMusic.volume = 0.6;
      
      const playPromise = backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          musicPlaying = true;
          console.log('🎵 Música iniciada correctamente!');
          showMusicNotification('🎵 ¡Sonando: Que Dios Te Bendiga! 🎵');
        }).catch(error => {
          console.log('Error al reproducir música:', error);
          setTimeout(() => {
            backgroundMusic.play().catch(() => {
              showMusicNotification('❌ Error: Haz clic en la pantalla para activar la música');
            });
          }, 500);
        });
      }
    }
    
    startConfetti();
    startHearts();
    startButterflies();
    celebrationFlash();
    showAllMessages();
    createSparkles();
    animateBalloons();
    createFloatingSparkles();
    createFloatingParticles();
    animateFlowers();
    
  } else {
    // Caja ya abierta - pausar/reanudar música
    if (backgroundMusic) {
      if (musicPlaying && !backgroundMusic.paused) {
        // Pausar música
        backgroundMusic.pause();
        musicPlaying = false;
        showMusicNotification('⏸️ Música pausada');
      } else {
        // Reanudar música
        backgroundMusic.play().then(() => {
          musicPlaying = true;
          showMusicNotification('▶️ Música reanudada');
        }).catch(() => {
          showMusicNotification('❌ Error al reanudar música');
        });
      }
    }
  }
}

function showAllMessages() {
  const messages = document.querySelectorAll('.message-bubble');
  
  messages.forEach((message, index) => {
    setTimeout(() => {
      message.classList.add('show');
      createSparklesAroundMessage(message);
    }, index * 800); // Stagger each message by 800ms
  });
}

function createSparklesAroundMessage(messageElement) {
  const rect = messageElement.getBoundingClientRect();
  const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '💖', '💕', '🌸', '🦋'];
  const isMobile = window.innerWidth <= 480;
  const sparkleCount = isMobile ? 3 : 6;
  
  for (let i = 0; i < sparkleCount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
      sparkle.className = 'sparkle-effect';
      sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
      sparkle.style.animationDelay = Math.random() * 1 + 's';
      sparkle.style.color = `hsl(${Math.random() * 60 + 300}, 80%, 70%)`;
      sparkle.style.fontSize = isMobile ? '14px' : '16px';
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        if (document.body.contains(sparkle)) {
          document.body.removeChild(sparkle);
        }
      }, 4000);
    }, i * 150);
  }
}

function createFloatingSparkles() {
  const isMobile = window.innerWidth <= 480;
  const interval = isMobile ? 600 : 400;
  
  setInterval(() => {
    const sparkle = document.createElement('div');
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '💖', '💕', '🌸', '🦋', '🌺', '🌻'];
    sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = '110%';
    sparkle.style.fontSize = isMobile ? (Math.random() * 10 + 8) + 'px' : (Math.random() * 15 + 10) + 'px';
    sparkle.style.zIndex = '1';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'floatUp 8s linear forwards';
    sparkle.style.color = `hsl(${Math.random() * 80 + 280}, 70%, 70%)`;
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
      if (document.body.contains(sparkle)) {
        document.body.removeChild(sparkle);
      }
    }, 8000);
  }, interval);
}

function createFloatingParticles() {
  const particlesContainer = document.getElementById('particles');
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        if (particlesContainer.contains(particle)) {
          particlesContainer.removeChild(particle);
        }
      }, 18000);
    }, i * 100);
  }
  
  // Continuar creando partículas
  setInterval(() => {
    if (particlesContainer.children.length < 20) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        if (particlesContainer.contains(particle)) {
          particlesContainer.removeChild(particle);
        }
      }, 18000);
    }
  }, 800);
}

function animateFlowers() {
  const flowers = document.querySelectorAll('.flower');
  flowers.forEach((flower, index) => {
    setTimeout(() => {
      flower.style.animation = 'floatFlower 6s ease-in-out infinite';
      flower.style.animationDelay = (index * 0.5) + 's';
    }, index * 300);
  });
}

function celebrationFlash() {
  document.body.style.background = 'linear-gradient(135deg, #ffffff, #fef3c7, #fbbf24)';
  setTimeout(() => {
    document.body.style.background = '';
  }, 300);
}

// Enhanced Rainbow Confetti with butterflies 🦋
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hearts = [];
let butterflies = [];

// Crear menos partículas para mejor rendimiento en móvil
const particleCount = window.innerWidth <= 480 ? 150 : 300;
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 100%, ${60 + Math.random() * 20}%)`,
    tilt: Math.floor(Math.random() * 20) - 10,
    tiltAngle: 0,
    gravity: 0.5 + Math.random() * 0.5,
    shape: Math.floor(Math.random() * 3),
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10
  });
}

// Create heart particles with mobile optimization
const heartCount = window.innerWidth <= 480 ? 25 : 50;
for (let i = 0; i < heartCount; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 12 + 8,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    color: `hsl(${320 + Math.random() * 40}, 100%, 70%)`
  });
}

// Create butterfly particles with mobile optimization
const butterflyCount = window.innerWidth <= 480 ? 8 : 15;
for (let i = 0; i < butterflyCount; i++) {
  butterflies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 15 + 10,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2,
    wingFlap: 0,
    color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw confetti
  particles.forEach((p, i) => {
    ctx.save();
    ctx.translate(p.x + p.tilt, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    
    switch(p.shape) {
      case 0: // Rectangle
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 1.5);
        break;
      case 1: // Circle
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 2: // Star
        drawStar(ctx, 0, 0, 5, p.r, p.r/2);
        break;
    }
    ctx.restore();
  });

  // Draw hearts
  hearts.forEach((h, i) => {
    ctx.save();
    ctx.globalAlpha = h.opacity;
    ctx.fillStyle = h.color;
    drawHeart(ctx, h.x, h.y, h.size);
    ctx.restore();
  });

  // Draw butterflies
  butterflies.forEach((b, i) => {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.fillStyle = b.color;
    
    // Butterfly body
    ctx.fillRect(-1, -b.size/2, 2, b.size);
    
    // Butterfly wings
    const wingOffset = Math.sin(b.wingFlap) * 5;
    ctx.beginPath();
    ctx.ellipse(-8 + wingOffset, -b.size/4, 8, b.size/3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8 - wingOffset, -b.size/4, 8, b.size/3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  });

  updateConfetti();
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size/4);
  ctx.bezierCurveTo(x, y, x - size/2, y, x - size/2, y + size/4);
  ctx.bezierCurveTo(x - size/2, y + size/2, x, y + size*0.75, x, y + size);
  ctx.bezierCurveTo(x, y + size*0.75, x + size/2, y + size/2, x + size/2, y + size/4);
  ctx.bezierCurveTo(x + size/2, y, x, y, x, y + size/4);
  ctx.fill();
}

function updateConfetti() {
  particles.forEach((p, i) => {
    p.y += Math.cos(p.d) + p.gravity + p.r / 4;
    p.x += Math.sin(p.d) * 0.5;
    p.tiltAngle += 0.15;
    p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height + 50) {
      p.y = -50;
      p.x = Math.random() * canvas.width;
    }
  });

  hearts.forEach((h, i) => {
    h.y += h.speed;
    h.x += Math.sin(h.y * 0.01) * 0.5;
    
    if (h.y > canvas.height + 50) {
      h.y = -50;
      h.x = Math.random() * canvas.width;
    }
  });

  butterflies.forEach((b, i) => {
    b.x += b.speedX;
    b.y += b.speedY;
    b.wingFlap += 0.3;
    
    // Bounce off edges
    if (b.x < 0 || b.x > canvas.width) b.speedX *= -1;
    if (b.y < 0 || b.y > canvas.height) b.speedY *= -1;
    
    // Keep within bounds
    b.x = Math.max(0, Math.min(canvas.width, b.x));
    b.y = Math.max(0, Math.min(canvas.height, b.y));
  });
}

function startConfetti() {
  setInterval(drawConfetti, 16); // 60 FPS
}

function startHearts() {
  // Additional hearts burst from center
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      hearts.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2,
        size: Math.random() * 20 + 15,
        speed: Math.random() * 3 + 2,
        opacity: 1,
        color: `hsl(${320 + Math.random() * 40}, 100%, 70%)`
      });
    }, i * 100);
  }
}

function startButterflies() {
  // Add more butterflies from center
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      butterflies.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
        size: Math.random() * 25 + 20,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        wingFlap: 0,
        color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`
      });
    }, i * 300);
  }
}

// Nueva función para mostrar notificaciones de música
function showMusicNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 105, 180, 0.9));
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 14px;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
    text-align: center;
    animation: slideDown 0.5s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.5s ease-in forwards';
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

// Agregar listener para activar música con interacción del usuario
document.addEventListener('click', function() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  if (backgroundMusic && backgroundMusic.paused && isGiftOpened) {
    backgroundMusic.play().catch(() => {});
  }
}, { once: true });

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Add CSS for balloon party animation
const style = document.createElement('style');
style.textContent = `
  @keyframes balloonParty {
    0% { transform: translateY(0px) scale(1); }
    25% { transform: translateY(-30px) scale(1.1); }
    50% { transform: translateY(-10px) scale(1.05); }
    75% { transform: translateY(-40px) scale(1.15); }
    100% { transform: translateY(0px) scale(1); }
  }
  
  @keyframes floatUp {
    0% { 
      transform: translateY(0px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% { 
      transform: translateY(-120vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  .floating-flowers {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  
  .flower {
    position: absolute;
    font-size: 25px;
    opacity: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  .flower-1 { top: 20%; left: 20%; }
  .flower-2 { top: 60%; right: 15%; }
  .flower-3 { bottom: 30%; left: 15%; }
  .flower-4 { top: 40%; right: 25%; }
  .flower-5 { bottom: 50%; left: 30%; }
  
  @keyframes floatFlower {
    0% { 
      opacity: 0;
      transform: translateY(20px) rotate(0deg) scale(0.8);
    }
    20% {
      opacity: 1;
      transform: translateY(0px) rotate(5deg) scale(1);
    }
    50% {
      transform: translateY(-10px) rotate(-3deg) scale(1.1);
    }
    80% {
      transform: translateY(-5px) rotate(2deg) scale(1);
    }
    100% {
      opacity: 0.8;
      transform: translateY(0px) rotate(0deg) scale(0.9);
    }
  }
`;
document.head.appendChild(style);
