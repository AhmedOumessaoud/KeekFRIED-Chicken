from pathlib import Path
p=Path('scripts/capture-panels.mjs');s=p.read_text(encoding='utf-8-sig');s=s.replace("await p.screenshot({path:'artifacts/dessert-drinks.png'", "await p.locator('#cat-9 img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode();})));await p.screenshot({path:'artifacts/dessert-drinks.png'")
s=s.replace("await p.screenshot({path:'artifacts/dessert-mobile.png'", "await p.locator('#cat-9 img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await p.screenshot({path:'artifacts/dessert-mobile.png'")
p.write_text(s,encoding='utf-8')
