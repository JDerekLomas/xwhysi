"use client";

import { useState, useEffect, useRef } from "react";

const VIDEOS = [
  { url: "/videos/video-01.mp4" },
  { url: "/videos/video-02.mp4" },
  { url: "/videos/video-03.mp4" },
  { url: "/videos/video-04.mp4" },
  { url: "/videos/video-05.mp4" },
  { url: "/videos/video-06.mp4" },
  { url: "/videos/video-07.mp4" },
  { url: "/videos/video-08.mp4" },
  { url: "/videos/video-09.mp4" },
  { url: "/videos/video-10.mp4" },
  { url: "/videos/video-11.mp4" },
  { url: "/videos/video-12.mp4" },
  { url: "/videos/video-13.mp4" },
  { url: "/videos/video-14.mp4" },
  { url: "/videos/video-15.mp4" },
  { url: "/videos/video-16.mp4" },
  { url: "/videos/video-17.mp4" },
  { url: "/videos/video-18.mp4" },
  { url: "/videos/video-19.mp4" },
  { url: "/videos/video-20.mp4" },
  { url: "/videos/video-21.mp4" },
  { url: "/videos/video-22.mp4" },
  { url: "/videos/video-23.mp4" },
  { url: "/videos/video-24.mp4" },
  { url: "/videos/video-25.mp4" },
  { url: "/videos/video-26.mp4" },
  { url: "/videos/video-27.mp4" },
  { url: "/videos/video-28.mp4" },
  { url: "/videos/video-29.mp4" },
  { url: "/videos/video-30.mp4" },
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
  const [currentVideo, setCurrentVideo] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
    }, 15000);
    return () => clearInterval(interval);
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

  return (
    <main
      className="min-h-screen bg-black text-white cursor-crosshair vhs-container"
      onClick={startMusic}
    >
      <div className="vhs-intro" />
      <div className="vhs-scanlines" />
      <div className="vhs-noise" />
      <div className="vhs-tracking" />

      <video
        ref={videoRef}
        key={currentVideo}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover vhs-video pointer-events-none"
      >
        <source src={VIDEOS[currentVideo].url} type="video/mp4" />
      </video>

      <div className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="text-center max-w-4xl">
            <h1
              className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-tight vhs-text"
              data-text="dreal1zation_"
            >
              dreal1zation_
            </h1>

            <p className="text-xl md:text-2xl mt-6 text-zinc-400 italic">
              i don&apos;t know what to say
            </p>

            <div className="flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase mt-8 mb-12 text-zinc-600">
              <span>Milo Lomas</span>
              <span className="w-1 h-1 rounded-full bg-violet-500 animate-pulse" />
              <span>Amsterdam</span>
            </div>

            <a
              href="#listen"
              className="inline-flex items-center gap-3 px-10 py-5 bg-red-900/80 hover:bg-red-800 rounded text-xl font-bold tracking-wider transition-all hover:scale-105"
            >
              PLAY MUSIC
            </a>

            <nav className="flex flex-wrap justify-center gap-8 text-lg mt-8">
              <a href="#listen" className="text-zinc-400 hover:text-white transition-colors vhs-glitch">
                Listen
              </a>
              <a href="#about" className="text-zinc-400 hover:text-white transition-colors vhs-glitch">
                About
              </a>
              <a href="#connect" className="text-zinc-400 hover:text-white transition-colors vhs-glitch">
                Connect
              </a>
            </nav>
          </div>
        </section>

        <section id="listen" className="relative px-6 py-32">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <span className="text-xs tracking-[0.5em] uppercase block mb-2 text-zinc-600">
                001
              </span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tight vhs-text">
                Listen
              </h2>
            </div>

            <div className="mb-16">
              <iframe
                width="100%"
                height="400"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/drealization&color=%23991111&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
                className="rounded-lg opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://soundcloud.com/drealization"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded border border-red-900/50 hover:bg-red-900/20 transition-all"
              >
                SoundCloud
              </a>
              <span className="px-8 py-4 rounded border border-zinc-800 text-zinc-600">
                Spotify soon
              </span>
            </div>
          </div>
        </section>

        <section id="about" className="relative px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-right">
              <span className="text-xs tracking-[0.5em] uppercase block mb-2 text-zinc-600">
                002
              </span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tight vhs-text">
                About
              </h2>
            </div>

            <div className="space-y-12">
              <p className="text-2xl md:text-3xl font-extralight leading-relaxed text-zinc-300 max-w-2xl">
                Pittsburgh → San Diego → Amsterdam.
              </p>

              <p className="text-xl md:text-2xl font-extralight leading-relaxed text-zinc-400 max-w-xl ml-auto text-right">
                Creating sonic landscapes between organic and artificial.
              </p>
            </div>

            <div className="mt-24 max-w-lg">
              <h3 className="text-sm tracking-[0.3em] uppercase mb-6 text-zinc-600">
                Beyond Sound
              </h3>
              <p className="text-lg font-extralight leading-relaxed text-zinc-400">
                Exploring aerial perspectives through FPV drones. Capturing the intersection of
                movement and stillness from above.
              </p>
            </div>
          </div>
        </section>

        <section id="connect" className="relative px-6 py-32">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <span className="text-xs tracking-[0.5em] uppercase block mb-2 text-zinc-600">
                003
              </span>
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tight vhs-text">
                Connect
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6">
              <a
                href="https://instagram.com/dreal1zation_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight text-zinc-300 hover:text-red-500 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://soundcloud.com/drealization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl font-extralight text-zinc-300 hover:text-red-500 transition-colors"
              >
                SoundCloud
              </a>
              <a
                href="mailto:hello@xwhysi.com"
                className="text-3xl md:text-4xl font-extralight text-zinc-300 hover:text-red-500 transition-colors"
              >
                Email
              </a>
            </div>

            <p className="mt-16 text-center text-sm text-zinc-600">
              For bookings, collaborations, or just to say what&apos;s up
            </p>
          </div>
        </section>

        <footer className="px-6 py-16 text-center">
          <p className="text-xs tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} dreal1zation_ — ALL SOUNDS BELONG TO THE VOID
          </p>
        </footer>
      </div>
    </main>
  );
}
