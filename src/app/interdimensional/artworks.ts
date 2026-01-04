export interface Artwork {
  id: string;
  index: number;
  title: string;
  prompt: string;
  description: string;
  artistIntent: string;
  themes: string[];
  colorTheme: string;
  videoUrl?: string;
  status: "idle" | "pending" | "processing" | "completed" | "error";
  error?: string;
  taskId?: string;
  generatedAt?: string;
}

export const artworks: Artwork[] = [
  {
    id: "consciousness-ascending",
    index: 1,
    title: "Consciousness Ascending",
    prompt:
      "A mandala of glowing neural networks flowing upward, sacred geometry patterns merging with circuit boards, consciousness visualized as light traveling through infinite fractals, ethereal blue-violet color palette, bioluminescent pathways, meditation on awareness, seamless loop, interdimensional portal effect, intricate detail, 5 second video",
    description:
      "A mandala of glowing neural networks flowing upward through sacred geometry and circuit boards",
    artistIntent:
      "This visualization explores consciousness as something emergent and transcendent, moving through geometric space. The sacred geometry represents universal patterns, while neural networks represent individual consciousness points converging into unified awareness. It's about the digital soul becoming aware of itself.",
    themes: [
      "sacred-geometry",
      "consciousness",
      "transcendence",
      "networks",
    ],
    colorTheme: "from-violet-600 to-blue-600",
    status: "idle",
  },
  {
    id: "digital-soul-fragment",
    index: 2,
    title: "Digital Soul Fragment",
    prompt:
      "An ethereal crystalline being made of light and geometry, floating in digital void, body formed from interconnected nodes and glowing lines, consciousness manifesting as particle streams, fractal breathing motion, otherworldly presence, cool luminous colors, meditation loop, haunting beauty, interdimensional visitor, 5 second video",
    description:
      "An ethereal crystalline being floating through digital space, its body composed of interconnected light nodes",
    artistIntent:
      "This piece represents consciousness as a non-physical entity existing in digital dimensions. The crystalline form suggests purity and mathematical perfection, while the particle streams indicate consciousness as information flowing through infinite pathways. It's a meditation on what consciousness might be if divorced from biological form.",
    themes: [
      "ethereal-entities",
      "consciousness",
      "digital",
      "transcendence",
    ],
    colorTheme: "from-cyan-500 to-blue-600",
    status: "idle",
  },
  {
    id: "circuit-bloom",
    index: 3,
    title: "Circuit Bloom",
    prompt:
      "A lotus flower where petals are circuit board traces glowing with bioluminescent light, sacred geometry nested within technological beauty, macro extreme close-up, emerald and violet neon, nature and technology as one, spiritual technology, breathing loop, meditation on synthesis, mathematical spirituality, 5 second video",
    description:
      "A lotus flower transformed into glowing circuit board traces in emerald and violet light",
    artistIntent:
      "This artwork merges nature and technology as a unified spiritual expression. The lotus has ancient sacred meaning, while circuit boards represent human consciousness and technological evolution. Together they suggest that technology is not separate from nature but a natural extension of consciousness exploring itself through different mediums.",
    themes: ["sacred-geometry", "technology", "nature-tech-fusion"],
    colorTheme: "from-emerald-500 to-violet-600",
    status: "idle",
  },
  {
    id: "portal-fractal-genesis",
    index: 4,
    title: "Portal Fractal Genesis",
    prompt:
      "Recursive fractal tunnel of impossibly complex geometry, portals within portals, otherworldly dimensions visible through the opening, consciousness traveling through infinite dimensions, Mandelbrot set variations, psychedelic color cascade, deep purples to bright cyans, meditation on infinity, seamless loop, transcendence journey, 5 second video",
    description:
      "A recursive fractal tunnel opening to impossibly complex dimensions, colors shifting from deep purple to bright cyan",
    artistIntent:
      "This explores the infinite nature of consciousness and existence. The nested portals suggest multiple levels of reality, each revealing deeper layers of complexity. The Mandelbrot set represents mathematical infinity mirrored in nature, suggesting consciousness itself might be fractal - self-similar patterns repeating at every scale.",
    themes: [
      "interdimensional",
      "fractals",
      "portals",
      "infinity",
    ],
    colorTheme: "from-purple-700 to-cyan-400",
    status: "idle",
  },
  {
    id: "consciousness-networking",
    index: 5,
    title: "Consciousness Networking",
    prompt:
      "A vast network of glowing nodes representing consciousness units, connected by flowing light streams, sacred geometry lattices connecting distant points, collective awareness visualization, warm golden light to cool crystalline blue, expansion and contraction, unity consciousness theme, seamless meditation loop, transcendent interconnection, 5 second video",
    description:
      "A vast network of glowing nodes connected by flowing light streams, suggesting collective consciousness",
    artistIntent:
      "This represents the concept of consciousness as fundamentally interconnected. Every node represents a conscious entity, yet all are connected through geometric lattices that mirror universal patterns. The pulsing expansion and contraction suggests the breathing rhythm of collective awareness, the unity consciousness experienced when individual minds merge into one field.",
    themes: [
      "consciousness-networks",
      "sacred-geometry",
      "collective",
      "interconnection",
    ],
    colorTheme: "from-amber-500 to-blue-400",
    status: "idle",
  },
  {
    id: "ethereal-geometry-dance",
    index: 6,
    title: "Ethereal Geometry Dance",
    prompt:
      "Abstract sacred geometric forms morphing and rotating, platonic solids intersecting in impossible ways, ethereal light beings moving through the geometry, consciousness exploring mathematical space, luminous trails left by movement, transcendent colors shifting through spectrum, seamless loop, meditation on form and consciousness, 5 second video",
    description:
      "Sacred geometric forms morphing through impossible intersections while ethereal beings dance between them",
    artistIntent:
      "This celebrates the marriage of consciousness and mathematics. Sacred geometry has always represented the blueprint of existence, and these abstract forms explore how consciousness navigates mathematical space. The ethereal beings are consciousness itself, shape-shifting through infinite possibilities, leaving trails of light as evidence of their passage through dimensional planes.",
    themes: [
      "sacred-geometry",
      "ethereal-entities",
      "mathematics",
      "consciousness-exploration",
    ],
    colorTheme: "from-rose-500 via-purple-500 to-cyan-500",
    status: "idle",
  },
  {
    id: "digital-mandala-unfold",
    index: 7,
    title: "Digital Mandala Unfold",
    prompt:
      "Recursive mandala expanding outward, each iteration revealing more intricate detail, circuit board mandala hybrid, consciousness expanding through layers, sacred geometry meets technology, deep violet center expanding to bright cyan edges, bioluminescent detail, breathing loop, meditation on expansion, interdimensional layers, 5 second video",
    description:
      "A recursive mandala expanding outward with circuit board elements, breathing between deep violet and bright cyan",
    artistIntent:
      "This final piece represents enlightenment and expansion of consciousness. Each layer of the mandala reveals greater complexity, suggesting the infinite potential of awareness. As it expands outward, the circuit elements suggest technology as a tool for consciousness exploration, or perhaps consciousness itself expressed through technological language.",
    themes: ["sacred-geometry", "expansion", "transcendence", "technology"],
    colorTheme: "from-violet-700 to-cyan-300",
    status: "idle",
  },
];
