from PIL import Image
from pathlib import Path

src = Path(r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND\public\logo-icon-original.png")
img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size

threshold = 28
visited = [[False] * h for _ in range(w)]
stack = []


def is_bg(x, y):
    r, g, b, a = pixels[x, y]
    return r <= threshold and g <= threshold and b <= threshold


for x in range(w):
    for y in (0, h - 1):
        if is_bg(x, y):
            stack.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if is_bg(x, y):
            stack.append((x, y))

while stack:
    x, y = stack.pop()
    if x < 0 or y < 0 or x >= w or y >= h or visited[x][y]:
        continue
    if not is_bg(x, y):
        continue
    visited[x][y] = True
    r, g, b, _ = pixels[x, y]
    pixels[x, y] = (r, g, b, 0)
    stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

# Clear dark fringe next to transparency
for x in range(w):
    for y in range(h):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        if r <= 18 and g <= 18 and b <= 22 and (b - r) < 8:
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and pixels[nx, ny][3] == 0:
                    pixels[x, y] = (r, g, b, 0)
                    break

root = Path(r"c:\Users\DELL\Downloads\ENCOGSYS-FRONTEND")
master = root / "public" / "logo-icon-transparent.png"
img.save(master, "PNG")

targets = [
    root / "public" / "logo-icon.png",
    root / "public" / "apple-icon.png",
    root / "public" / "favicon.ico",
    root / "public" / "icon-dark-32x32.png",
    root / "public" / "icon-light-32x32.png",
    root / "app" / "icon.png",
    root / "app" / "apple-icon.png",
]

for path in targets:
    if path.suffix.lower() == ".ico":
        icon = img.copy()
        icon.thumbnail((256, 256), Image.Resampling.LANCZOS)
        icon.save(
            path,
            format="ICO",
            sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
        )
    elif "32x32" in path.name:
        small = img.copy()
        small.thumbnail((32, 32), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
        ox = (32 - small.width) // 2
        oy = (32 - small.height) // 2
        canvas.paste(small, (ox, oy), small)
        canvas.save(path, "PNG")
    else:
        img.save(path, "PNG")

transparent = sum(1 for x in range(w) for y in range(h) if pixels[x, y][3] == 0)
print(f"done {w}x{h} transparent={transparent}")
