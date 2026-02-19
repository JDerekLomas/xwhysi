# FFmpeg Video Effects for XWHYSI

## Quick Examples

### 1. Glitch Effect
```bash
ffmpeg -i input.mp4 -vf "noise=alls=40:allf=t+u,edgedetect=low=0.1:high=0.4" output.mp4
```

### 2. VHS / Retro Look
```bash
ffmpeg -i input.mp4 -vf "noise=alls=50:allf=t,curves=vintage,eq=contrast=1.2" output.mp4
```

### 3. RGB Split / Chromatic Aberration
```bash
ffmpeg -i input.mp4 \
  -filter_complex "[0:v]split=3[r][g][b]; \
  [r]colorchannelmixer=1:0:0:0:0:0:0:0:0:0:0:0[red]; \
  [g]colorchannelmixer=0:0:0:0:1:0:0:0:0:0:0:0[green]; \
  [b]colorchannelmixer=0:0:0:0:0:0:0:0:1:0:0:0[blue]; \
  [red]pad=iw+20:ih:10:0:color=0x00000000[rshift]; \
  [blue]pad=iw+20:ih:0:0:color=0x00000000[bshift]; \
  [rshift][green]blend=all_mode=addition[rg]; \
  [rg][bshift]blend=all_mode=addition" output.mp4
```

### 4. Psychedelic Color Cycling
```bash
ffmpeg -i input.mp4 -vf "hue=s=3:h='mod(t*90,360)',eq=contrast=1.5:saturation=2" output.mp4
```

### 5. Scanlines (CRT Effect)
```bash
ffmpeg -i input.mp4 -vf "lutyuv=y='if(eq(mod(y,2),0),val*0.7,val)'" output.mp4
```

### 6. Pixelate / Mosaic
```bash
ffmpeg -i input.mp4 -vf "scale=iw/20:ih/20,scale=iw:ih:flags=neighbor" output.mp4
```

### 7. Mirror / Kaleidoscope
```bash
# Horizontal mirror
ffmpeg -i input.mp4 -filter_complex "[0:v]split[left][right];[right]hflip[rightflipped];[left][rightflipped]hstack" output.mp4

# 4-way kaleidoscope
ffmpeg -i input.mp4 \
  -filter_complex "[0:v]split=4[a][b][c][d]; \
  [b]hflip[bflip];[c]vflip[cflip];[d]hflip,vflip[dflip]; \
  [a][bflip]hstack[top];[c][dflip]hstack[bottom]; \
  [top][bottom]vstack" output.mp4
```

### 8. Strobe / Flash Effect
```bash
ffmpeg -i input.mp4 -vf "hue=s=5,negate,lutyuv=y='if(eq(mod(t,0.1),0),255,val)'" output.mp4
```

### 9. Wave Distortion
```bash
ffmpeg -i input.mp4 -vf "distort=a=0.3:b=0.5:c=0.1:d=0.2" output.mp4
```

### 10. Posterize
```bash
ffmpeg -i input.mp4 -vf "lutrgb='r=floor(val/32)*32:g=floor(val/32)*32:b=floor(val/32)*32'" output.mp4
```

### 11. Negative / Invert
```bash
ffmpeg -i input.mp4 -vf "negate" output.mp4
```

### 12. Visual Echo / Trail
```bash
ffmpeg -i input.mp4 \
  -filter_complex "[0:v]split=3[a][b][c]; \
  [b]setpts=PTS+0.1/TB,format=rgba,colorchannelmixer=aa=0.5[b_delayed]; \
  [c]setpts=PTS+0.2/TB,format=rgba,colorchannelmixer=aa=0.3[c_delayed]; \
  [a][b_delayed]blend=all_mode=addition[ab]; \
  [ab][c_delayed]blend=all_mode=addition" output.mp4
```

### 13. Static Noise Overlay
```bash
ffmpeg -i input.mp4 \
  -filter_complex "nullsrc=s=640x480,geq=random(1)*255:128:128[static]; \
  [0:v][static]blend=all_mode=overlay:all_opacity=0.3" output.mp4
```

### 14. Combine Multiple Effects (Glitch + Color + Scanlines)
```bash
ffmpeg -i input.mp4 \
  -vf "noise=alls=30:allf=t,hue=s=2:h='mod(t*45,360)',lutyuv=y='if(eq(mod(y,3),0),val*0.8,val)',eq=contrast=1.3:saturation=1.5" \
  output.mp4
```

### 15. Datamosh-Style Glitch (requires re-encoding)
```bash
ffmpeg -i input.mp4 -bsf:v noise=dropamount=100 -c:v libx264 -preset ultrafast output.mp4
```

## Batch Processing All Videos

Process all videos in public/videos:
```bash
for f in public/videos/*.mp4; do
  filename=$(basename "$f")
  ffmpeg -i "$f" -vf "hue=s=2:h='mod(t*45,360)',noise=alls=20:allf=t" "public/videos/glitch-$filename"
done
```

## Create Video Loops

