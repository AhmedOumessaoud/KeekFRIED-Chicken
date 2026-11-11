import {flyToCart} from './motion.js';
import {categories,products} from './menu-data.js';
import {Cart,orderMessage} from './cart.js';
import {config} from './config.js';
const cart=new Cart(); const $=s=>document.querySelector(s);let selected='all';let timer;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
function controls(p){const q=cart.quantity(p.id);return q?`<div class="quantity" aria-label="Quantité de ${escape(p.name)}"><button data-change="-1" data-id="${p.id}" aria-label="Retirer un ${escape(p.name)}">−</button><output>${q}</output><button data-change="1" data-id="${p.id}" aria-label="Ajouter un ${escape(p.name)}">+</button></div>`:`<button class="add" data-change="1" data-id="${p.id}" aria-label="Ajouter ${escape(p.name)}"><span aria-hidden="true">＋</span> <span lang="ar" dir="rtl">الطلب الآن</span><span class="button-cart" aria-hidden="true">＋</span></button>`;}
function renderMenu(){
 const categoryScroll=$('#categories').scrollLeft;
 $('#categories').innerHTML=[{id:'all',name:'Tout le menu'},...categories].map(c=>`<button class="${selected===c.id?'active':''}" data-category="${c.id}" aria-pressed="${selected===c.id}">${c.name}</button>`).join('');
 $('#categories').scrollLeft=categoryScroll;
 const found=products.filter(p=>(selected==='all'||p.category===selected)&&normalize(p.name+' '+p.description+' '+p.price+' DH').includes(normalize($('#search').value))&&(!$('#spicy-filter').checked||p.spicy));
 $('#result-count').textContent=`${found.length} plats & boissons`;$('#no-results').hidden=!!found.length;
 function section(i){const c=categories[i],items=found.filter(p=>p.category===c.id);if(!items.length)return '';const featured=i===9||i===14,drinks=i>=10&&i<=13;
 return `<section class="category-section ${featured?'showcase':'poster-section'} ${drinks?'drinks-section':''} ${i===14?'extras-section':''}" id="${c.id}" aria-labelledby="heading-${c.id}"><div class="section-title"><h2 id="heading-${c.id}">${i===10?'Salades de fruits':c.name}</h2></div>${!featured?`<div class="category-photo"><img src="${items[0].image}" alt="${escape(c.name)} — photo de présentation" loading="lazy" width="400" height="300"></div>`:''}<div class="product-grid">${items.map(p=>`<article class="product" data-product="${p.id}">${!featured?`<img class="mobile-product-photo" src="${p.image}" alt="" loading="lazy" decoding="async" width="160" height="160">`:``}${featured?`<div class="product-photo"><img src="${p.image}" alt="${escape(p.name)} — photo de présentation" loading="lazy" width="360" height="270"></div>`:''}<div class="product-info"><div class="product-name"><h3>${p.spicy?'<span aria-label="Épicé">🔥</span> ':''}${escape(p.name)}</h3>${p.description?`<p>${escape(p.description)}</p>`:''}</div><span class="dot-leader" aria-hidden="true"></span><div class="product-bottom"><strong class="price">${p.price} <small>DH</small></strong><div data-controls="${p.id}">${controls(p)}</div></div></div></article>`).join('')}</div></section>`;
 }
 const savoury=[0,1,2,3,4,5].map(section).join('');
 const dessert=section(9),juices=[10,11,12].map(section).join(''),drinks=section(13),extras=section(14),more=[6,7,8].map(section).join('');
 const secondary=!!(dessert||juices||drinks||extras);
 $('#products').innerHTML=`${savoury}${savoury&&secondary?'<div class="poster-page-title"><img src="assets/logo/keek.webp" alt="KeekFRIED Chicken"><h2>Notre <span>Menu</span></h2></div>':''}${dessert}${juices||drinks?`<div class="refreshments">${juices?`<div class="juice-panel"><div class="panel-title"><span aria-hidden="true">🍹</span><h2>Nos Jus</h2></div>${juices}<img class="panel-decoration" src="${products.find(p=>p.category==='cat-10').image}" alt="Fruits frais" loading="lazy"></div>`:''}${drinks?`<div class="beverage-panel"><div class="panel-title"><span aria-hidden="true">🥤</span><h2>Boissons</h2></div>${drinks}<div class="bottles">${products.filter(p=>p.category==='cat-13'&&['Pepsi','7 Up','Mirinda','Plus','Eau Minérale G'].includes(p.name)).map(p=>`<img src="${p.image}" alt="${escape(p.name)}" loading="lazy">`).join('')}</div></div>`:''}</div>`:''}${extras}${more?`<div class="more-menu"><h2>Encore plus de gourmandise</h2>${more}</div>`:''}`;
 document.querySelectorAll('#products img').forEach(img=>{img.onload=()=>img.classList.add('loaded');img.onerror=()=>{img.classList.add('image-unavailable');img.alt='Photo à venir';};if(img.complete)img.classList.add('loaded');});
}

