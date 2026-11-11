from pathlib import Path
p=Path('js/app.js');s=p.read_text(encoding='utf-8')
s=s.replace(" $('#categories').innerHTML=", " const categoryScroll=$('#categories').scrollLeft;\n $('#categories').innerHTML=")
s=s.replace(" const found=products.filter", " $('#categories').scrollLeft=categoryScroll;\n const found=products.filter")
s=s.replace('${featured?`<div class="product-photo">', '${!featured?`<img class="mobile-product-photo" src="${p.image}" alt="" loading="lazy" decoding="async" width="160" height="160">`:``}${featured?`<div class="product-photo">')
a=s.index('function close(){');b=s.index("document.addEventListener('click'",a)
s=s[:a]+'''let pageScroll=0;
function openCart(){
 if($('#cart-dialog').open)return;
 pageScroll=window.scrollY;sync();$('#toast').classList.remove('show');
 document.body.classList.add('modal-open');
 document.body.style.position='fixed';document.body.style.top=`-${pageScroll}px`;document.body.style.width='100%';
 $('#cart-dialog').showModal();$('#cart-dialog').scrollTop=0;
}
function close(){
 $('#cart-dialog').close();document.body.classList.remove('modal-open');
 document.body.style.position='';document.body.style.top='';document.body.style.width='';
 window.scrollTo({top:pageScroll,behavior:'instant'});
}

''' +s[b:]
s=s.replace("if(button.hasAttribute('data-open-cart')){sync();$('#cart-dialog').showModal();document.body.classList.add('modal-open');}","if(button.hasAttribute('data-open-cart'))openCart();")
s=s.replace("renderMenu();$('#menu').scrollIntoView({behavior:'smooth'});", "renderMenu();$('#categories .active').scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});$('#menu').scrollIntoView({behavior:'smooth'});")
s=s.replace("},2200)","},4000)")
s=s.replace("$('#cart-dialog').addEventListener('cancel',()=>document.body.classList.remove('modal-open'));", "$('#cart-dialog').addEventListener('cancel',e=>{e.preventDefault();close();});")
s=s.replace("if(e.target===$('#cart-dialog')&&e.offsetX<0)close();", "if(e.target!==$('#cart-dialog'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();")
p.write_text(s,encoding='utf-8')
p=Path('index.html');s=p.read_text(encoding='utf-8');s=s.replace('width=device-width,initial-scale=1','width=device-width,initial-scale=1,viewport-fit=cover');s=s.replace('<link rel="stylesheet" href="css/style.css">','<link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/mobile.css">');p.write_text(s,encoding='utf-8')
