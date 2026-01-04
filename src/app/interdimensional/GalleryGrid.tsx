"use client";

import { Artwork } from "./artworks";
import { GalleryCard } from "./GalleryCard";

interface GalleryGridProps {
  artworks: Artwork[];
  isLoading: boolean;
}

export function GalleryGrid({ artworks, isLoading }: GalleryGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <GalleryCard artwork={artwork} isLoading={isLoading} />
          </div>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-600 text-lg">
            No artworks to display.
          </p>
        </div>
      )}
    </div>
  );
}
