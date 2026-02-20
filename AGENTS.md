# Dreal1zation_ Project Guidelines

## Development Workflow

**ALWAYS after making code changes:**
1. Run `npm run dev` (if not already running)
2. Open the browser to `http://localhost:3000` or the relevant route
3. Run `npm run lint` to verify code quality

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## FFmpeg Video Effects

Located in `scripts/ffmpeg-effects.sh` and documented in `scripts/ffmpeg-examples.md`

## Routes

- `/` - Main site (white-to-black scroll with autoplay videos)
- `/xwhysi1` - Original glitch-heavy version
- `/xwhysi2` - White-to-black scroll with invert/blur
- `/xwhysi3` - Zoom and stretch effects with speed control
- `/xwhysi4` - AI video generation (Wan2.1 on RTX 5090)
- `/consciousness` - Consciousness visualization
- `/gifs` - GIF generation
- `/interdimensional` - Interdimensional experience
