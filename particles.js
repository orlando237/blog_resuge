// Animated Particles Background System with Mobile Optimization
class ParticleSystem {
  constructor() {
    this.particles = []
    this.canvas = null
    this.ctx = null
    this.animationId = null
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    this.isLowEnd = this.detectLowEndDevice()
    this.init()
  }

  // Detectar dispositivos de gama baja
  detectLowEndDevice() {
    const memory = navigator.deviceMemory || 4 // Default to 4GB if not available
    const cores = navigator.hardwareConcurrency || 2 // Default to 2 cores
    return memory < 2 || cores < 4 || this.isMobile
  }

  init() {
    this.createCanvas()
    this.createParticles()
    this.animate()
    this.handleResize()
    this.handleVisibilityChange()
  }

  // Pausar animaciones cuando la pestaña no está visible
  handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimation()
      } else {
        this.resumeAnimation()
      }
    })
  }

  pauseAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  resumeAnimation() {
    if (!this.animationId) {
      this.animate()
    }
  }

  createCanvas() {
    this.canvas = document.createElement("canvas")
    this.canvas.style.position = "fixed"
    this.canvas.style.top = "0"
    this.canvas.style.left = "0"
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
    this.canvas.style.pointerEvents = "none"
    this.canvas.style.zIndex = "-2"
    
    // Ajustar opacidad según dispositivo
    if (this.isMobile) {
      this.canvas.style.opacity = "0.3"
    } else {
      this.canvas.style.opacity = "0.6"
    }

    this.ctx = this.canvas.getContext("2d")
    this.resizeCanvas()

    const particlesContainer = document.querySelector(".particles-container")
    if (particlesContainer) {
      particlesContainer.appendChild(this.canvas)
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    // Ajustar número de partículas según el dispositivo
    let numberOfParticles
    
    if (this.isLowEnd) {
      numberOfParticles = Math.min(15, Math.floor(window.innerWidth / 100))
    } else if (this.isMobile) {
      numberOfParticles = Math.min(25, Math.floor(window.innerWidth / 60))
    } else {
      numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 30))
    }

    // Limpiar partículas existentes
    this.particles = []

    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * (this.isMobile ? 2 : 3) + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor(),
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      })
    }
  }

  getRandomColor() {
    const colors = ["#3498db", "#2980b9", "#5dade2", "#85c1e9"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Update pulse
      particle.pulse += particle.pulseSpeed
      particle.currentSize = particle.size + Math.sin(particle.pulse) * 0.5

      // Wrap around screen
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.y > this.canvas.height) particle.y = 0
      if (particle.y < 0) particle.y = this.canvas.height
    })
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2)
      this.ctx.fillStyle = particle.color
      this.ctx.globalAlpha = particle.opacity
      this.ctx.fill()
    })

    this.ctx.globalAlpha = 1
  }

  drawConnections() {
    this.particles.forEach((particle, i) => {
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
        )

        if (distance < 100) {
          this.ctx.beginPath()
          this.ctx.moveTo(particle.x, particle.y)
          this.ctx.lineTo(otherParticle.x, otherParticle.y)
          this.ctx.strokeStyle = "#3498db"
          this.ctx.globalAlpha = ((100 - distance) / 100) * 0.2
          this.ctx.stroke()
        }
      })
    })
    this.ctx.globalAlpha = 1
  }

  animate() {
    this.updateParticles()
    this.drawParticles()
    this.drawConnections()
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  handleResize() {
    window.addEventListener("resize", () => {
      this.resizeCanvas()
      this.particles = []
      this.createParticles()
    })
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
  }
}

// Mouse interaction effects
class MouseEffects {
  constructor() {
    this.trails = []
    this.canvas = null
    this.ctx = null
    this.animationId = null
    this.init()
  }

  init() {
    this.createCanvas()
    this.addMouseListeners()
    this.animate()
  }

  createCanvas() {
    this.canvas = document.createElement("canvas")
    this.canvas.style.position = "fixed"
    this.canvas.style.top = "0"
    this.canvas.style.left = "0"
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
    this.canvas.style.pointerEvents = "none"
    this.canvas.style.zIndex = "999"

    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    document.body.appendChild(this.canvas)
  }

  addMouseListeners() {
    document.addEventListener("mousemove", (e) => {
      this.trails.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        decay: 0.02,
      })
    })

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    })
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.trails = this.trails.filter((trail) => {
      trail.life -= trail.decay

      if (trail.life > 0) {
        this.ctx.beginPath()
        this.ctx.arc(trail.x, trail.y, 3, 0, Math.PI * 2)
        this.ctx.fillStyle = `rgba(52, 152, 219, ${trail.life * 0.3})`
        this.ctx.fill()
        return true
      }
      return false
    })

    this.animationId = requestAnimationFrame(() => this.animate())
  }
}

// Utility function for creating click ripple effects
function createRipple(element, event) {
  const ripple = document.createElement("div")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)

  ripple.style.position = "absolute"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(52, 152, 219, 0.3)"
  ripple.style.transform = "scale(0)"
  ripple.style.animation = "rippleEffect 0.6s linear"
  ripple.style.left = event.clientX - rect.left - size / 2 + "px"
  ripple.style.top = event.clientY - rect.top - size / 2 + "px"
  ripple.style.width = ripple.style.height = size + "px"
  ripple.style.pointerEvents = "none"

  element.style.position = "relative"
  element.style.overflow = "hidden"
  element.appendChild(ripple)

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple)
    }
  }, 600)
}

// Initialize particle systems when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const particleSystem = new ParticleSystem()
  const mouseEffects = new MouseEffects()

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll("button, .presentation-card, .blog-card")

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      createRipple(button, e)
    })
  })

  console.log("🎉 Particle systems initialized successfully!")
  console.log("✨ Mouse trail effects activated!")
})

// CSS for ripple animation
const rippleCSS = `
@keyframes rippleEffect {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`

const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)
