'use client'

import { useEffect, useRef, useState } from 'react'

export default function ConsciousnessPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [consciousnessLevel, setConsciousnessLevel] = useState(0.5)
  const [psychedelicIntensity, setPsychedelicIntensity] = useState(0.5)
  const timeRef = useRef<number>(0)
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    particlesRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: Math.random(),
      hue: Math.random() * 360,
      size: Math.random() * 3 + 1,
    }))

    const hslToRgb = (h: number, s: number, l: number, a: number = 1): string => {
      h = h % 360
      s = s / 100
      l = l / 100
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
      const m = l - c / 2
      let r = 0, g = 0, b = 0

      if (h < 60) [r, g, b] = [c, x, 0]
      else if (h < 120) [r, g, b] = [x, c, 0]
      else if (h < 180) [r, g, b] = [0, c, x]
      else if (h < 240) [r, g, b] = [0, x, c]
      else if (h < 300) [r, g, b] = [x, 0, c]
      else [r, g, b] = [c, 0, x]

      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    // Fractal-like recursive function
    const drawFractal = (x: number, y: number, size: number, depth: number, time: number, hue: number) => {
      if (depth === 0 || size < 2) return

      const angle = time * 0.5 + depth
      const offset = size * 0.3
      const points = 6

      for (let i = 0; i < points; i++) {
        const a = (i / points) * Math.PI * 2 + angle
        const nx = x + Math.cos(a) * offset
        const ny = y + Math.sin(a) * offset

        const pulsing = 1 + Math.sin(time + i * 0.5) * 0.3 * consciousnessLevel
        const newSize = size * 0.6 * pulsing

        ctx.fillStyle = hslToRgb(hue + i * 10, 70 + psychedelicIntensity * 30, 50 - depth * 5)
        ctx.beginPath()
        ctx.arc(nx, ny, newSize, 0, Math.PI * 2)
        ctx.fill()

        if (Math.random() > 0.3) {
          drawFractal(nx, ny, newSize, depth - 1, time, hue)
        }
      }
    }

    const animate = () => {
      timeRef.current += 0.01
      const time = timeRef.current

      // Dark background
      const bgHue = (time * 10) % 360
      ctx.fillStyle = hslToRgb(bgHue, 10, 5 + consciousnessLevel * 3)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw multiple fractal layers
      for (let layer = 0; layer < 4; layer++) {
        const layerTime = time + layer * 2
        const hue = (layer * 90 + time * 20 * psychedelicIntensity) % 360
        const radius = 40 + layer * 60
        const layerX = centerX + Math.cos(layerTime * 0.2 + layer) * radius * 0.3
        const layerY = centerY + Math.sin(layerTime * 0.15 + layer) * radius * 0.3

        drawFractal(layerX, layerY, 80 - layer * 10, 5 - layer, layerTime, hue)
      }

      // Complex recursive spiral
      const spiralDepth = 8
      for (let i = 0; i < spiralDepth; i++) {
        const angle = time * 0.3 + i * (Math.PI * 2 / spiralDepth)
        const radius = 50 + i * 30 + Math.sin(time + i) * 20
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        const hue = (angle / (Math.PI * 2) * 360 + time * 50 * psychedelicIntensity) % 360

        // Draw multiple rings per point
        for (let ring = 0; ring < 3; ring++) {
          const ringSize = 15 - ring * 4
          ctx.fillStyle = hslToRgb(hue + ring * 20, 80, 50 + consciousnessLevel * 20)
          ctx.beginPath()
          ctx.arc(x, y, ringSize, 0, Math.PI * 2)
          ctx.fill()

          // Glitch effect
          if (Math.random() > 0.8) {
            ctx.fillStyle = hslToRgb(hue + 180, 100, 50, 0.5)
            ctx.fillRect(x - ringSize - 5, y - 2, 10, 4)
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.life) * 2
        p.y += p.vy + Math.cos(time * 0.8 + p.life) * 2
        p.life += 0.005
        p.hue = (p.hue + psychedelicIntensity * 2) % 360

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const brightness = 50 + Math.sin(time + p.life * 10) * 30
        ctx.fillStyle = hslToRgb(p.hue, 100, brightness, Math.sin(p.life * Math.PI) * 0.7)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 + Math.sin(time * 2 + p.life) * 0.5), 0, Math.PI * 2)
        ctx.fill()
      })

      // Psychedelic distortion grid
      ctx.strokeStyle = hslToRgb((time * 30) % 360, 100, 50, 0.1 + psychedelicIntensity * 0.2)
      ctx.lineWidth = 1
      const gridSize = 50 + psychedelicIntensity * 50
      for (let x = -100; x < canvas.width + 100; x += gridSize) {
        for (let y = -100; y < canvas.height + 100; y += gridSize) {
          const distortion = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time * 0.8) * 20
          ctx.strokeRect(x + distortion, y + distortion, gridSize * 0.8, gridSize * 0.8)
        }
      }

      // Scan lines for glitch effect
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.03)'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.height; i += 2) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Chromatic aberration effect (RGB separation)
      if (psychedelicIntensity > 0.3) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        const offset = Math.floor(psychedelicIntensity * 5)

        for (let i = 0; i < data.length; i += 4) {
          const idx = i + offset * 4
          if (idx < data.length) {
            const temp = data[i]
            data[i] = data[idx]
            data[idx] = temp
          }
        }
        ctx.putImageData(imageData, 0, 0)
      }

      // Noise overlay
      const noiseAlpha = 0.05 + psychedelicIntensity * 0.1
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * noiseAlpha})`
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 20 + 5,
          Math.random() * 20 + 5
        )
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [consciousnessLevel, psychedelicIntensity])

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-8 text-white pointer-events-none z-10">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan to-pink bg-clip-text text-transparent">
          CONSCIOUSNESS FRACTURED
        </h1>
        <p className="text-cyan/70 font-mono text-sm">Sacred Circuitry // Interdimensional Explorer</p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto z-20">
        <div className="max-w-md">
          <div className="mb-6">
            <label className="block text-white/70 text-sm font-mono mb-2">
              Consciousness Level: {(consciousnessLevel * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={consciousnessLevel * 100}
              onChange={(e) => setConsciousnessLevel(Number(e.target.value) / 100)}
              className="w-full h-2 bg-gray-700 rounded appearance-none cursor-pointer accent-cyan"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/70 text-sm font-mono mb-2">
              Psychedelic Intensity: {(psychedelicIntensity * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={psychedelicIntensity * 100}
              onChange={(e) => setPsychedelicIntensity(Number(e.target.value) / 100)}
              className="w-full h-2 bg-gray-700 rounded appearance-none cursor-pointer accent-pink"
            />
          </div>

          <p className="text-white/50 text-xs font-mono">
            Fractals × Neural networks × Glitch effects
          </p>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-8 right-8 max-w-xs text-right pointer-events-none z-10">
        <div className="bg-black/60 backdrop-blur border border-cyan/30 rounded p-4">
          <p className="text-white/60 text-xs font-mono leading-relaxed">
            <span className="text-cyan">// FRACTAL GEOMETRY</span>
            <br />
            Recursive consciousness
            <br />
            <br />
            <span className="text-pink">// GLITCH REALITY</span>
            <br />
            RGB aberration × scan lines
            <br />
            <br />
            <span className="text-purple">// PARTICLE FLUX</span>
            <br />
            200 nodes in flux
          </p>
        </div>
      </div>
    </div>
  )
}
