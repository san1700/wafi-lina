from rembg import remove
from PIL import Image

def extract(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path)
        output = remove(img)
        output.save(output_path)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Failed: {e}")

feather_in = "/Users/sanmhmd/.gemini/antigravity-ide/brain/cb2a46e0-1a3b-408a-80dc-8d5d6f1d0bf0/.user_uploaded/media_1789854335494.png"
hand_in = "/Users/sanmhmd/.gemini/antigravity-ide/brain/cb2a46e0-1a3b-408a-80dc-8d5d6f1d0bf0/.user_uploaded/media_1789854574320.jpg"

extract(feather_in, "img/feather_full.png")
extract(hand_in, "img/hand_full.png")
