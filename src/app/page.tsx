"use client";

import { useState, useEffect } from "react";

const VIDEO_BACKGROUNDS = [
  // Original videos
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/15b73dbd-72d0-44e0-a848-79ee0f64d0d3/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/b3213694-67b7-4ec6-b451-ed56008b92d0/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/9a79a8f2-2b2f-42f8-8012-c1054b13a4fe/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/260ee6fc-5634-4379-a9de-39ea03efb87a/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/36c09145-7fb9-4fdd-a50f-abaa66b4d255/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/96fb0ed4-0ff9-484a-8e73-a07708f07e46/result_00.mp4",
  // Fractal tunnels
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/1faff18c-9488-4521-bfd4-68353b4e7993/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/c6e1f9b4-613b-4a4c-8bbe-58018b976da2/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/3cac19bb-5dba-4745-ac57-1c3f2309a0b4/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/f0a5539d-e20e-45e7-beb3-8a3d359e7a12/result_00.mp4",
  // Cursed early 2000s 3D animals
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/90b724c4-f77b-4299-aafb-dafc8ec895e3/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/858936a6-2c83-44dd-9cd5-8ec1a36a7a39/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/5f4d67b1-1c3f-4c8c-b916-d921b4b0164b/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/69218ac5-8e8b-4c9e-a08b-4e750903a763/result_00.mp4",
  "https://mule-router-assets.muleusercontent.com/router_public/production/ephemeral/7b869cda-0eeb-46ca-81a1-5704d16a16e6/result_00.mp4",
];

