#!/bin/bash
# FFmpeg Video Effects Examples for XWHYSI
# Usage: ./ffmpeg-effects.sh [effect-name] [input.mp4] [output.mp4]

EFFECT=$1
INPUT=$2
OUTPUT=$3

if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: ./ffmpeg-effects.sh [effect] [input.mp4] [output.mp4]"
    echo ""
    echo "Available effects:"
    echo "  glitch       - Digital glitch/corruption effect"
    echo "  vhs          - VHS tracking lines and noise"
    echo "  rgb-split    - Chromatic aberration/RGB split"
    echo "  pixelate     - Pixelation/mosaic effect"
    echo "  mirror       - Mirror/reflect effect"
    echo "  warp         - Wave distortion"
    echo "  strobe       - Flashing/strobe effect"
    echo "  negative     - Color inversion"
    echo "  echo         - Visual echo/trail effect"
    echo "  scanlines    - CRT scanline overlay"
    echo "  datamosh     - Datamoshing/glitch compression"
    echo "  psychedelic  - Psychedelic color cycling"
    echo "  static       - Static noise overlay"
    echo "  posterize    - Posterization effect"
    echo "  combine      - Combine multiple effects"
    exit 1
fi

case $EFFECT in
    glitch)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]split=3[a][b][c];
                [a]format=rgba,
                colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3:0[red];
                [b]crop=iw/3:ih:iw/3:0,edgedetect=low=0.1:high=0.4[center];
                [c]noise=alls=20:allf=t,
                hue=s=2[bright];
                [red][center][bright]blend=all_mode=overlay:all_opacity=0.5[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    vhs)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]noise=alls=40:allf=t+u,
                curves=vintage,
                eq=contrast=1.2:brightness=0.05,
                tinterlace=4,
                colorbalance=rs=.3:gs=-.1[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    rgb-split)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]split=3[r][g][b];
                [r]format=rgba,
                colorchannelmixer=1:0:0:0:0:0:0:0:0:0:0:0[red];
                [g]format=rgba,
                colorchannelmixer=0:0:0:0:1:0:0:0:0:0:0:0:green];
                [b]format=rgba,
                colorchannelmixer=0:0:0:0:0:0:0:0:1:0:0:0[blue];
                [red]crop=iw-20:ih:10:0,pad=iw+20:ih:10:0:color=0x00000000[rshift];
                [blue]crop=iw-20:ih:0:0,pad=iw+20:ih:0:0:color=0x00000000[bshift];
                [rshift][g]blend=all_mode=addition:all_opacity=1[rg];
                [rg][bshift]blend=all_mode=addition:all_opacity=1[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    pixelate)
        ffmpeg -i "$INPUT" \
            -vf "scale=iw/20:ih/20,scale=iw:ih:flags=neighbor" \
            -map 0:a? -c:a copy "$OUTPUT"
        ;;

    mirror)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]split[left][right];
                [right]hflip[rightflipped];
                [left][rightflipped]hstack[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    warp)
        ffmpeg -i "$INPUT" \
            -vf "
                crop=iw:ih-40,
                distort=a=0.3:b=0.5:c=0.1:d=0.2
            " \
            -map 0:a? -c:a copy "$OUTPUT"
        ;;

    strobe)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]hue=s=5,
                negate,
                lutyuv=y='if(eq(mod(t,0.1)\,0)\,255\,val)'[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    negative)
        ffmpeg -i "$INPUT" \
            -vf "negate" \
            -map 0:a? -c:a copy "$OUTPUT"
        ;;

    echo)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]split=4[a][b][c][d];
                [b]tpad=start_duration=0.1:start_mode=clone:stop_duration=0:stop_mode=clone,
                setpts=PTS+0.1/TB,
                format=rgba,
                colorchannelmixer=aa=0.5[b_delayed];
                [c]tpad=start_duration=0.2:start_mode=clone:stop_duration=0:stop_mode=clone,
                setpts=PTS+0.2/TB,
                format=rgba,
                colorchannelmixer=aa=0.3[c_delayed];
                [d]tpad=start_duration=0.3:start_mode=clone:stop_duration=0:stop_mode=clone,
                setpts=PTS+0.3/TB,
                format=rgba,
                colorchannelmixer=aa=0.2[d_delayed];
                [a][b_delayed]blend=all_mode=addition:all_opacity=1[ab];
                [ab][c_delayed]blend=all_mode=addition:all_opacity=1[abc];
                [abc][d_delayed]blend=all_mode=addition:all_opacity=1[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    scanlines)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]lutyuv=y='if(eq(mod(y\,2)\,0)\,val*0.7\,val)',
                curves=vintage[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    datamosh)
        ffmpeg -i "$INPUT" \
            -bsf:v noise=dropamount=100 \
            -c:v libx264 -preset ultrafast -qp 0 \
            -map 0:a? -c:a copy "$OUTPUT"
        ;;

    psychedelic)
        ffmpeg -i "$INPUT" \
            -vf "
                hue=s=3:h='mod(t*90,360)',
                eq=contrast=1.5:saturation=2,
                colorbalance=rs=0.5:gs=-0.5:bs=0.5
            " \
            -map 0:a? -c:a copy "$OUTPUT"
        ;;

    static)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                nullsrc=s=640x480,geq=random(1)*255:128:128[static];
                [0:v][static]blend=all_mode=overlay:all_opacity=0.3[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    posterize)
        ffmpeg -i "$INPUT" \
            -vf "
                lutrgb='r=floor(val/32)*32:g=floor(val/32)*32:b=floor(val/32)*32',
                eq=contrast=1.3:saturation=1.2
            " \
            -map 0:a? -c:a copy "$OUTPUT"
        ;;

    combine)
        ffmpeg -i "$INPUT" \
            -filter_complex "
                [0:v]noise=alls=30:allf=t,
                hue=s=2:h='mod(t*45,360)',
                lutyuv=y='if(eq(mod(y\,3)\,0)\,val*0.8\,val)',
                eq=contrast=1.3:saturation=1.5[out]
            " \
            -map "[out]" -map 0:a? -c:a copy "$OUTPUT"
        ;;

    *)
        echo "Unknown effect: $EFFECT"
        exit 1
        ;;
esac

echo "Created $OUTPUT with $EFFECT effect"
