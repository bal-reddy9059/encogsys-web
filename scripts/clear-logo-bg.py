from PIL import Image
import os

backup = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon-original.png"
src = backup if os.path.exists(backup) else r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon.png"
out = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon.png"

im = Image.open(src).convert("RGBA")
pixels = im.load()
w, h = im.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Remove black canvas + dark glow fringe
        if r < 40 and g < 40 and b < 40:
            pixels[x, y] = (0, 0, 0, 0)
        # Soften dark blue/black reflection under logo
        elif r < 55 and g < 55 and b < 90 and (r + g + b) < 140:
            pixels[x, y] = (0, 0, 0, 0)

bbox = im.getbbox()
if bbox:
    pad = 2
    l, t, r, b = bbox
    im = im.crop((max(0, l - pad), max(0, t - pad), min(w, r + pad), min(h, b + pad)))

# Also write a solid black hex silhouette for nav (clear shape, no blue glow fill)
sil = im.copy()
sp = sil.load()
sw, sh = sil.size
for y in range(sh):
    for x in range(sw):
        r, g, b, a = sp[x, y]
        if a > 20:
            sp[x, y] = (0, 0, 0, 255)
        else:
            sp[x, y] = (0, 0, 0, 0)

sil_out = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon-black.png"
sil.save(sil_out, "PNG")
im.save(out, "PNG")
print("color", out, im.size)
print("black", sil_out, sil.size)
