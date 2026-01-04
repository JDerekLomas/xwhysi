"use client";

import { useState, useEffect } from "react";

interface GeneratedGif {
  id: string;
  prompt: string;
  url?: string;
  status: "pending" | "processing" | "completed" | "error";
  error?: string;
}

const INITIAL_PROMPTS = [
  "paracas elongated cranium",
  "sub terrainian aztec",
  "fractal blueprint",
  "army dancers",
];

const API_KEY = "sk-mr-9b9248ed2a6f82314530131862795d69b93f15ba1df54a18fcafeaabe6a69726";
const API_BASE = "https://api.mulerouter.ai";

export default function GifsPage() {
  const [gifs, setGifs] = useState<GeneratedGif[]>([]);
  const [newPrompt, setNewPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with default prompts
  useEffect(() => {
    const initialGifs = INITIAL_PROMPTS.map((prompt) => ({
      id: crypto.randomUUID(),
      prompt,
      status: "pending" as const,
    }));
    setGifs(initialGifs);

    // Generate videos for initial prompts
    initialGifs.forEach((gif) => generateVideo(gif.id, gif.prompt));
  }, []);

  const generateVideo = async (id: string, prompt: string) => {
    try {
      // Update status to processing
      setGifs((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: "processing" } : g))
      );

      // Call MuleRouter API to generate video
      const response = await fetch(
        `${API_BASE}/vendors/alibaba/v1/wan2/video/generation`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            model: "wan2.6-t2v",
            duration: 5,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const taskId = data.task_info?.id || data.task_id || data.id;

      // Poll for completion
      await pollVideoStatus(id, taskId);
    } catch (error) {
      setGifs((prev) =>
        prev.map((g) =>
          g.id === id
            ? {
                ...g,
                status: "error",
                error: error instanceof Error ? error.message : "Unknown error",
              }
            : g
        )
      );
    }
  };

  const pollVideoStatus = async (id: string, taskId: string) => {
    const maxAttempts = 120; // 2 minutes with 1 second intervals
    let attempts = 0;

    const poll = async (): Promise<void> => {
      attempts++;

      try {
        const response = await fetch(
          `${API_BASE}/vendors/alibaba/v1/wan2/video/generation/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Status check failed: ${response.statusText}`);
        }

        const data = await response.json();
        const status = data.task_info?.status;

        if (status === "completed") {
          const videoUrl = data.videos?.[0];
          setGifs((prev) =>
            prev.map((g) =>
              g.id === id
                ? {
                    ...g,
                    status: "completed",
                    url: videoUrl,
                  }
                : g
            )
          );
        } else if (status === "failed") {
          throw new Error("Video generation failed");
        } else if (attempts < maxAttempts) {
          setTimeout(poll, 1000);
        } else {
          throw new Error("Timeout waiting for video generation");
        }
      } catch (error) {
        setGifs((prev) =>
          prev.map((g) =>
            g.id === id
              ? {
                  ...g,
                  status: "error",
                  error: error instanceof Error ? error.message : "Unknown error",
                }
              : g
          )
        );
      }
    };

    await poll();
  };

  const handleAddPrompt = async () => {
    if (!newPrompt.trim()) return;

    const id = crypto.randomUUID();
    const newGif: GeneratedGif = {
      id,
      prompt: newPrompt,
      status: "pending",
    };

    setGifs((prev) => [newGif, ...prev]);
    setNewPrompt("");
    setIsLoading(true);

    await generateVideo(id, newPrompt);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            HERO GIF GENERATOR
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest">
            Powered by MuleRouter • Text-to-Video Generation
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Input Section */}
        <div className="mb-16">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-zinc-200">
              Generate New Hero GIF
            </h2>
            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddPrompt();
                }}
                placeholder="Enter your prompt... (e.g., 'cosmic dancer with neon wings')"
                className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={handleAddPrompt}
                disabled={isLoading || !newPrompt.trim()}
                className="px-8 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg font-bold transition-colors whitespace-nowrap"
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {gifs.map((gif) => (
            <div
              key={gif.id}
              className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-violet-500 transition-all hover:shadow-xl hover:shadow-violet-500/20"
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4 z-20">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                    gif.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : gif.status === "processing"
                      ? "bg-blue-500/20 text-blue-400 animate-pulse"
                      : gif.status === "error"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-zinc-700/20 text-zinc-400"
                  }`}
                >
                  {gif.status === "completed"
                    ? "✓ READY"
                    : gif.status === "processing"
                    ? "⟳ GENERATING"
                    : gif.status === "error"
                    ? "✕ ERROR"
                    : "◯ PENDING"}
                </div>
              </div>

              {/* Video/Placeholder */}
              <div className="aspect-video bg-black relative overflow-hidden">
                {gif.url ? (
                  <video
                    src={gif.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {gif.status === "processing" && (
                      <div className="text-center">
                        <div className="inline-block">
                          <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="mt-4 text-zinc-500 text-sm">
                          Generating video...
                        </p>
                      </div>
                    )}
                    {gif.status === "pending" && (
                      <div className="text-center">
                        <p className="text-zinc-600 text-sm">Queued...</p>
                      </div>
                    )}
                    {gif.status === "error" && (
                      <div className="text-center px-4">
                        <p className="text-red-400 text-sm font-bold mb-2">
                          Generation Failed
                        </p>
                        <p className="text-red-400/70 text-xs">{gif.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Prompt */}
              <div className="p-6">
                <p className="text-zinc-300 font-medium capitalize">
                  {gif.prompt}
                </p>
                {gif.url && (
                  <a
                    href={gif.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm transition-colors"
                  >
                    View Full Video →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {gifs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-600 text-lg">
              No GIFs yet. Add a prompt to get started!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
