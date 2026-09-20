from PIL import Image, ImageDraw
import math

# Create a 400x400 transparent image
size = 400
img = Image.new("RGBA", (size, size), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

color = (137, 207, 240, 180) # Light blue with opacity

# Draw overlapping circles to create a lace/doily effect
for i in range(10):
    radius = 350 - (i * 30)
    width = 2 if i % 2 == 0 else 1
    # Main concentric arcs from top-left (0,0)
    draw.arc((-radius, -radius, radius, radius), 0, 90, fill=color, width=width)
    
    # Draw smaller circles along the arc
    if i % 2 == 0 and radius > 50:
        num_circles = int(radius / 20)
        for j in range(num_circles + 1):
            angle = math.radians(90 * j / num_circles)
            cx = radius * math.cos(angle)
            cy = radius * math.sin(angle)
            draw.ellipse((cx-10, cy-10, cx+10, cy+10), outline=color, width=1)
            
            # Inner dot
            draw.ellipse((cx-3, cy-3, cx+3, cy+3), fill=color)

# Draw a few prominent floral petals at the corner
for angle_deg in range(0, 91, 15):
    angle = math.radians(angle_deg)
    cx = 150 * math.cos(angle)
    cy = 150 * math.sin(angle)
    draw.line((0, 0, cx, cy), fill=color, width=2)
    draw.ellipse((cx-20, cy-20, cx+20, cy+20), outline=color, width=2)

img.save("img/lace.png", "PNG")
