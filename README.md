# XWHYSI

Experimental electronic music portfolio for **Milo Lomas** (XWHYSI).

**Live site:** [xwhysi.com](https://xwhysi.com)

## About

XWHYSI creates sonic landscapes between organic and artificial. Based in Amsterdam, influenced by the uncanny valleys of Aphex Twin and the nature-technology fusion of Bjork.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel
- **Video Generation:** MuleRouter API (Alibaba Wan 2.6)

## Features

- 30 looping AI-generated video backgrounds
- Psychedelic visual effects (glitch, RGB split, warp)
- "Space Out" trippy mode with rapid video switching
- SoundCloud integration with auto-play
- Keyboard navigation (arrow keys, spacebar)
- Mobile-responsive design

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Video Generation

Videos are generated using the MuleRouter API with prompts inspired by:
- Organic technology aesthetics
- Bjork's nature-machine fusion
- Aphex Twin's uncanny valley visuals
- Alex Grey's psychedelic art

See `/milo/video-gen/` for the generation scripts and prompts.

## Structure

```
xwhysi/
├── src/app/
│   ├── page.tsx      # Main site component
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Styles + effects
├── public/
│   └── videos/       # 30 looping video backgrounds
└── package.json
```

## Connect

- [SoundCloud](https://soundcloud.com/drealization)
- [Instagram](https://instagram.com/xwhysi)
- Email: hello@xwhysi.com

---

*All sounds belong to the void.*
