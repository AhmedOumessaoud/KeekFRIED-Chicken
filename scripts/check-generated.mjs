import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {products} from '../js/menu-data.js';
const hashes=new Set();
for(const p of products){assert.equal(p.assetStatus,'generated-unique',`${p.name} still uses category photography`);assert(existsSync(p.image));const image=readFileSync(p.image);assert(image.length>1000);assert.equal(image.subarray(0,4).toString(),'RIFF');hashes.add(createHash('sha256').update(image).digest('hex'));}
assert.equal(hashes.size,79,'Every product must have a distinct image');console.log('Verified 79 distinct generated local WebP images, all connected to their products.');
