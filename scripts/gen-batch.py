import torch
from diffusers import WanPipeline
import numpy as np
from PIL import Image
import imageio
import gc
import os

prompts = [
    "Abstract organic shapes flowing like liquid metal, iridescent rainbow colors",
    "Bioluminescent neural networks pulsing in deep ocean darkness",
    "Crystal structures growing and fracturing in slow motion",
    "Smoke and ink swirling in water, morphing patterns",
    "Geometric shapes dissolving into organic forms, psychedelic",
    "Light beams refracting through prisms, rainbow spectrum",
    "Cellular mitosis, organic division, microscopic beauty",
    "Aurora borealis flowing over mountain silhouettes",
    "Molten gold and silver mixing in zero gravity",
    "Fractal patterns zooming infinitely, mandala geometry",
]

os.makedirs("public/generated", exist_ok=True)

print("Loading 1.3B model...")
pipe = WanPipeline.from_pretrained(
    "Wan-AI/Wan2.1-T2V-1.3B-Diffusers",
    torch_dtype=torch.float16,
)
pipe.enable_model_cpu_offload()

def save_video(frames, output_path, fps=15):
    video_frames = []
    for frame in frames:
        if isinstance(frame, torch.Tensor):
            frame = frame.cpu().numpy()
        if frame.dtype != np.uint8:
            frame = (frame * 255).clip(0, 255).astype(np.uint8)
        if len(frame.shape) == 3:
            if frame.shape[0] in [1, 3, 4]:
                frame = frame.transpose(1, 2, 0)
        video_frames.append(frame)
    imageio.mimwrite(output_path, video_frames, fps=fps, quality=8)
    print(f"Saved: {output_path}")

for i, prompt in enumerate(prompts):
    print(f"\n[{i+1}/{len(prompts)}] Generating: {prompt}")
    
    try:
        gc.collect()
        torch.cuda.empty_cache()
        
        result = pipe(
            prompt=prompt,
            negative_prompt="",
            height=480,
            width=832,
            num_frames=49,
            guidance_scale=1.0,
            num_inference_steps=25,
        )
        
        output_path = f"public/generated/ai-{i+1:02d}.mp4"
        save_video(result[0], output_path, fps=15)
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        continue

print("\nDone!")
