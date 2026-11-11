from pathlib import Path
import re
p=Path('index.html');s=p.read_text(encoding='utf-8');s=re.sub(r'<section class="closing">[\s\S]*?</section>','<section class="closing"><button class="finish-order" data-open-cart aria-label="Voir mon panier et compléter ma commande"><span aria-hidden="true">🛒</span><span lang="ar" dir="rtl">أكمل طلبك</span><span class="finish-check" aria-hidden="true">✓</span></button></section>',s,count=1);p.write_text(s,encoding='utf-8')
