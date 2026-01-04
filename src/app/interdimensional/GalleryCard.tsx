"use client";

import { useState } from "react";
import { Artwork } from "./artworks";
import { useVideoGeneration } from "./useVideoGeneration";

interface GalleryCardProps {
  artwork: Artwork;
  isLoading: boolean;
}

export function GalleryCard({ artwork, isLoading }: GalleryCardProps) {
  const [showModal, setShowModal] = useState(false);
  const video = useVideoGeneration(artwork.prompt, !isLoading);

  const statusLabel = {
    idle: "◯ PENDING",
    pending: "⟳ QUEUED",
    processing: "⟳ GENERATING",
    completed: "✓ READY",
    error: "✕ ERROR",
  }[video.status];

  const statusColor = {
    idle: "bg-zinc-700/20 text-zinc-400",
    pending: "bg-zinc-700/20 text-zinc-400",
    processing: "bg-blue-500/20 text-blue-400 animate-pulse",
    completed: "bg-green-500/20 text-green-400",
    error: "bg-red-500/20 text-red-400",
  }[video.status];

  return (
    <>
      {/* Gallery Card */}
      <div
        className="group relative rounded-xl overflow-hidden bg-black border border-zinc-800 hover:border-violet-500 transition-all hover:shadow-xl hover:shadow-violet-500/20 cursor-pointer h-full flex flex-col"
        onClick={() => video.status === "completed" && setShowModal(true)}
      >
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${statusColor}`}
          >
            {statusLabel}
          </div>
        </div>

        {/* Video/Loading Area */}
        <div className="aspect-video bg-black relative overflow-hidden flex-shrink-0">
          {video.url ? (
            <video
              src={video.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
              {video.status === "processing" && (
                <div className="text-center">
                  <div className="inline-block">
                    <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="mt-4 text-zinc-500 text-sm">
                    Generating artwork...
                  </p>
                </div>
              )}
              {(video.status === "idle" || video.status === "pending") && (
                <div className="text-center">
                  <p className="text-zinc-600 text-sm">Initializing...</p>
                </div>
              )}
              {video.status === "error" && (
                <div className="text-center px-4">
                  <p className="text-red-400 text-sm font-bold mb-3">
                    Generation Failed
                  </p>
                  <p className="text-red-400/70 text-xs mb-4">{video.error}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      video.retry();
                    }}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded text-xs font-bold transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Title and Index */}
          <div className="mb-3">
            <div className="text-xs text-violet-400 font-mono tracking-widest mb-1">
              {String(artwork.index).padStart(2, "0")}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
              {artwork.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-400 mb-4 flex-grow">
            {artwork.description}
          </p>

          {/* Themes */}
          <div className="flex flex-wrap gap-2 mb-4">
            {artwork.themes.slice(0, 2).map((theme) => (
              <span
                key={theme}
                className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded-full"
              >
                {theme.replace("-", " ")}
              </span>
            ))}
            {artwork.themes.length > 2 && (
              <span className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded-full">
                +{artwork.themes.length - 2}
              </span>
            )}
          </div>

          {/* View Button */}
          {video.status === "completed" && (
            <button
              className="text-violet-400 hover:text-violet-300 text-sm transition-colors font-medium"
              onClick={() => setShowModal(true)}
            >
              View Full Experience →
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && video.url && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 hover:bg-black transition-colors flex items-center justify-center text-white"
            >
              ✕
            </button>

            {/* Video */}
            <video
              src={video.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover"
            />

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {artwork.title}
                </h2>
                <p className="text-sm md:text-base text-zinc-300 mb-4">
                  {artwork.artistIntent}
                </p>
                <div className="flex flex-wrap gap-2">
                  {artwork.themes.map((theme) => (
                    <span
                      key={theme}
                      className="text-xs px-3 py-1 bg-violet-600/50 text-violet-100 rounded-full"
                    >
                      {theme.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
