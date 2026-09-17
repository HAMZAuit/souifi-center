from PIL import Image, ImageDraw, ImageFont
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(root)

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#05080F")
draw = ImageDraw.Draw(img)

for y in range(H):
    t = y / H
    r = int(5 + t * 8)
    g = int(8 + t * 12)
    b = int(15 + t * 18)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

draw.rectangle([0, 0, W, 6], fill="#3FE0C5")
draw.rectangle([0, H - 6, W, H], fill="#F0B03F")

logo_path = "assets/logo-dark-theme.png"
if not os.path.exists(logo_path):
    logo_path = "assets/logo.png"
logo = Image.open(logo_path).convert("RGBA")
max_h = 220
ratio = max_h / logo.height
logo = logo.resize((int(logo.width * ratio), max_h), Image.Resampling.LANCZOS)
lx = (W - logo.width) // 2
ly = 90
img.paste(logo, (lx, ly), logo)


def font(size):
    for name in (
        "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/times.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ):
        if os.path.exists(name):
            return ImageFont.truetype(name, size)
    return ImageFont.load_default()


def center_text(text, y, f, fill):
    bbox = draw.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) / 2, y), text, font=f, fill=fill)


center_text("CENTRE SOUIFI", 340, font(54), "#EAF0F8")
center_text("Soutien scolaire & langues · Souk El Arbaa", 420, font(28), "#3FE0C5")
center_text("Cours du soir dès 18h · Tous les jours", 480, font(22), "#93A1B5")

out = "assets/og-share.png"
img.save(out, "PNG", optimize=True)
print("saved", out, img.size, os.path.getsize(out))
