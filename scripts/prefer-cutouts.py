from pathlib import Path
p=Path('scripts/connect-generated.mjs');s=p.read_text(encoding='utf-8-sig').replace('const image=`assets/images/generated/${p.id}.webp`;','const cutout=`assets/images/generated/${p.id}-cutout.webp`;const image=existsSync(cutout)?cutout:`assets/images/generated/${p.id}.webp`;');p.write_text(s,encoding='utf-8')
