from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8');s=s.replace('<section class="menu-shell" id="menu"><div class="menu-heading">','<section class="menu-shell" id="menu"><div class="menu-heading">')
p.write_text(s,encoding='utf-8')
