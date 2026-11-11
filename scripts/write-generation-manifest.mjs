import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {products} from '../js/menu-data.js';
const records=new Map(JSON.parse(readFileSync('assets/initial-generation-prompts.json','utf8')).map(r=>[r.id,r]));
for(const filename of readdirSync('assets/images/generated').filter(f=>f.endsWith('.prompt.json'))){const r=JSON.parse(readFileSync('assets/images/generated/'+filename,'utf8'));records.set(r.id,r);}
const final=products.map(p=>({...records.get(p.id),id:p.id,name:p.name,path:p.image}));
for(const p of final)if(!p.prompt)throw Error('Missing generation prompt for '+p.name);
writeFileSync('assets/generation-prompts.json',JSON.stringify({tool:'Built-in image_gen.imagegen',note:'Final retained per-product prompts. Photographs illustrate the menu and are saved locally as optimized WebP. Transparent background was requested for supplement cutouts.',products:final},null,2));console.log('Saved final prompt set for '+final.length+' generated product assets.');
