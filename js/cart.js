import {products} from './menu-data.js';
import {config} from './config.js';
export class Cart {
 constructor(storage) {
  if (!storage) { try { storage=globalThis.localStorage; } catch {} }
  this.storage=storage; this.items={};
  try { const data=JSON.parse(storage.getItem(config.storageKey)||'{}'); for(const [id,q] of Object.entries(data)) if(products.some(p=>p.id===id)&&Number.isInteger(q)&&q>0) this.items[id]=Math.min(q,99); } catch {}
 }
 quantity(id){return this.items[id]||0;}
 change(id,delta){if(!products.some(p=>p.id===id))return; const q=Math.max(0,Math.min(99,this.quantity(id)+delta)); if(q)this.items[id]=q;else delete this.items[id];this.save();}
 remove(id){delete this.items[id];this.save();}
 save(){try{this.storage.setItem(config.storageKey,JSON.stringify(this.items));}catch{} }
 get lines(){return products.filter(p=>this.quantity(p.id)).map(p=>({...p,quantity:this.quantity(p.id),subtotal:p.price*this.quantity(p.id)}));}
 get count(){return this.lines.reduce((s,p)=>s+p.quantity,0);}
 get total(){return this.lines.reduce((s,p)=>s+p.subtotal,0);}
}
export function orderMessage(cart, details){
 const delivery=details.type==='Livraison';const fee=delivery&&Number.isFinite(config.deliveryFee)?config.deliveryFee:0;
 return ['🍗 KEEK FRIED CHICKEN','','🧾 Nouvelle commande','',...cart.lines.map(p=>`${p.name} x${p.quantity} — ${p.subtotal} DH`),'',...(delivery&&fee?[`Livraison : ${fee} DH`]:[]),`💰 TOTAL : ${cart.total+fee} DH${delivery&&config.deliveryFee===null?' (hors frais de livraison)':''}`,'',`📍 Type : ${details.type}`,...(details.table?[`Table : ${details.table}`]:[]),...(details.name?[`Nom : ${details.name}`]:[]),...(details.phone?[`Téléphone : ${details.phone}`]:[]),...(details.address?[`Adresse : ${details.address}`]:[])].join('\n');
}
