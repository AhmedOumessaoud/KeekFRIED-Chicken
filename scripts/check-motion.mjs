import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const b=await chromium.launch();
for(const mobile of [false,true]){
 const p=await b.newPage({viewport:{width:mobile?320:1280,height:800},hasTouch:mobile,isMobile:mobile});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:5173');await p.locator('[data-category="cat-0"]').click();
 const add=p.locator('.product .add').first();if(!mobile){await add.hover();assert.notEqual(await add.evaluate(e=>getComputedStyle(e).translate),'none');}
 await add.click();await p.locator('.flying-product').waitFor({state:'attached'});assert.equal(await p.locator('#cart-count').textContent(),'1');await p.locator('.flying-product').waitFor({state:'detached'});
 await p.locator('.product .add').first().click();await p.locator('#cart-bar').click();assert.equal(await p.locator('.cart-line .remove').count(),2);assert.equal(await p.locator('.cart-line .remove').first().textContent(),'×');
 for(const cross of await p.locator('.cart-line .remove').all()){const box=await cross.boundingBox();assert(box.width>=44&&box.height>=44);}
 await p.screenshot({path:`artifacts/cart-cross-${mobile?'mobile':'desktop'}.png`});await p.locator('.cart-line .remove').first().click();assert.equal(await p.locator('.cart-line').count(),1);assert.equal(await p.locator('#cart-count').textContent(),'1');assert.equal(await p.locator('#drawer-total').textContent(),'45 DH');await p.locator('.cart-line .remove').click();assert.equal(await p.locator('.cart-line').count(),0);assert(await p.locator('.empty').isVisible());await p.locator('#close-cart').click();await p.reload();assert.equal(await p.locator('#cart-count').textContent(),'0');assert.deepEqual(errors,[]);await p.close();
}
const reduced=await b.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});await reduced.goto('http://localhost:5173');await reduced.locator('.product .add').first().click();assert.equal(await reduced.locator('.flying-product').count(),0);assert.equal(await reduced.locator('#cart-count').textContent(),'1');await b.close();console.log('Verified hover/click feedback, fly-to-cart and cleanup, mobile/desktop × removal, totals, persistence, empty state and reduced motion.');
