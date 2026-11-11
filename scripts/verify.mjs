import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {products,categories} from '../js/menu-data.js';
import {Cart,orderMessage} from '../js/cart.js';
assert.equal(products.length,79);assert.equal(categories.length,15);
assert.equal(new Set(products.map(p=>p.id)).size,79);
assert.equal(products.find(p=>p.name==="Jus d'avocat").price,25);
assert(!products.some(p=>/popcorn|chick-leg/i.test(p.name)));
for(const p of products){assert(categories.some(c=>c.id===p.category));assert(p.price>0);assert(p.image&&existsSync(p.image),`Missing ${p.name} image`);}
let data={};const storage={getItem:k=>data[k],setItem:(k,v)=>data[k]=v};const cart=new Cart(storage);
const burger=products.find(p=>p.name==='Keek Burger');const fries=products.find(p=>p.name==='Portion de frites');const avocado=products.find(p=>p.name==="Jus d'avocat");
cart.change(burger.id,2);cart.change(fries.id,1);cart.change(avocado.id,1);assert.equal(cart.total,115);assert.equal(cart.count,4);assert.equal(new Cart(storage).total,115);
const message=orderMessage(cart,{type:'Sur place',table:'5'});assert(message.includes('TOTAL : 115 DH'));assert(message.includes('Table : 5'));assert.equal(decodeURIComponent(encodeURIComponent(message)),message);assert(orderMessage(cart,{type:'Livraison'}).includes('hors frais de livraison'));
cart.change(burger.id,-1);assert.equal(cart.total,75);cart.remove(fries.id);assert.equal(cart.total,65);cart.change(burger.id,-99);assert.equal(cart.total,25);
data={'keek-cart-v1':'{"p1":-3,"p2":"x","evil":3}'};assert.equal(new Cart(storage).total,0);console.log('Verified 79 products, 15 categories, local assets, totals, persistence, corrupted storage and WhatsApp message.');
