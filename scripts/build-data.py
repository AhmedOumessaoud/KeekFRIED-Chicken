from pathlib import Path
import re,json
p=Path(r'C:/Users/hp/.codex/attachments/79844ff2-2cab-49f2-aa88-43430ddeabac/Pasted text.txt').read_text(encoding='utf-8')
section=p.split('### KEEK BURGERS')[1].split('## 5.')[0]
section='### KEEK BURGERS'+section
assets=['chicken-burger','burger','steak','stripes','meal','fish','tacos',None,None,'salad','fruit','juice','juice','drinks','fries']
categories=[]; products=[]
for i,chunk in enumerate(re.split(r'### ',section)[1:]):
 lines=chunk.splitlines(); title=lines[0].strip(); cid='cat-'+str(i); categories.append({'id':cid,'name':title.title()})
 for line in lines[1:]:
  m=re.match(r'\*{0,2}(.+?)\s*—\s*(\d+) DH',line)
  if not m: continue
  name=m[1].strip('* '); image=assets[i]; desc=''
  if i==3: desc=('4 frites + pain' if name.startswith('24') else '2 frites + pain' if name.startswith('12') else 'Frites + pain')
  if name=='Salade Chicken': desc='Tomates + laitue + crispy'
  if name=='Salade de Fruit': desc="Fruits de saison + jus d’avocat / orange"
  if name=='Tiramisu': image='tiramisu'
  if name=='Salade de Fruit': image='fruit'
  if i==14: image=['fries','wing','nuggets','cordon'][len([x for x in products if x['category']==cid])]
  products.append({'id':'p'+str(len(products)+1),'category':cid,'name':name,'description':desc,'price':int(m[2]),'image':'assets/images/'+image+'.webp' if image else None,'spicy':'spicy' in name.lower(),'assetStatus':'category-reference' if image else 'needed'})
Path('js/menu-data.js').write_text('export const categories = '+json.dumps(categories,ensure_ascii=False)+';\nexport const products = '+json.dumps(products,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
Path('assets/image-manifest.json').write_text(json.dumps({'note':'Poster crops are restaurant-provided category references, not unique product photographs. Tacos is generated. Dedicated variation images, individual juices and drinks, paninis and pasticcios still need photography. Null images render an honest text card.','products':products,'generatedPrompt':'Two halves of a Moroccan French grilled chicken tacos wrap, fries and cheese filling, black slate, charcoal backdrop, warm studio lighting, no text.'},ensure_ascii=False,indent=2),encoding='utf-8')
print(len(products),'products',len(categories),'categories')
