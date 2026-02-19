import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  const { prompt, model } = await req.json();

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const scriptPath = path.join(process.cwd(), "scripts", "generate-video.py");
  const outputPath = path.join(process.cwd(), "public", "generated", `video-${Date.now()}.mp4`);

  const args = [
    scriptPath,
    "--prompt", prompt,
    "--model", model,
    "--output", outputPath,
  ];

  const proc = spawn("python", args);

  (async () => {
    try {
      for await (const chunk of proc.stdout) {
        const text = chunk.toString();
        await writer.write(encoder.encode(JSON.stringify({ status: text.trim() }) + "\n"));
      }

      for await (const chunk of proc.stderr) {
        const text = chunk.toString();
        await writer.write(encoder.encode(JSON.stringify({ status: text.trim() }) + "\n"));
      }

      const code = await new Promise<number>((resolve) => proc.on("close", resolve));

      if (code === 0) {
        const publicPath = outputPath.split("public")[1].replace(/\\/g, "/");
        await writer.write(encoder.encode(JSON.stringify({ video: publicPath }) + "\n"));
      } else {
        await writer.write(encoder.encode(JSON.stringify({ error: "Process failed" }) + "\n"));
      }
    } catch (err) {
      await writer.write(encoder.encode(JSON.stringify({ error: String(err) }) + "\n"));
    } finally {
      await writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
