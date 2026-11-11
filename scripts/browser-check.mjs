import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5173');await page.evaluate(()=>localStorage.clear());await page.reload();await page.locator('.product').last().waitFor();assert.equal(await page.locator('.product').count(),79);
for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);}
await page.setViewportSize({width:390,height:844});
for(const id of await page.locator('.product .add').evaluateAll(es=>es.map(e=>e.dataset.id))){await page.locator(`.product [data-id="${id}"]`).click();}
assert.equal(await page.locator('#cart-count').textContent(),'79');await page.reload();assert.equal(await page.locator('#cart-count').textContent(),'79');
await page.locator('#search').fill('avocat');assert.equal(await page.locator('.product').count(),3);await page.locator('#search').fill('zzzz');await page.locator('#no-results').waitFor({state:'visible'});await page.locator('#search').fill('');
await page.locator('#cart-bar').click();await page.locator('#cart-dialog').waitFor({state:'visible'});assert.equal(await page.locator('.cart-line').count(),79);await page.locator('[name=type][value="Livraison"]').check();assert(await page.locator('[name=address]').isVisible());assert.equal(await page.locator('[name=address]').getAttribute('required'),'');assert((await page.locator('#total-label').textContent()).includes('hors frais'));assert(await page.locator('.whatsapp').isDisabled());await page.locator('[name=type][value="À emporter"]').check();assert.equal(await page.locator('[name=address]').count(),0);await page.locator('#close-cart').click();
await page.evaluate(()=>localStorage.clear());await page.reload();await page.locator('[data-category="cat-0"]').click();assert.equal(await page.locator('.product').count(),4);await page.locator('[data-category="all"]').click();
await page.screenshot({path:'artifacts/mobile.png',fullPage:false});await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'artifacts/desktop.png',fullPage:false});
const broken=await page.locator('.product img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return imgs.filter(i=>!i.naturalWidth).map(i=>i.src)});assert.deepEqual(broken,[]);assert.deepEqual(errors,[]);console.log('Browser verified: all 79 add buttons, persistence, search, filters, checkout fields, 320–1440px overflow, image loading, no JS errors.');await browser.close();

