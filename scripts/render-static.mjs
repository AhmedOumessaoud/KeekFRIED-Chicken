import {chromium} from '@playwright/test';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const browser=await chromium.launch();const page=await browser.newPage();await page.goto(pathToFileURL(resolve('index.html')).href);await page.locator('.product').last().waitFor();
const menu=await page.locator('#products').innerHTML(),nav=await page.locator('#categories').innerHTML();let html=readFileSync('index.html','utf8');
html=html.replace(/<div id="products">[\s\S]*?<\/div><p id="no-results"/,`<div id="products">${menu}</div><p id="no-results"`);
html=html.replace(/<nav id="categories" aria-label="Catégories du menu">[\s\S]*?<\/nav>/,`<nav id="categories" aria-label="Catégories du menu">${nav}</nav>`);
html=html.replace(/<span id="result-count">[\s\S]*?<\/span>/,'<span id="result-count">79 plats &amp; boissons</span>');writeFileSync('index.html',html);await browser.close();console.log('Saved visible HTML fallback for all 79 products.');
