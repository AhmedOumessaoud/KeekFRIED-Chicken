import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:940,height:1000},reducedMotion:'reduce'});await p.goto('http://localhost:5173');await p.evaluate(()=>document.fonts.ready);await p.locator('#products img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));await p.locator('.refreshments').screenshot({path:'artifacts/refreshments.png'});await p.locator('#cat-14').screenshot({path:'artifacts/supplements.png'});
for(const width of [320,390,580,760,940,1440]){await p.setViewportSize({width,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Horizontal overflow ${width}`);}
const offline=await b.newContext({offline:true,viewport:{width:390,height:844}});const local=await offline.newPage();await local.goto(pathToFileURL(resolve('index.html')).href);await local.locator('.product').last().waitFor();assert.equal(await local.locator('.product').count(),79);await local.locator('.product .add').first().click();assert(await local.locator('#toast').textContent().then(x=>x.includes('Keek Burger')));console.log('Verified final layouts at 320–1440px and fully offline direct-file menu + cart.');await b.close();
