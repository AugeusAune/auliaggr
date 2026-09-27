<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let particles: Particle[] = []
let mouse = { x: -1000, y: -1000, active: false }

const PARTICLE_COLOR = '236, 143, 141'
const MAX_PARTICLES = 40
const CONNECTION_DISTANCE = 90
const MOUSE_RADIUS = 100

const createParticle = (width: number, height: number): Particle => {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    radius: Math.random() * 1.5 + 1,
    baseAlpha: Math.random() * 0.45 + 0.2
  }
}

const updateParticle = (p: Particle, width: number, height: number) => {
  p.x += p.vx
  p.y += p.vy

  if (p.x < 0) p.x = width
  if (p.x > width) p.x = 0
  if (p.y < 0) p.y = height
  if (p.y > height) p.y = 0

  if (!mouse.active) return
  const dx = mouse.x - p.x
  const dy = mouse.y - p.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < MOUSE_RADIUS && dist > 0) {
    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
    p.x -= (dx / dist) * force * 1.2
    p.y -= (dy / dist) * force * 1.2
  }
}

const drawConnections = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i]
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < CONNECTION_DISTANCE) {
        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18
        ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`
        ctx.lineWidth = 0.75
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  }
}

const renderFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const width = canvas.width
  const height = canvas.height
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    updateParticle(p, width, height)
    ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.baseAlpha})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  drawConnections(ctx, width, height)
  animationFrameId = requestAnimationFrame(() => renderFrame(ctx, canvas))
}

const handleResize = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const parent = canvas.parentElement || canvas
  const rect = parent.getBoundingClientRect()
  canvas.width = rect.width || window.innerWidth
  canvas.height = rect.height || 400
}

const handleMouseMove = (e: MouseEvent) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.active = true
}

const handleMouseLeave = () => {
  mouse.active = false
}

onMounted(() => {
  if (typeof window === 'undefined' || !canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  handleResize()
  particles = Array.from({ length: MAX_PARTICLES }, () =>
    createParticle(canvas.width, canvas.height)
  )

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave)

  animationFrameId = requestAnimationFrame(() => renderFrame(ctx, canvas))
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none z-0"
    aria-hidden="true"
  />
</template>
