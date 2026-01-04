"use client";

import { useState, useEffect } from "react";
import { artworks as initialArtworks } from "./artworks";
import { GalleryGrid } from "./GalleryGrid";

export default function InterdimensionalGallery() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Global Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(255,255,255,0.1) 1px,rgba(255,255,255,0.1) 2px)] animate-scanlines" />

        {/* Noise */}
        <svg
          className="absolute inset-0 opacity-[0.06]"
          width="100%"
          height="100%"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              result="noise"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="text-xs text-zinc-600 tracking-widest uppercase mb-6">
            <a href="/" className="hover:text-violet-400 transition-colors">
              ← Home
            </a>
          </div>

          {/* Title */}
          <div className="mb-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2 glitch-hover">
              INTERDIMENSIONAL GALLERY
            </h1>
            <p className="text-sm md:text-base text-zinc-500 tracking-widest">
              A journey through sacred geometry, consciousness, and digital transcendence
            </p>
          </div>

          {/* Subtitle */}
          <div className="flex items-center gap-2 text-xs text-zinc-600 tracking-[0.2em] uppercase">
            <span className="glitch-hover">Powered by MuleRouter</span>
            <span className="section-dot" />
            <span className="glitch-hover">Alex Grey Inspired</span>
            <span className="section-dot" />
            <span className="glitch-hover">AI Generated</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10">
        {/* Introduction Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
              This gallery explores the intersection of psychedelics, technology, and consciousness.
              Each artwork represents a journey through digital dimensions, inspired by the sacred geometry
              and consciousness-expanding visions of Alex Grey.
            </p>

            <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
              The artworks blend ancient spiritual symbols with cutting-edge technology,
              creating visual meditations on transcendence, interconnection, and the nature of consciousness itself.
            </p>

            <div className="pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500">
                <span className="text-violet-400 font-semibold">Note:</span> Videos are being generated in real-time.
                First generation may take a few minutes. Subsequent visits will load instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <GalleryGrid artworks={initialArtworks} isLoading={false} />

        {/* Footer Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-800 mt-16">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              About This Experience
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              These artworks are generated using advanced AI video generation, exploring the visual language
              of sacred geometry and consciousness expansion. Each piece combines:
            </p>

            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">◉</span>
                <span><span className="font-semibold text-white">Sacred Geometry</span> - Universal patterns found in nature and spirituality</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">◉</span>
                <span><span className="font-semibold text-white">Technology</span> - Circuit boards, networks, and digital consciousness</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">◉</span>
                <span><span className="font-semibold text-white">Consciousness</span> - The intersection of awareness and digital existence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">◉</span>
                <span><span className="font-semibold text-white">Psychedelia</span> - Visual journeys beyond ordinary perception</span>
              </li>
            </ul>

            <p className="text-zinc-500 text-sm pt-4">
              Explore these interdimensional artworks as meditation tools or inspirations for consciousness exploration.
            </p>
          </div>
        </section>
      </div>

      {/* Marquee Banner - Bottom */}
      <div className="marquee py-3 bg-black/40 backdrop-blur-sm text-xs tracking-[0.3em] text-zinc-600 uppercase border-t border-zinc-800 mt-16">
        <div className="marquee-content" style={{ animationDirection: "reverse" }}>
          CONSCIOUSNESS • TRANSCENDENCE • SACRED GEOMETRY • DIGITAL DIMENSIONS • CONSCIOUSNESS • TRANSCENDENCE • SACRED GEOMETRY • DIGITAL DIMENSIONS •
        </div>
      </div>
    </main>
  );
}
