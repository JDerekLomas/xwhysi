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

export default function Xwhysi2() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [invert, setInvert] = useState(false);
  const [blur, setBlur] = useState(false);
  const [showUI, setShowUI] = useState(true);
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
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h") {
        setShowUI((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bgColor = `rgb(${Math.round(255 * (1 - scrollProgress))}, ${Math.round(255 * (1 - scrollProgress))}, ${Math.round(255 * (1 - scrollProgress))})`;
  const textColor = scrollProgress < 0.3 ? "#0a0a0a" : "#ffffff";
  const video = VIDEOS[currentVideo];

  let filter = "none";
  if (invert && blur) filter = "invert(1) blur(25px)";
  else if (invert) filter = "invert(1)";
  else if (blur) filter = "blur(25px)";

  return (
    <main
      ref={containerRef}
      className="min-h-[200vh] transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {showUI && (
        <div
          className="fixed top-0 left-0 w-full h-1 z-50"
          style={{
            background: `linear-gradient(to right, #8b5cf6 ${scrollProgress * 100}%, transparent ${scrollProgress * 100}%)`,
          }}
        />
      )}

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

      {showUI && (
        <div
          className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-mono"
          style={{ color: textColor }}
        >
          <span className="text-violet-400">{currentVideo + 1}/{VIDEOS.length}</span>
          <span className="mx-2 opacity-50">•</span>
          <span>{video.label}</span>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col">
        <section className="h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1
              className="text-[6rem] md:text-[14rem] font-black tracking-tighter leading-none transition-colors duration-500"
              style={{ color: textColor }}
            >
              XWHYSI
            </h1>
            <p
              className="text-lg md:text-xl tracking-[0.3em] uppercase mt-4 transition-colors duration-500"
              style={{ color: textColor, opacity: 0.6 }}
            >
              scroll to enter the void
            </p>
          </div>
        </section>

        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="w-full max-w-5xl">
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setInvert(!invert)}
                className="px-8 py-4 rounded-full text-sm font-medium transition-all"
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
                className="px-8 py-4 rounded-full text-sm font-medium transition-all"
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
          </div>
        </section>
      </div>
    </main>
  );
}
