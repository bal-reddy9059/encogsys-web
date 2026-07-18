from PIL import Image
import os

src = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon-original.png"
out = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon.png"

im = Image.open(src).convert("RGBA")
pixels = im.load()
w, h = im.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Remove solid black canvas only; keep logo colors
        if r < 22 and g < 22 and b < 22:
            pixels[x, y] = (0, 0, 0, 0)

bbox = im.getbbox()
if bbox:
    pad = 2
    l, t, r, b = bbox
    im = im.crop((max(0, l - pad), max(0, t - pad), min(w, r + pad), min(h, b + pad)))

im.save(out, "PNG")
print("restored previous logo with clear bg", im.size)
