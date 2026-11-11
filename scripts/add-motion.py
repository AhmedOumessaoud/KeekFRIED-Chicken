from pathlib import Path
p=Path('js/app.js');s=p.read_text(encoding='utf-8');s="import {flyToCart} from './motion.js';\n"+s
s=s.replace('<article class="cart-line"><img','<article class="cart-line" data-cart-id="${p.id}"><img')
s=s.replace('aria-label="Supprimer ${escape(p.name)}">Supprimer</button>', 'aria-label="Supprimer ${escape(p.name)}" title="Supprimer ${escape(p.name)}"><span aria-hidden="true">×</span></button>')
s=s.replace("const id=button.dataset.id;cart.change(id,Number(button.dataset.change));sync();", "const id=button.dataset.id;const previous=cart.quantity(id);const fromMenu=!$('#cart-dialog').open;const sourceRect=button.closest('.product');cart.change(id,Number(button.dataset.change));sync();if(fromMenu&&cart.quantity(id)>previous)flyToCart(products.find(p=>p.id===id),sourceRect?.querySelector('button')||button);")
s=s.replace("if(button.dataset.remove){cart.remove(button.dataset.remove);sync();}", "if(button.dataset.remove){const rows=[...document.querySelectorAll('.cart-line')];const index=rows.indexOf(button.closest('.cart-line'));cart.remove(button.dataset.remove);sync();const remaining=[...document.querySelectorAll('.cart-line .remove')];(remaining[Math.min(index,remaining.length-1)]||$('#close-cart')).focus({preventScroll:true});}")
p.write_text(s,encoding='utf-8')
p=Path('scripts/build-browser.mjs');s=p.read_text(encoding='utf-8-sig').replace("'js/cart.js','js/app.js'", "'js/cart.js','js/motion.js','js/app.js'");p.write_text(s,encoding='utf-8')
p=Path('index.html');s=p.read_text(encoding='utf-8').replace('<link rel="stylesheet" href="css/mobile.css">','<link rel="stylesheet" href="css/mobile.css"><link rel="stylesheet" href="css/motion.css">');p.write_text(s,encoding='utf-8')
