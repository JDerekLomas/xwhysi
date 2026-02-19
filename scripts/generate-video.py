import argparse
import os
import sys

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--model", default="14b", choices=["14b", "1.3b"])
    parser.add_argument("--output", required=True)
    parser.add_argument("--num-frames", type=int, default=81)
    parser.add_argument("--width", type=int, default=832)
    parser.add_argument("--height", type=int, default=480)
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    print("Loading dependencies...")
    import torch
    from diffusers import AutoencoderKLWan, WanPipeline
    from diffusers.utils import export_to_video

    model_id = "Wan-AI/Wan2.1-T2V-14B-Diffusers" if args.model == "14b" else "Wan-AI/Wan2.1-T2V-1.3B-Diffusers"

    print(f"Loading model: {model_id}")
    
    pipe = WanPipeline.from_pretrained(
        model_id,
        torch_dtype=torch.bfloat16,
    )
    
    pipe.to("cuda")

    print(f"Generating video: {args.prompt}")
    print(f"Resolution: {args.width}x{args.height}, Frames: {args.num_frames}")

    result = pipe(
        prompt=args.prompt,
        negative_prompt="",
        height=args.height,
        width=args.width,
        num_frames=args.num_frames,
        guidance_scale=5.0 if args.model == "14b" else 1.0,
    )

    print("Saving video...")
    export_to_video(result.frames[0], args.output, fps=15)
    print(f"Saved to: {args.output}")

if __name__ == "__main__":
    main()
