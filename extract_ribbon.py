from PIL import Image
import math

def process_ribbon():
    try:
        # Load the uploaded image containing the ribbon
        img = Image.open("/Users/sanmhmd/.gemini/antigravity-ide/brain/cb2a46e0-1a3b-408a-80dc-8d5d6f1d0bf0/.user_uploaded/media_1789853447492.png").convert("RGBA")
    except Exception:
        try:
            img = Image.open("/Users/sanmhmd/.gemini/antigravity-ide/brain/cb2a46e0-1a3b-408a-80dc-8d5d6f1d0bf0/.user_uploaded/media_1789853595822.png").convert("RGBA")
        except Exception:
            print("Failed to open images.")
            return

    # The ribbon is around the middle of the image.
    # But wait, it's a solid cream background. We can find non-cream pixels and keep them.
    # The ribbon is dark red. Let's filter by redness or darkness.
    
    data = img.getdata()
    new_data = []
    
    for item in data:
        r, g, b, a = item
        
        # Background is cream: high R, G, B. (e.g. > 230)
        # Or if it's text, it's black.
        # The ribbon is red: R > G and R > B. But it has dark shadows (low R, G, B).
        
        # Let's just do a simple hue-shift for red pixels to blue!
        # Swap R and B channels! (Since it's dark red, swapping R and B makes it dark blue!)
        if (r > 200 and g > 200 and b > 200) or (r > 230):
            # Make background transparent
            new_data.append((255, 255, 255, 0))
        else:
            # Swap R and B, keep G
            # Wait, dark text might turn blue too.
            # That's fine, we will crop the ribbon part only.
            new_data.append((b, g, r, a))
            
    img.putdata(new_data)
    
    # We need to crop it. The ribbon is horizontally across the screen.
    # Let's just save the full transparent blue image first.
    img.save("img/ribbon_full.png", "PNG")
    print(f"Saved to img/ribbon_full.png. Size: {img.width}x{img.height}")

process_ribbon()
