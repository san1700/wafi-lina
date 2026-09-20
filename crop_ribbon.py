from PIL import Image

def process():
    img = Image.open("img/ribbon_full.png")
    # Ribbon is vertically in the middle, let's crop y from 250 to 700
    # and then use getbbox to trim
    cropped = img.crop((0, 250, img.width, 700))
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
        cropped.save("img/ribbon.png")
        print(f"Saved img/ribbon.png: {cropped.width}x{cropped.height}")
    else:
        print("Empty bounding box")

process()
