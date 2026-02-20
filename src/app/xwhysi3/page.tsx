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

const ZOOM_PRESETS = [
  { name: "None", scale: 1, translateX: 0, translateY: 0 },
  { name: "Zoom 2x", scale: 2, translateX: 0, translateY: 0 },
  { name: "Zoom 4x", scale: 4, translateX: 0, translateY: 0 },
  { name: "Zoom 8x", scale: 8, translateX: 0, translateY: 0 },
  { name: "Zoom 16x", scale: 16, translateX: 0, translateY: 0 },
  { name: "Corner TL", scale: 3, translateX: 40, translateY: 40 },
  { name: "Corner BR", scale: 3, translateX: -40, translateY: -40 },
  { name: "Center Focus", scale: 2.5, translateX: 0, translateY: 0 },
  { name: "Wide Stretch", scale: 1, stretchX: 2, stretchY: 1 },
  { name: "Tall Stretch", scale: 1, stretchX: 1, stretchY: 2 },
  { name: "Squish", scale: 1, stretchX: 0.5, stretchY: 2 },
  { name: "Expand", scale: 1, stretchX: 2, stretchY: 0.5 },
];

export default function Xwhysi3() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showUI, setShowUI] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed, currentVideo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h") {
        setShowUI((prev) => !prev);
      } else if (e.key === "ArrowUp") {
        setSpeed((prev) => Math.min(prev + 0.5, 8));
      } else if (e.key === "ArrowDown") {
        setSpeed((prev) => Math.max(prev - 0.5, 0.1));
      } else if (e.key === "ArrowRight") {
        setCurrentZoom((prev) => (prev + 1) % ZOOM_PRESETS.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentZoom((prev) => (prev - 1 + ZOOM_PRESETS.length) % ZOOM_PRESETS.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bgColor = `rgb(${Math.round(255 * (1 - scrollProgress))}, ${Math.round(255 * (1 - scrollProgress))}, ${Math.round(255 * (1 - scrollProgress))})`;
  const textColor = scrollProgress < 0.3 ? "#0a0a0a" : "#ffffff";
  const video = VIDEOS[currentVideo];
  const zoom = ZOOM_PRESETS[currentZoom];

  const scaleX = zoom.stretchX || 1;
  const scaleY = zoom.stretchY || 1;
  const transform = `scale(${zoom.scale}) translate(${zoom.translateX}%, ${zoom.translateY}%) scaleX(${scaleX}) scaleY(${scaleY})`;

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

      <div className="fixed inset-0 overflow-hidden">
        <video
          ref={videoRef}
          key={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.6, transform }}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      </div>

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
              dreal1zation_
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
            <div className="text-center mb-8">
              <span className="text-violet-400 font-mono">{zoom.name}</span>
              <span className="mx-2 opacity-30">|</span>
              <span className="opacity-50">{speed.toFixed(2)}x</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {ZOOM_PRESETS.map((z, i) => (
                <button
                  key={z.name}
                  onClick={() => setCurrentZoom(i)}
                  className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: currentZoom === i ? "#8b5cf6" : "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${currentZoom === i ? "#8b5cf6" : "rgba(255,255,255,0.2)"}`,
                    color: "white",
                  }}
                >
                  {z.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/40 w-12">0.1x</span>
                <input
                  type="range"
                  min="0.1"
                  max="8"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-64 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-violet-500/50"
                />
                <span className="text-xs text-white/40 w-12">8x</span>
              </div>
              <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white font-mono text-sm min-w-[100px] text-center">
                {speed.toFixed(1)}x
              </div>
            </div>

            <p className="text-center text-xs opacity-40 text-white">
              ← → zoom presets • H hide UI
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
