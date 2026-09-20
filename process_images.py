from PIL import Image
import sys

def process_wayang(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    # We want a light blue color: #89cff0 (137, 207, 240)
    # or contrast blue: #253b66 (37, 59, 102) -> wait, the background is dark blue (#0b1b2c and #1b2a49). 
    # A contrasting blue could be a very light blue or gold/blue. Let's use light blue: (160, 200, 255)
    
    for item in data:
        r, g, b, a = item
        # If it's bright (white background), make transparent
        if r > 200 and g > 200 and b > 200:
            new_data.append((255, 255, 255, 0))
        else:
            # Dark pixels (the wayang drawing) become light blue
            # We can map the darkness to opacity for anti-aliasing
            intensity = (r + g + b) // 3
            opacity = 255 - intensity
            new_data.append((160, 200, 255, opacity))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

wayang_in = "/Users/sanmhmd/.gemini/antigravity-ide/brain/cb2a46e0-1a3b-408a-80dc-8d5d6f1d0bf0/.user_uploaded/media_1789852067016.png"
process_wayang(wayang_in, "img/wayang-blue.png")
process_wayang(wayang_in, "Web Wedding/img/wayang-blue.png")
print("Wayang processed.")
