from pathlib import Path
for file in ['scripts/capture.mjs','scripts/capture-panels.mjs']:
 p=Path(file);s=p.read_text(encoding='utf-8-sig');s=s.replace("await p.evaluate(()=>document.fonts.ready);", "await p.evaluate(()=>document.fonts.ready);await p.locator('#products img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});})));await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));")
 p.write_text(s,encoding='utf-8')
