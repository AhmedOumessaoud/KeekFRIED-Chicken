from pathlib import Path
from PIL import Image
r=Path('.')
a=Image.open(r'C:/Users/hp/Downloads/Menu gourmand KeekFRIED Chicken.png'); b=Image.open(r'C:/Users/hp/Downloads/Menu KeekFRIED Chicken gourmand.png')
crops={'chicken-burger':(a,(0,230,330,460)),'burger':(a,(15,474,332,670)),'steak':(a,(18,688,332,875)),'stripes':(a,(12,889,333,1070)),'meal':(a,(16,1090,334,1272)),'fish':(a,(20,1300,350,1476)),'salad':(b,(49,270,260,418)),'fruit':(b,(369,270,553,417)),'tiramisu':(b,(643,261,855,418)),'juice':(b,(345,543,467,633)),'drinks':(b,(514,1100,915,1295)),'fries':(b,(73,1390,231,1515)),'wing':(b,(270,1384,471,1510)),'nuggets':(b,(502,1400,667,1512)),'cordon':(b,(707,1399,905,1509))}
for n,(im,box) in crops.items(): im.crop(box).save(r/f'assets/images/{n}.webp',quality=90)
b.crop((235,2,675,113)).save(r/'assets/logo/keek.webp',quality=95)
Image.open(r'C:/Users/hp/.codex/generated_images/01a1cb6b-2b87-7002-9376-8656ae46e1a4/exec-610207c2-694c-46fc-8972-424bfdf1ce86.png').resize((900,600)).save(r/'assets/images/tacos.webp',quality=86)
