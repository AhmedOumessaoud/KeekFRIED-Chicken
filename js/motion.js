export const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function pressButton(button){
 if(reducedMotion()||button.disabled)return;
 button.animate([{scale:'1'},{scale:'.94',offset:.4},{scale:'1'}],{duration:220,easing:'ease-out'});
}

export function flyToCart(product, origin){
 const target=document.querySelector('#cart-bar');
 if(!origin||!target||reducedMotion())return;
 const row=origin.closest('.product');
 const images=[...(row?.querySelectorAll('img')||[]),...(row?.closest('.category-section')?.querySelectorAll('.category-photo img')||[])];
 const visible=images.find(img=>img.getBoundingClientRect().width>0);
 const from=(visible||origin).getBoundingClientRect();
 const to=target.getBoundingClientRect();
 if(!from.width||!to.width)return;
 row?.animate([{boxShadow:'0 0 0 0 #ffcc0000'},{boxShadow:'0 0 0 3px #ffcc00aa',offset:.25},{boxShadow:'0 0 0 0 #ffcc0000'}],{duration:550});
 const existing=document.querySelectorAll('.flying-product');
 if(existing.length>=5)existing[0].remove();
 const image=document.createElement('img');image.className='flying-product';image.src=product.image;image.alt='';image.setAttribute('aria-hidden','true');
 const size=Math.min(94,Math.max(64,from.width));image.style.width=size+'px';image.style.height=size+'px';
 const sx=from.left+from.width/2-size/2,sy=from.top+from.height/2-size/2;
 const ex=to.left+Math.min(40,to.width/2)-size/2,ey=to.top+to.height/2-size/2;
 image.style.left=sx+'px';image.style.top=sy+'px';document.body.append(image);
 const dx=ex-sx,dy=ey-sy;
 const animation=image.animate([
  {transform:'translate(0,0) scale(1)',opacity:1},
  {transform:`translate(${dx*.4}px,${dy*.35-65}px) scale(1.12) rotate(-12deg)`,opacity:1,offset:.42},
  {transform:`translate(${dx}px,${dy}px) scale(.18) rotate(8deg)`,opacity:.2}
 ],{duration:680,easing:'cubic-bezier(.28,.02,.38,1)',fill:'forwards'});
 const cleanup=()=>image.remove();
 animation.finished.then(()=>{cleanup();if(target.isConnected&&!target.hidden)target.animate([{scale:'1'},{scale:'1.035',offset:.4},{scale:'1'}],{duration:280});},cleanup);
}

document.addEventListener('pointerdown',e=>{const button=e.target.closest('button');if(button)pressButton(button);},{passive:true});
document.addEventListener('click',e=>{if(e.detail===0){const button=e.target.closest('button');if(button)pressButton(button);}});
