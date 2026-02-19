"use client";

import { useState } from "react";

export default function Xwhysi4() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState("");
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("14b");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || generating) return;

    setGenerating(true);
    setStatus("Starting generation...");

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: selectedModel }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.status) setStatus(data.status);
            if (data.video) {
              setVideos((prev) => [data.video, ...prev]);
              setStatus("Done!");
            }
            if (data.error) setStatus(`Error: ${data.error}`);
          } catch {}
        }
      }
    } catch (err) {
      setStatus(`Error: ${err}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter mb-2">Video Gen</h1>
        <p className="text-zinc-500 mb-8">RTX 5090 • Wan2.1</p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setSelectedModel("14b")}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedModel === "14b" ? "bg-violet-600" : "bg-zinc-800"
              }`}
            >
              14B (Best)
            </button>
            <button
              type="button"
              onClick={() => setSelectedModel("1.3b")}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedModel === "1.3b" ? "bg-violet-600" : "bg-zinc-800"
              }`}
            >
              1.3B (Fast)
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video... e.g. 'Abstract organic shapes morphing and flowing in deep space, psychedelic colors'"
            className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-violet-600"
            disabled={generating}
          />

          <button
            type="submit"
            disabled={generating || !prompt.trim()}
            className="mt-4 px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? "Generating..." : "Generate Video"}
          </button>
        </form>

        {status && (
          <div className="mb-8 p-4 bg-zinc-900 rounded-xl font-mono text-sm text-zinc-400">
            {status}
          </div>
        )}

        <div className="grid gap-8">
          {videos.map((video, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-zinc-900">
              <video
                src={video}
                controls
                autoPlay
                loop
                muted
                className="w-full"
              />
            </div>
          ))}
        </div>

        {videos.length === 0 && !generating && (
          <div className="text-center text-zinc-600 py-20">
            Generated videos will appear here
          </div>
        )}
      </div>
    </main>
  );
}
