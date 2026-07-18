from PIL import Image

src = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon-original.png"
out = r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon.png"

im = Image.open(src).convert("RGBA")
pixels = im.load()
w, h = im.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r < 22 and g < 22 and b < 22:
            pixels[x, y] = (0, 0, 0, 0)

# Remove bottom blue reflection / shade under the mark
cut_y = 298
for y in range(cut_y, h):
    for x in range(w):
        pixels[x, y] = (0, 0, 0, 0)

# Remove soft blue shade + top flare (keep solid blue S)
for y in range(cut_y):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        blue_dom = b > r + 28 and b > g + 18
        if not blue_dom:
            continue
        lum = (r + g + b) / 3
        soft = a < 190 or lum < 110
        top_flare = y < 36
        bottom_haze = y > 290
        if soft or top_flare or bottom_haze:
            pixels[x, y] = (0, 0, 0, 0)

bbox = im.getbbox()
if bbox:
    pad = 2
    l, t, r, b = bbox
    im = im.crop((max(0, l - pad), max(0, t - pad), min(w, r + pad), min(cut_y + pad, b + pad)))

im.save(out, "PNG")
print("saved", out, im.size)

w2, h2 = im.size
px = im.load()
blue_bottom = soft = 0
for y in range(h2):
    for x in range(w2):
        r, g, b, a = px[x, y]
        if a > 0 and b > r + 25 and b > g + 15:
            blue_bottom += 1
            if a < 190:
                soft += 1
print("remaining blue", blue_bottom, "soft", soft)