function sync(){
 $('#cart-count').textContent=cart.count;$('#bar-count').textContent=cart.count;$('#bar-total').textContent=cart.total+' DH';$('#cart-bar').hidden=!cart.count;
 document.querySelectorAll('[data-controls]').forEach(el=>el.innerHTML=controls(products.find(p=>p.id===el.dataset.controls)));
 $('#cart-lines').innerHTML=cart.lines.length?cart.lines.map(p=>`<article class="cart-line" data-cart-id="${p.id}"><img class="cart-thumbnail" src="${p.image}" alt=""><div><h3>${escape(p.name)}</h3><small>${p.price} DH / unité</small>${controls(p)}</div><div><strong>${p.subtotal} DH</strong><button class="remove" data-remove="${p.id}" aria-label="Supprimer ${escape(p.name)}" title="Supprimer ${escape(p.name)}"><span aria-hidden="true">×</span></button></div></article>`).join(''):'<div class="empty"><span>▢</span><h3>Un panier plein de possibilités.</h3><p>Ajoutez vos envies, on s’occupe du croustillant.</p><button class="primary" id="browse">Explorer le menu →</button></div>';
 $('#checkout').hidden=!cart.count;updateTotal();
}
function updateTotal(){const delivery=$('[name=type]:checked').value==='Livraison';const fee=delivery&&Number.isFinite(config.deliveryFee)?config.deliveryFee:0;$('#drawer-total').textContent=(cart.total+fee)+' DH';$('#total-label').textContent=delivery&&config.deliveryFee===null?'Total hors frais de livraison':'Total';$('#checkout-note').textContent=!config.whatsappNumber?'La commande WhatsApp sera disponible dès que le restaurant aura renseigné son numéro.':delivery?(config.deliveryFee===null?'Les frais de livraison seront confirmés par le restaurant.':`Livraison incluse : ${fee} DH`):'';$('.whatsapp').disabled=!/^\d{8,15}$/.test(config.whatsappNumber);}
const drafts={};
function fields(){document.querySelectorAll('#order-fields input,#order-fields textarea').forEach(e=>drafts[e.name]=e.value);const type=$('[name=type]:checked').value;$('#order-fields').innerHTML=type==='Sur place'?'<label>Numéro de table <small>(facultatif)</small><input name="table" maxlength="30" placeholder="Ex. 5"></label>':type==='À emporter'?'<label>Votre nom <small>(facultatif)</small><input name="name" autocomplete="name" maxlength="100"></label>':'<label>Votre nom<input name="name" autocomplete="name" maxlength="100" required></label><label>Téléphone<input name="phone" type="tel" autocomplete="tel" maxlength="30" required pattern="[+0-9 ()-]{6,30}"></label><label>Adresse de livraison<textarea name="address" autocomplete="street-address" maxlength="500" required rows="2"></textarea></label>';document.querySelectorAll('#order-fields input,#order-fields textarea').forEach(e=>e.value=drafts[e.name]||'');updateTotal();}
let pageScroll=0;
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

document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.dataset.change){const id=button.dataset.id;const previous=cart.quantity(id);const fromMenu=!$('#cart-dialog').open;const sourceRect=button.closest('.product');cart.change(id,Number(button.dataset.change));sync();if(fromMenu&&cart.quantity(id)>previous)flyToCart(products.find(p=>p.id===id),sourceRect?.querySelector('button')||button);if(Number(button.dataset.change)>0&&!$('#cart-dialog').open){const added=products.find(p=>p.id===id);$('#toast').innerHTML=`<img src="${added.image}" alt=""><div><strong>✓ تزادت للسلة</strong><span>${escape(added.name)} × ${cart.quantity(id)} · ${added.price*cart.quantity(id)} DH</span></div><button data-open-cart>Voir le panier →</button>`;$('#toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('show'),2200);}}if(button.dataset.remove){const rows=[...document.querySelectorAll('.cart-line')];const index=rows.indexOf(button.closest('.cart-line'));cart.remove(button.dataset.remove);sync();const remaining=[...document.querySelectorAll('.cart-line .remove')];(remaining[Math.min(index,remaining.length-1)]||$('#close-cart')).focus({preventScroll:true});}if(button.hasAttribute('data-open-cart'))openCart();if(button.id==='close-cart'||button.id==='browse')close();if(button.dataset.category){$('#toast').classList.remove('show');selected=button.dataset.category;renderMenu();$('#categories .active').scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});$('#menu').scrollIntoView({behavior:'smooth'});}});
$('#cart-dialog').addEventListener('cancel',e=>{e.preventDefault();close();});
$('#cart-dialog').addEventListener('click',e=>{if(e.target!==$('#cart-dialog'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();});
$('#search').addEventListener('input',renderMenu);$('#spicy-filter').addEventListener('change',renderMenu);document.querySelectorAll('[name=type]').forEach(e=>e.addEventListener('change',fields));
$('#checkout').addEventListener('submit',e=>{e.preventDefault();if(!cart.count||!/^\d{8,15}$/.test(config.whatsappNumber))return;const data=Object.fromEntries(new FormData(e.target));for(const key of Object.keys(data))data[key]=data[key].trim();if(data.type==='Livraison'&&(!data.name||!data.phone||!data.address)){ $('#checkout-note').textContent='Veuillez compléter les informations de livraison.';return;}const message=orderMessage(cart,data);window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');});
$('#search').value='';$('#spicy-filter').checked=false;
renderMenu();fields();sync();