const MARQUEE_TEXT = "MILO LOMAS • AMSTERDAM • EXPERIMENTAL • SONIC ARCHITECT • PITTSBURGH ROOTS • BREMEN BLOOD • CHAGRIN FALLS • ";

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % VIDEO_BACKGROUNDS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen cursor-glow">
      {/* Video Background */}
      <video
        key={currentVideo}
        className="video-bg glitch-constant"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={VIDEO_BACKGROUNDS[currentVideo]} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 min-h-screen distort-wave">

        {/* Marquee Banner */}
        <div className="marquee py-2 bg-black/40 backdrop-blur-sm text-xs tracking-[0.3em] text-zinc-500 uppercase">
          <div className="marquee-content">
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </div>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 psychedelic-bg">
          <div className="text-center max-w-4xl">
            <h1
              className="fade-in text-7xl md:text-9xl font-extralight tracking-tighter mb-4 pulse-glow glitch-heavy rgb-split"
              data-text="Milo Lomas"
            >
              Milo Lomas
            </h1>

            <div className="fade-in fade-in-delay-1 flex items-center justify-center gap-2 text-zinc-500 text-sm tracking-[0.2em] uppercase mb-12">
              <span className="glitch-hover">Amsterdam</span>
              <span className="section-dot" />
              <span className="glitch-hover">Experimental</span>
              <span className="section-dot" />
              <span className="glitch-hover">Sonic</span>
            </div>

            <nav className="fade-in fade-in-delay-2 flex flex-wrap justify-center gap-8 text-lg">
              <a href="#listen" className="glitch-hover hover:text-white transition-colors float" style={{animationDelay: '0s'}}>
                ↓ Listen
              </a>
              <a href="#about" className="glitch-hover hover:text-white transition-colors float" style={{animationDelay: '0.5s'}}>
                ↓ About
              </a>
              <a href="#connect" className="glitch-hover hover:text-white transition-colors float" style={{animationDelay: '1s'}}>
                ↓ Connect
              </a>
            </nav>
          </div>

          {/* Floating coordinates */}
          <div className="absolute bottom-10 left-10 text-xs font-mono text-zinc-600 warp-text">
            52.3676°N
          </div>
          <div className="absolute bottom-10 right-10 text-xs font-mono text-zinc-600 warp-text">
            4.9041°E
          </div>
        </section>

        {/* Listen Section - Flows from hero */}
        <section id="listen" className="relative px-6 py-32 section-flow">
          <div className="max-w-5xl mx-auto">

            {/* Section title - offset */}
            <div className="mb-16 ml-[10%]">
              <span className="text-xs tracking-[0.5em] text-zinc-600 uppercase block mb-2">001</span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tight glitch-hover">
                Listen
              </h2>
            </div>

            {/* SoundCloud Embed - offset other direction */}
            <div className="mr-[5%] mb-16">
              <iframe
                width="100%"
                height="400"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/xwhysi&color=%238b5cf6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                className="rounded-xl opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Links - scattered */}
            <div className="flex flex-wrap gap-4 ml-[15%]">
              <a
                href="https://soundcloud.com/xwhysi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-zinc-800 rounded-full hover:border-violet-500 hover:bg-violet-500/10 transition-all glitch-hover text-sm tracking-wider"
              >
                SoundCloud →
              </a>
              <span className="px-8 py-4 border border-zinc-800/50 rounded-full text-zinc-600 text-sm tracking-wider">
                Spotify soon
              </span>
              <span className="px-8 py-4 border border-zinc-800/50 rounded-full text-zinc-600 text-sm tracking-wider">
                Apple soon
              </span>
            </div>
          </div>
        </section>

        {/* About Section - Flows naturally */}
        <section id="about" className="relative px-6 py-32">
          <div className="max-w-4xl mx-auto">

            {/* Section title - offset right */}
            <div className="mb-16 mr-[10%] text-right">
              <span className="text-xs tracking-[0.5em] text-zinc-600 uppercase block mb-2">002</span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tight glitch-hover">
                About
              </h2>
            </div>

            {/* Bio text - staggered blocks */}
            <div className="space-y-12">
              <p className="text-2xl md:text-3xl font-extralight leading-relaxed text-zinc-300 ml-[5%] max-w-2xl">
                Born in Pittsburgh. Mother from Bremen, father from Chagrin Falls.
              </p>

              <p className="text-xl md:text-2xl font-extralight leading-relaxed text-zinc-400 mr-[10%] ml-auto max-w-xl text-right">
                Now in Amsterdam, creating sonic landscapes between organic and artificial.
              </p>

              <p className="text-lg font-extralight leading-relaxed text-zinc-500 ml-[15%] max-w-md">
                Influenced by the uncanny valleys of Aphex Twin. The nature-technology fusion of Björk.
                Music that breathes but you&apos;re not sure if it&apos;s alive.
              </p>
            </div>

            {/* Origin trail */}
            <div className="mt-20 flex flex-wrap justify-between text-xs tracking-[0.3em] text-zinc-700 uppercase">
              <span className="glitch-hover">Pittsburgh PA</span>
              <span className="text-violet-500">→</span>
              <span className="glitch-hover">Bremen DE</span>
              <span className="text-violet-500">→</span>
              <span className="glitch-hover">Chagrin Falls OH</span>
              <span className="text-violet-500">→</span>
              <span className="glitch-hover text-zinc-400">Amsterdam NL</span>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="relative px-6 py-32 section-flow">
          <div className="max-w-3xl mx-auto">

            {/* Section title - centered */}
            <div className="mb-16 text-center">
              <span className="text-xs tracking-[0.5em] text-zinc-600 uppercase block mb-2">003</span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tight glitch-hover">
                Connect
              </h2>
            </div>

            {/* Links - large and spaced */}
            <div className="flex flex-col items-center gap-6">
              <a
                href="https://instagram.com/xwhysi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight glitch-hover hover:text-violet-400 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://soundcloud.com/xwhysi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight glitch-hover hover:text-violet-400 transition-colors"
              >
                SoundCloud
              </a>
              <a
                href="mailto:hello@milolomas.com"
                className="text-3xl md:text-4xl font-extralight glitch-hover hover:text-violet-400 transition-colors"
              >
                Email
              </a>
            </div>

            {/* Booking note */}
            <p className="mt-16 text-center text-sm text-zinc-600 tracking-wide">
              For bookings, collaborations, or just to say what&apos;s up
            </p>
          </div>
        </section>

        {/* Footer - minimal */}
        <footer className="px-6 py-16 text-center">
          <div className="text-xs text-zinc-700 tracking-[0.2em] space-y-2">
            <p>© {new Date().getFullYear()} MILO LOMAS</p>
            <p className="font-mono glitch-hover">
              ALL SOUNDS BELONG TO THE VOID
            </p>
          </div>
        </footer>

        {/* Marquee Banner - bottom */}
        <div className="marquee py-2 bg-black/40 backdrop-blur-sm text-xs tracking-[0.3em] text-zinc-500 uppercase">
          <div className="marquee-content" style={{animationDirection: 'reverse'}}>
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </div>
        </div>
      </div>
    </main>
  );
}
