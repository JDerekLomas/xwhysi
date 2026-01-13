"use client";

import { useState, useEffect } from "react";

const VIDEOS = [
  { url: "/videos/video-01.mp4", label: "Organic Flow" },
  { url: "/videos/video-02.mp4", label: "Crystal Growth" },
  { url: "/videos/video-03.mp4", label: "Neural Web" },
  { url: "/videos/video-04.mp4", label: "Liquid Metal" },
  { url: "/videos/video-05.mp4", label: "Fiber Forest" },
  { url: "/videos/video-06.mp4", label: "Skin Circuit" },
  { url: "/videos/video-07.mp4", label: "Bioluminescent" },
  { url: "/videos/video-08.mp4", label: "Uncanny Valley" },
  { url: "/videos/video-09.mp4", label: "Mercury Pool" },
  { url: "/videos/video-10.mp4", label: "Fractal Ice" },
  { url: "/videos/video-11.mp4", label: "Heart Machine" },
  { url: "/videos/video-12.mp4", label: "Digital Moss" },
  { url: "/videos/video-13.mp4", label: "Particle Dance" },
  { url: "/videos/video-14.mp4", label: "Void Bloom" },
  { url: "/videos/video-15.mp4", label: "Chrome Nature" },
  { url: "/videos/video-16.mp4", label: "Flesh Circuit" },
  { url: "/videos/video-17.mp4", label: "Dream Decay" },
  { url: "/videos/video-18.mp4", label: "Glitch Garden" },
  { url: "/videos/video-19.mp4", label: "Neural Pulse" },
  { url: "/videos/video-20.mp4", label: "Organic Tech" },
  { url: "/videos/video-21.mp4", label: "Slow Morph" },
  { url: "/videos/video-22.mp4", label: "Light Veins" },
  { url: "/videos/video-23.mp4", label: "Synth Flesh" },
  { url: "/videos/video-24.mp4", label: "Crystal Heart" },
  { url: "/videos/video-25.mp4", label: "Void Dance" },
  { url: "/videos/video-26.mp4", label: "Bio Rhythm" },
  { url: "/videos/video-27.mp4", label: "Machine Dream" },
  { url: "/videos/video-28.mp4", label: "Neon Decay" },
  { url: "/videos/video-29.mp4", label: "Phantom Limb" },
  { url: "/videos/video-30.mp4", label: "Alex Grey Vision" },
];

const MARQUEE_TEXT = "XWHYSI • AMSTERDAM • EXPERIMENTAL • SONIC ARCHITECT • PITTSBURGH • SAN DIEGO • ";