Make a 10-second loop from any video:
```bash
ffmpeg -stream_loop 3 -i input.mp4 -t 10 -c copy output.mp4
```

## Slow Motion / Time Effects

```bash
# Slow to 50%
ffmpeg -i input.mp4 -vf "setpts=2*PTS" -af "atempo=0.5" output.mp4

# Speed up 200%
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -af "atempo=2.0" output.mp4
```

## Reverse Video

```bash
ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4
```

## Crossfade Between Videos

```bash
ffmpeg -i video1.mp4 -i video2.mp4 \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=1:offset=5" \
  output.mp4
```

## Zoom Effects

### Super Zoom In (Center)
```bash
ffmpeg -i input.mp4 -vf "zoompan=z='min(zoom+0.0015,2.5)':d=0:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'" output.mp4
```

### Gradual Zoom In Over Time
```bash
ffmpeg -i input.mp4 -vf "zoompan=z='if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080" output.mp4
```

### Extreme Zoom (10x)
```bash
ffmpeg -i input.mp4 -vf "scale=19200:-1,crop=1920:1080:8640:5400" output.mp4
```

### Pulsing Zoom
```bash
ffmpeg -i input.mp4 -vf "zoompan=z='1+0.3*sin(t*2)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'" output.mp4
```

### Zoom to Specific Region
```bash
ffmpeg -i input.mp4 -vf "zoompan=z='2':x='iw*0.3':y='ih*0.2':d=1:s=1920x1080" output.mp4
```

## Crop Effects

### Crop Center Square
```bash
ffmpeg -i input.mp4 -vf "crop=min(iw\,ih):min(iw\,ih)" output.mp4
```

### Crop to Specific Area (x,y,width,height)
```bash
ffmpeg -i input.mp4 -vf "crop=640:480:100:50" output.mp4
```

### Animated Pan Crop
```bash
ffmpeg -i input.mp4 -vf "crop=640:480:'min(0\,iw-640-t*50)':0" output.mp4
```

### Crop and Zoom Combo
```bash
ffmpeg -i input.mp4 -vf "crop=iw*0.5:ih*0.5:iw*0.25:ih*0.25,scale=1920:1080" output.mp4
```

### Slow Reveal (crop widens over time)
```bash
ffmpeg -i input.mp4 -vf "crop='min(iw,t*200)':'min(ih,t*200)':(iw-min(iw,t*200))/2:(ih-min(ih,t*200))/2" output.mp4
```

### Focus on Moving Point
```bash
ffmpeg -i input.mp4 -vf "crop=400:400:'iw/2-200+sin(t)*200':'ih/2-200+cos(t)*100'" output.mp4
```

## Stretch / Distort Effects

### Horizontal Stretch (Wide)
```bash
ffmpeg -i input.mp4 -vf "scale=iw*2:ih,setdar=2:1" output.mp4
```

### Vertical Stretch (Tall)
```bash
ffmpeg -i input.mp4 -vf "scale=iw:ih*2,setdar=1:2" output.mp4
```

### Extreme Squish
```bash
ffmpeg -i input.mp4 -vf "scale=iw*3:ih/2" output.mp4
```

### Wavy Stretch
```bash
ffmpeg -i input.mp4 -vf "lenscornerRadius=1:lenscorrectioncx=0:lenscorrectioncy=0,k=fish0.5" output.mp4
```

### Perspective Warp
```bash
ffmpeg -i input.mp4 -vf "perspective=x0=0:y0=0:x1=iw:y1=0:x2=0:y2=ih:x3=iw:y3=ih:interpolation=linear" output.mp4
```

### Squeeze from Edges
```bash
ffmpeg -i input.mp4 -vf "crop='iw-t*10':'ih-t*10':'t*5':'t*5'" output.mp4
```

### Barrel Distortion
```bash
ffmpeg -i input.mp4 -vf "lenscorrection=k1=-0.3:k2=0.05" output.mp4
```

## Combined Zoom + Crop + Stretch

### Zoom Pan Crop Combo
```bash
ffmpeg -i input.mp4 -vf "zoompan=z='1.5':x='iw/2-(iw/zoom/2)+sin(t)*100':y='ih/2-(ih/zoom/2)+cos(t)*50':d=1:s=1280x720" output.mp4
```

### Crop then Extreme Zoom
```bash
ffmpeg -i input.mp4 -vf "crop=iw*0.3:ih*0.3:iw*0.35:ih*0.35,scale=1920:1080:flags=neighbor" output.mp4
```

### Stretch + Glitch
```bash
ffmpeg -i input.mp4 -vf "scale=iw*2:ih*0.5,noise=alls=30:allf=t,scale=1920:1080" output.mp4
```

## Available XFade Transitions
- fade, wipeleft, wiperight, wipeup, wipedown
- slideleft, slideright, slideup, slidedown
- circlecrop, rectcrop, distance
- pixelate, diag1, diag2, hblur, vblur
- dissolve, radial, smoothleft, smoothright, smoothup, smoothdown
