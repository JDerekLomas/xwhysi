import torch
print("PyTorch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())

import os
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

from diffusers import WanPipeline
import numpy as np
import imageio
import gc

print("Loading model...")
pipe = WanPipeline.from_pretrained(
    "Wan-AI/Wan2.1-T2V-1.3B-Diffusers",
    torch_dtype=torch.float16,
)

print("Moving to GPU with sequential offload...")
pipe.to("cuda")
for name, param in pipe.text_encoder.named_parameters():
    param.data = param.data.cpu()
pipe.text_encoder.to("cpu")

prompt = "Abstract organic shapes flowing like liquid metal"
print(f"Generating: {prompt}")

gc.collect()
torch.cuda.empty_cache()

result = pipe(
    prompt=prompt,
    negative_prompt="",
    height=480,
    width=832,
    num_frames=49,
    guidance_scale=1.0,
    num_inference_steps=20,
)

print("Processing frames...")
frames = []
for frame in result[0]:
    if isinstance(frame, torch.Tensor):
        frame = frame.cpu().numpy()
    if frame.dtype != np.uint8:
        frame = (frame * 255).clip(0, 255).astype(np.uint8)
    if len(frame.shape) == 3 and frame.shape[0] in [1, 3, 4]:
        frame = frame.transpose(1, 2, 0)
    frames.append(frame)

print("Saving video...")
imageio.mimwrite("public/generated/test-ai.mp4", frames, fps=15, quality=8)
print("Done! Saved to public/generated/test-ai.mp4")