declare global {
  interface Window {
    SC?: {
      Widget: (iframe: HTMLIFrameElement) => {
        play: () => void;
        bind: (event: string, callback: () => void) => void;
      };
    };
  }
}

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [tripping, setTripping] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const startMusic = () => {
    if (musicStarted) return;
    setMusicStarted(true);

    const iframe = document.querySelector('iframe[src*="soundcloud"]') as HTMLIFrameElement;
    if (iframe && window.SC) {
      const widget = window.SC.Widget(iframe);
      widget.play();
    }
  };

  const spaceOut = () => {
    setTripping(true);
    startMusic();
    // Rapid video switching
    let count = 0;
    const tripInterval = setInterval(() => {
      setCurrentVideo(Math.floor(Math.random() * VIDEOS.length));
      count++;
      if (count > 20) {
        clearInterval(tripInterval);
        setTripping(false);
      }
    }, 200);
  };

  useEffect(() => {
    setMounted(true);
    // Detect mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    const interval = setInterval(() => {
      if (!tripping) {
        setVideoLoaded(false);
        setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
      }
    }, 10000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setVideoLoaded(false);
        setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
        startMusic();
      } else if (e.key === "ArrowLeft") {
        setVideoLoaded(false);
        setCurrentVideo((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
        startMusic();
      }
    };

    // Preload next video
    const preloadNext = () => {
      const nextIndex = (currentVideo + 1) % VIDEOS.length;
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = VIDEOS[nextIndex].url;
      link.as = "video";
      document.head.appendChild(link);
    };
    preloadNext();

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tripping, musicStarted, currentVideo]);

  if (!mounted) return null;

  return (
    <main
      className={`relative min-h-screen cursor-glow ${tripping ? 'tripping' : ''}`}
      onClick={startMusic}
      onTouchStart={startMusic}
    >
      {/* Loading Placeholder */}
      <div
        className={`fixed inset-0 z-0 bg-gradient-to-br from-violet-950/50 via-black to-pink-950/30 transition-opacity duration-500 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl md:text-8xl font-black text-white/10 animate-pulse">XWHYSI</div>
        </div>
      </div>

      {/* Video Background */}
      <video
        key={currentVideo}
        className={`video-bg ${tripping ? 'tripping-video' : 'glitch-constant'} transition-opacity duration-300 ${
          videoLoaded ? 'opacity-50' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload={isMobile ? "metadata" : "auto"}
        onCanPlay={() => setVideoLoaded(true)}
        onLoadedData={() => setVideoLoaded(true)}
        {...{ 'webkit-playsinline': 'true' } as React.VideoHTMLAttributes<HTMLVideoElement>}
      >
        <source src={VIDEOS[currentVideo].url} type="video/mp4" />
      </video>

      {/* Video Label */}
      <div className="fixed top-4 left-4 z-50 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-mono text-zinc-400">
        <span className="text-violet-400">{currentVideo + 1}/{VIDEOS.length}</span>
        <span className="mx-2">•</span>
        <span>{VIDEOS[currentVideo].label}</span>
        <span className="ml-3 text-zinc-600 hidden md:inline">← → SPACE</span>
      </div>

      {/* Space Out Button */}
      <button
        onClick={(e) => { e.stopPropagation(); spaceOut(); }}
        className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
          tripping
            ? 'bg-pink-500 text-white animate-pulse scale-110'
            : 'bg-violet-600/80 hover:bg-violet-500 text-white hover:scale-105'
        }`}
      >
        {tripping ? '◉ TRIPPING ◉' : '✧ SPACE OUT ✧'}
      </button>

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
              className="fade-in text-[12rem] md:text-[18rem] font-black tracking-tighter mb-4 pulse-glow glitch-heavy rgb-split leading-none"
              data-text="XWHYSI"
            >
              XWHYSI
            </h1>

            <div className="fade-in fade-in-delay-1 flex items-center justify-center gap-2 text-zinc-500 text-sm tracking-[0.2em] uppercase mb-12">
              <span className="glitch-hover">Milo Lomas</span>
              <span className="section-dot" />
              <span className="glitch-hover">Amsterdam</span>
              <span className="section-dot" />
              <span className="glitch-hover">Experimental</span>
            </div>

            {/* Big Play Button */}
            <a
              href="#listen"
              className="fade-in fade-in-delay-2 inline-flex items-center gap-3 px-10 py-5 mb-8 bg-violet-600/80 hover:bg-violet-500 rounded-full text-2xl font-bold tracking-wider transition-all hover:scale-105 pulse-glow"
            >
              ▶ PLAY MUSIC
            </a>

            <nav className="fade-in fade-in-delay-3 flex flex-wrap justify-center gap-8 text-lg">
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
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/drealization&color=%238b5cf6&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                className="rounded-xl opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Links - scattered */}
            <div className="flex flex-wrap gap-4 ml-[15%]">
              <a
                href="https://soundcloud.com/drealization"
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
                Pittsburgh → San Diego → Amsterdam.
              </p>

              <p className="text-xl md:text-2xl font-extralight leading-relaxed text-zinc-400 mr-[10%] ml-auto max-w-xl text-right">
                Creating sonic landscapes between organic and artificial.
              </p>

              <p className="text-lg font-extralight leading-relaxed text-zinc-500 ml-[15%] max-w-md">
                Influenced by the uncanny valleys of Aphex Twin. The nature-technology fusion of Björk.
                Music that breathes but you&apos;re not sure if it&apos;s alive.
              </p>
            </div>

            {/* Origin trail */}
            <div className="mt-20 flex flex-wrap justify-center gap-4 text-xs tracking-[0.3em] text-zinc-700 uppercase">
              <span className="glitch-hover">Pittsburgh</span>
              <span className="text-violet-500">→</span>
              <span className="glitch-hover">San Diego</span>
              <span className="text-violet-500">→</span>
              <span className="glitch-hover text-zinc-400">Amsterdam</span>
            </div>

            {/* Interests subsection */}
            <div className="mt-24 ml-[10%] max-w-lg">
              <h3 className="text-sm tracking-[0.3em] text-zinc-600 uppercase mb-6">Beyond Sound</h3>
              <p className="text-lg font-extralight leading-relaxed text-zinc-400">
                Exploring aerial perspectives through FPV drones. Capturing the intersection of
                movement and stillness from above. The same tension that lives in the music.
              </p>
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
                href="https://instagram.com/dreal1zation_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight glitch-hover hover:text-violet-400 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://soundcloud.com/drealization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight glitch-hover hover:text-violet-400 transition-colors"
              >
                SoundCloud
              </a>
              <a
                href="mailto:hello@xwhysi.com"
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
            <p>© {new Date().getFullYear()} XWHYSI</p>
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
