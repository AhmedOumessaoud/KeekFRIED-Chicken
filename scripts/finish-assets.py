from PIL import Image
from pathlib import Path
import json
r=Path('C:/Users/hp/.codex/generated_images/01a1cb6b-2b87-7002-9376-8656ae46e1a4')
for name,file in [('panini','exec-0c9da0ad-9544-4309-8211-e7e574ab71d2.png'),('pasticcio','exec-f4b9cc66-a1c7-4eff-9636-e41f12588b59.png')]:
 Image.open(r/file).resize((900,600)).save(f'assets/images/{name}.webp',quality=86)
p=Path('js/menu-data.js');s=p.read_text(encoding='utf-8');prefix,s=s.split('export const products = ');items=json.loads(s.rstrip(';\n'))
for item in items:
 if item['category'] in ['cat-7','cat-8']:
  item['image']='assets/images/'+('pasticcio' if item['category']=='cat-7' else 'panini')+'.webp';item['assetStatus']='generated-category-reference'
p.write_text(prefix+'export const products = '+json.dumps(items,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
m=Path('assets/image-manifest.json');data=json.loads(m.read_text(encoding='utf-8'));data['products']=items;data['note']='Restaurant-provided poster crops and generated tacos, panini and pasticcio serve as category references. Unique product variation photos and individual juices/drinks still need photography.';m.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
