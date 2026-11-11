from pathlib import Path
p=Path('js/cart.js');s=p.read_text(encoding='utf-8-sig').replace('constructor(storage=globalThis.localStorage) {','constructor(storage) {\n  if (!storage) { try { storage=globalThis.localStorage; } catch {} }');p.write_text(s,encoding='utf-8')
p=Path('js/app.js');s=p.read_text(encoding='utf-8-sig').replace('renderMenu();fields();sync();',"$('#search').value='';$('#spicy-filter').checked=false;\nrenderMenu();fields();sync();")
s=s.replace("normalize(p.name+' '+p.description).includes", "normalize(p.name+' '+p.description+' '+p.price+' DH').includes")
p.write_text(s,encoding='utf-8')
