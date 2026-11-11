from PIL import Image
import sys
im=Image.open(sys.argv[1]);im.thumbnail((800,600));im.save(sys.argv[2],quality=86)
