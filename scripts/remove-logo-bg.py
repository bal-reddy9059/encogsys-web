from PIL import Image
import os

def remove_dark_bg(src, dst, threshold=52):
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Keep bright blue glow accents
            if b > r + 25 and b > g + 15 and b > 55:
                continue
            # Near-black / dark navy background -> transparent
            if r < threshold and g < threshold and b < threshold + 18 and max(r, g, b) < 70:
                pixels[x, y] = (r, g, b, 0)
            elif r < 25 and g < 35 and b < 55 and (r + g) < 45:
                pixels[x, y] = (r, g, b, 0)
    img.save(dst, "PNG")
    print(f"Saved {dst} ({w}x{h})")

base = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public"
remove_dark_bg(os.path.join(base, "logo-full.png"), os.path.join(base, "logo-full.png"))
remove_dark_bg(os.path.join(base, "logo-icon.png"), os.path.join(base, "logo-icon.png"))
print("done")
