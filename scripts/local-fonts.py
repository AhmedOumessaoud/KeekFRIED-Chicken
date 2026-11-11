from pathlib import Path
import urllib.request,re
folder=Path('assets/fonts');folder.mkdir(exist_ok=True)
url='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Caveat:wght@700&family=DM+Sans:wght@400;600;700&display=swap'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
css=urllib.request.urlopen(req,timeout=30).read().decode()
urls=list(dict.fromkeys(re.findall(r'https://fonts\.gstatic\.com/[^)\s]+',css)))
for i,u in enumerate(urls):
 ext='woff2' if '.woff2' in u else 'ttf' if '.ttf' in u else 'woff'
 name=f'keek-font-{i}.{ext}'
 (folder/name).write_bytes(urllib.request.urlopen(u,timeout=30).read())
 css=css.replace(u,name)
(folder/'fonts.css').write_text(css,encoding='utf-8')
p=Path('css/style.css');s=p.read_text(encoding='utf-8-sig');s=re.sub(r"@import url\('[^']+'\);",'@import url("../assets/fonts/fonts.css");',s,count=1);p.write_text(s,encoding='utf-8')
for family,repo in [('BarlowCondensed','barlowcondensed'),('Caveat','caveat'),('DMSans','dmsans')]:
 try:(folder/f'{family}-OFL.txt').write_bytes(urllib.request.urlopen(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{repo}/OFL.txt',timeout=30).read())
 except Exception as e:print(f'License fetch: {family}: {e}')
print(f'Saved {len(urls)} local font files.')
