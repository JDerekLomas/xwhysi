"use client";

import { useState, useEffect, useRef } from "react";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [invert, setInvert] = useState(false);
  const [blur, setBlur] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const BPM = 160;
    const beatsPerVideo = 4;
    const msPerBeat = 60000 / BPM;
    const interval = msPerBeat * beatsPerVideo;

    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const startMusic = () => {
    if (musicStarted) return;
    setMusicStarted(true);
    const iframe = document.querySelector('iframe[src*="soundcloud"]') as HTMLIFrameElement;
    if (iframe && window.SC) {
      const widget = window.SC.Widget(iframe);
      widget.play();
    }
  };

  const bgColor = `rgb(${Math.round(255 * (1 - scrollProgress))}, ${Math.round(255 * (1 - scrollProgress))}, ${Math.round(255 * (1 - scrollProgress))})`;
  const textColor = scrollProgress < 0.3 ? "#0a0a0a" : "#ffffff";
  const isDark = scrollProgress >= 0.4;
  const video = VIDEOS[currentVideo];

  let filter = "none";
  if (invert && blur) filter = "invert(1) blur(25px)";
  else if (invert) filter = "invert(1)";
  else if (blur) filter = "blur(25px)";

  return (
    <main
      ref={containerRef}
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
      onClick={startMusic}
    >
      <div
        className="fixed top-0 left-0 w-full h-1 z-50"
        style={{
          background: `linear-gradient(to right, #8b5cf6 ${scrollProgress * 100}%, transparent ${scrollProgress * 100}%)`,
        }}
      />

      <video
        key={currentVideo}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
        style={{ filter, opacity: 0.6 }}
      >
        <source src={video.url} type="video/mp4" />
      </video>

      <div
        className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-mono"
        style={{ color: textColor }}
      >
        <span className="text-violet-400">{currentVideo + 1}/{VIDEOS.length}</span>
        <span className="mx-2 opacity-50">•</span>
        <span>{video.label}</span>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setInvert(!invert)}
          className="px-4 py-2 rounded-full text-xs font-medium transition-all"
          style={{
            backgroundColor: invert ? "#8b5cf6" : "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${invert ? "#8b5cf6" : "rgba(255,255,255,0.2)"}`,
            color: "white",
          }}
        >
          Invert
        </button>
        <button
          onClick={() => setBlur(!blur)}
          className="px-4 py-2 rounded-full text-xs font-medium transition-all"
          style={{
            backgroundColor: blur ? "#8b5cf6" : "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${blur ? "#8b5cf6" : "rgba(255,255,255,0.2)"}`,
            color: "white",
          }}
        >
          Blur
        </button>
      </div>

      <div className="relative z-10 min-h-screen">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="text-center max-w-4xl">
            <h1
              className="text-[10rem] md:text-[16rem] font-black tracking-tighter leading-none transition-colors duration-500"
              style={{ color: textColor }}
            >
              XWHYSI
            </h1>

            <p
              className="text-xl md:text-2xl mt-4 transition-colors duration-500"
              style={{ color: textColor, opacity: 0.6 }}
            >
              i don&apos;t know what to say
            </p>

            <div
              className="flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase mt-8 mb-12 transition-colors duration-500"
              style={{ color: textColor, opacity: 0.5 }}
            >
              <span>Milo Lomas</span>
              <span className="w-1 h-1 rounded-full bg-violet-500" />
              <span>Amsterdam</span>
              <span className="w-1 h-1 rounded-full bg-violet-500" />
              <span>Experimental</span>
            </div>

            <a
              href="#listen"
              className="inline-flex items-center gap-3 px-10 py-5 bg-violet-600/80 hover:bg-violet-500 rounded-full text-xl font-bold tracking-wider transition-all hover:scale-105"
            >
              PLAY MUSIC
            </a>

            <nav className="flex flex-wrap justify-center gap-8 text-lg mt-8">
              <a
                href="#listen"
                className="hover:text-violet-400 transition-colors"
                style={{ color: textColor, opacity: 0.7 }}
              >
                Listen
              </a>
              <a
                href="#about"
                className="hover:text-violet-400 transition-colors"
                style={{ color: textColor, opacity: 0.7 }}
              >
                About
              </a>
              <a
                href="#connect"
                className="hover:text-violet-400 transition-colors"
                style={{ color: textColor, opacity: 0.7 }}
              >
                Connect
              </a>
            </nav>
          </div>
        </section>

        <section id="listen" className="relative px-6 py-32">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16 ml-[10%]">
              <span
                className="text-xs tracking-[0.5em] uppercase block mb-2 transition-colors duration-500"
                style={{ color: textColor, opacity: 0.4 }}
              >
                001
              </span>
              <h2
                className="text-5xl md:text-7xl font-extralight tracking-tight transition-colors duration-500"
                style={{ color: textColor }}
              >
                Listen
              </h2>
            </div>

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

            <div className="flex flex-wrap gap-4 ml-[15%]">
              <a
                href="https://soundcloud.com/drealization"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full transition-all hover:bg-violet-500/20"
                style={{
                  border: `1px solid ${isDark ? "#8b5cf6" : "#0a0a0a"}`,
                  color: textColor
                }}
              >
                SoundCloud
              </a>
              <span
                className="px-8 py-4 rounded-full"
                style={{
                  border: `1px solid ${isDark ? "rgba(139,92,246,0.3)" : "rgba(10,10,10,0.3)"}`,
                  color: textColor,
                  opacity: 0.5
                }}
              >
                Spotify soon
              </span>
            </div>
          </div>
        </section>

        <section id="about" className="relative px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 mr-[10%] text-right">
              <span
                className="text-xs tracking-[0.5em] uppercase block mb-2 transition-colors duration-500"
                style={{ color: textColor, opacity: 0.4 }}
              >
                002
              </span>
              <h2
                className="text-5xl md:text-7xl font-extralight tracking-tight transition-colors duration-500"
                style={{ color: textColor }}
              >
                About
              </h2>
            </div>

            <div className="space-y-12">
              <p
                className="text-2xl md:text-3xl font-extralight leading-relaxed ml-[5%] max-w-2xl transition-colors duration-500"
                style={{ color: textColor, opacity: isDark ? 0.9 : 0.8 }}
              >
                Pittsburgh → San Diego → Amsterdam.
              </p>

              <p
                className="text-xl md:text-2xl font-extralight leading-relaxed mr-[10%] ml-auto max-w-xl text-right transition-colors duration-500"
                style={{ color: textColor, opacity: isDark ? 0.7 : 0.6 }}
              >
                Creating sonic landscapes between organic and artificial.
              </p>

              <p
                className="text-lg font-extralight leading-relaxed ml-[15%] max-w-md transition-colors duration-500"
                style={{ color: textColor, opacity: isDark ? 0.6 : 0.5 }}
              >
                Influenced by the uncanny valleys of Aphex Twin. The nature-technology fusion of Björk.
                Music that breathes but you&apos;re not sure if it&apos;s alive.
              </p>
            </div>

            <div
              className="mt-20 flex flex-wrap justify-center gap-4 text-xs tracking-[0.3em] uppercase transition-colors duration-500"
              style={{ color: textColor, opacity: 0.4 }}
            >
              <span>Pittsburgh</span>
              <span className="text-violet-500">→</span>
              <span>San Diego</span>
              <span className="text-violet-500">→</span>
              <span>Amsterdam</span>
            </div>

            <div className="mt-24 ml-[10%] max-w-lg">
              <h3
                className="text-sm tracking-[0.3em] uppercase mb-6 transition-colors duration-500"
                style={{ color: textColor, opacity: 0.4 }}
              >
                Beyond Sound
              </h3>
              <p
                className="text-lg font-extralight leading-relaxed transition-colors duration-500"
                style={{ color: textColor, opacity: isDark ? 0.7 : 0.6 }}
              >
                Exploring aerial perspectives through FPV drones. Capturing the intersection of
                movement and stillness from above. The same tension that lives in the music.
              </p>
            </div>
          </div>
        </section>

        <section id="connect" className="relative px-6 py-32">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <span
                className="text-xs tracking-[0.5em] uppercase block mb-2 transition-colors duration-500"
                style={{ color: textColor, opacity: 0.4 }}
              >
                003
              </span>
              <h2
                className="text-5xl md:text-7xl font-extralight tracking-tight transition-colors duration-500"
                style={{ color: textColor }}
              >
                Connect
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6">
              <a
                href="https://instagram.com/dreal1zation_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight hover:text-violet-400 transition-colors"
                style={{ color: textColor }}
              >
                Instagram
              </a>
              <a
                href="https://soundcloud.com/drealization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight hover:text-violet-400 transition-colors"
                style={{ color: textColor }}
              >
                SoundCloud
              </a>
              <a
                href="mailto:hello@xwhysi.com"
                className="text-3xl md:text-4xl font-extralight hover:text-violet-400 transition-colors"
                style={{ color: textColor }}
              >
                Email
              </a>
            </div>

            <p
              className="mt-16 text-center text-sm tracking-wide transition-colors duration-500"
              style={{ color: textColor, opacity: 0.4 }}
            >
              For bookings, collaborations, or just to say what&apos;s up
            </p>
          </div>
        </section>

        <footer className="px-6 py-16 text-center">
          <p
            className="text-xs tracking-[0.2em] transition-colors duration-500"
            style={{ color: textColor, opacity: 0.4 }}
          >
            © {new Date().getFullYear()} XWHYSI — ALL SOUNDS BELONG TO THE VOID
          </p>
        </footer>
      </div>
    </main>
  );
}
