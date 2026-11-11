import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {products,categories} from '../js/menu-data.js';
for(const p of products){const cutout=`assets/images/generated/${p.id}-cutout.webp`;const image=existsSync(cutout)?cutout:`assets/images/generated/${p.id}.webp`;if(existsSync(image)){p.image=image;p.assetStatus='generated-unique';}}
writeFileSync('js/menu-data.js','export const categories = '+JSON.stringify(categories)+';\nexport const products = '+JSON.stringify(products,null,2)+';\n');
writeFileSync('assets/image-manifest.json',JSON.stringify({note:'Unique imagegen photographs saved locally. Generated food photography is illustrative; restaurant ingredients and portion appearance must be confirmed by the restaurant.',generated:products.filter(p=>p.assetStatus==='generated-unique').length,total:products.length,products},null,2));
console.log('Connected '+products.filter(p=>p.assetStatus==='generated-unique').length+' unique generated photographs.');
