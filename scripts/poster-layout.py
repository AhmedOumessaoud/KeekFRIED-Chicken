from pathlib import Path
p=Path('js/app.js');s=p.read_text(encoding='utf-8')
a=s.index('function renderMenu(){');b=s.index('\nfunction sync()',a)
s=s[:a]+'''function renderMenu(){
 $('#categories').innerHTML=[{id:'all',name:'Tout le menu'},...categories].map(c=>`<button class="${selected===c.id?'active':''}" data-category="${c.id}" aria-pressed="${selected===c.id}">${c.name}</button>`).join('');
 const found=products.filter(p=>(selected==='all'||p.category===selected)&&normalize(p.name+' '+p.description+' '+p.price+' DH').includes(normalize($('#search').value))&&(!$('#spicy-filter').checked||p.spicy));
 $('#result-count').textContent=`${found.length} plats & boissons`;$('#no-results').hidden=!!found.length;
 function section(i){const c=categories[i],items=found.filter(p=>p.category===c.id);if(!items.length)return '';const featured=i===9||i===14,drinks=i>=10&&i<=13;
 return `<section class="category-section ${featured?'showcase':'poster-section'} ${drinks?'drinks-section':''} ${i===14?'extras-section':''}" id="${c.id}" aria-labelledby="heading-${c.id}"><div class="section-title"><h2 id="heading-${c.id}">${i===10?'Salades de fruits':c.name}</h2></div>${!featured?`<div class="category-photo"><img src="${items[0].image}" alt="${escape(c.name)} — photo de présentation" loading="lazy" width="400" height="300"></div>`:''}<div class="product-grid">${items.map(p=>`<article class="product" data-product="${p.id}">${featured?`<div class="product-photo"><img src="${p.image}" alt="${escape(p.name)} — photo de présentation" loading="lazy" width="360" height="270"></div>`:''}<div class="product-info"><div class="product-name"><h3>${p.spicy?'<span aria-label="Épicé">🔥</span> ':''}${escape(p.name)}</h3>${p.description?`<p>${escape(p.description)}</p>`:''}</div><span class="dot-leader" aria-hidden="true"></span><div class="product-bottom"><strong class="price">${p.price} <small>DH</small></strong><div data-controls="${p.id}">${controls(p)}</div></div></div></article>`).join('')}</div></section>`;
 }
 const savoury=[0,1,2,3,4,5].map(section).join('');
 const dessert=section(9),juices=[10,11,12].map(section).join(''),drinks=section(13),extras=section(14),more=[6,7,8].map(section).join('');
 const secondary=!!(dessert||juices||drinks||extras);
 $('#products').innerHTML=`${savoury}${savoury&&secondary?'<div class="poster-page-title"><img src="assets/logo/keek.webp" alt="KeekFRIED Chicken"><h2>Notre <span>Menu</span></h2></div>':''}${dessert}${juices||drinks?`<div class="refreshments">${juices?`<div class="juice-panel"><div class="panel-title"><span aria-hidden="true">🍹</span><h2>Nos Jus</h2></div>${juices}<img class="panel-decoration" src="${products.find(p=>p.category==='cat-10').image}" alt="Fruits frais" loading="lazy"></div>`:''}${drinks?`<div class="beverage-panel"><div class="panel-title"><span aria-hidden="true">🥤</span><h2>Boissons</h2></div>${drinks}<div class="bottles">${products.filter(p=>p.category==='cat-13'&&['Pepsi','7 Up','Mirinda','Plus','Eau Minérale G'].includes(p.name)).map(p=>`<img src="${p.image}" alt="${escape(p.name)}" loading="lazy">`).join('')}</div></div>`:''}</div>`:''}${extras}${more?`<div class="more-menu"><h2>Encore plus de gourmandise</h2>${more}</div>`:''}`;
 document.querySelectorAll('#products img').forEach(img=>{img.onload=()=>img.classList.add('loaded');img.onerror=()=>{img.classList.add('image-unavailable');img.alt='Photo à venir';};if(img.complete)img.classList.add('loaded');});
}
''' +s[b:]
s=s.replace('<span lang="ar" dir="rtl">أضف للسلة</span>','<span lang="ar" dir="rtl">الطلب الآن</span>')
s=s.replace('<span class="button-cart" aria-hidden="true">🛒</span>', '<span class="button-cart" aria-hidden="true">＋</span>')
p.write_text(s,encoding='utf-8')
p=Path('index.html');s=p.read_text(encoding='utf-8');s=s.replace('CRISPY. FRESH. KEEK.','KEEK FRIED CHICKEN');s=s.replace('<h1>Notre <span>Menu</span></h1>','<h1>Notre <span>Menu</span></h1>');s=s.replace('<h2>Votre prochaine bouchée<br>vous attend.</h2>','<h2 lang="ar" dir="rtl">أكمل طلبك</h2>');p.write_text(s,encoding='utf-8')
