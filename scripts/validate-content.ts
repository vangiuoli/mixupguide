import assert from 'node:assert/strict';
import { characters,regularCharacters,evidence,moveFamilies,moveVariants,matchups } from '../src/data/content';
import { parseSearch } from '../src/data/search';

const unique=(xs:string[],label:string)=>assert.equal(new Set(xs).size,xs.length,`${label} IDs must be unique`);
unique(characters.map(c=>c.id),'character'); unique(moveFamilies.map(f=>f.id),'family'); unique(moveVariants.map(v=>v.id),'variant');
const charIds=new Set(characters.map(c=>c.id)),familyIds=new Set(moveFamilies.map(f=>f.id)),evidenceIds=new Set(evidence.map(e=>e.id));
for(const f of moveFamilies){assert(charIds.has(f.characterId),`${f.id} has invalid character`);assert(f.variants.length>0,`${f.id} has no variants`)}
for(const v of moveVariants){assert(familyIds.has(v.moveFamilyId),`${v.id} has invalid family`);assert(v.evidenceIds.length>0,`${v.id} lacks evidence`);v.evidenceIds.forEach(id=>assert(evidenceIds.has(id),`${v.id} invalid evidence ${id}`));assert(v.blockBehavior!=='unknown',`${v.id} exposes unknown block behavior`);assert(v.defenderPlan.action&&v.defenderPlan.whyItWorks&&v.defenderPlan.timing&&v.defenderPlan.failureIfEarly,`${v.id} has incomplete plan`)}
for(const c of characters){assert(c.quickPlan&&c.weaknesses.length&&c.tips.length===3&&c.troubleshooting.length,`${c.id} profile incomplete`);assert(moveFamilies.some(f=>f.characterId===c.id),`${c.id} has no move coverage`);for(const t of c.tips)assert(t.action&&t.whyItWorks&&t.cueOrCondition&&t.timingOrSpacing&&t.commonFailure,`${t.id} incomplete`)}
assert(!moveFamilies.some(f=>/revolve/i.test(f.displayName)),'Removed Yuta move Revolve is present');
const variants=(family:string)=>moveVariants.filter(v=>v.moveFamilyId===family);
assert.equal(variants('gojo-rapid-punches')[0]?.blockBehavior,'unblockable','Rapid Punches regression');
assert.deepEqual(variants('yuji-cursed-strikes').map(v=>v.blockBehavior),['all-sides-blockable','unblockable'],'Cursed Strikes variants collapsed');
assert.deepEqual(variants('yuji-crushing-blow').map(v=>v.blockBehavior),['unblockable','all-sides-blockable','semi-blockable'],'Crushing Blow variants collapsed');
assert.equal(variants('hanami-root-swarm')[0]?.blockBehavior,'unblockable','Root Swarm regression');
assert.equal(variants('uro-thin-ice-breaker')[0]?.blockBehavior,'unblockable','Thin Ice Breaker regression');
assert.equal(characters.find(c=>c.id==='uro')?.health,100,'Uro HP regression');
assert(characters.some(c=>c.id==='mahoraga'&&c.category==='special-form'),'Mahoraga special page missing');
assert(characters.find(c=>c.id==='ryu')?.quickPlan.weakness.value.includes('Overheat'),'Ryu Overheat missing');
assert.equal(regularCharacters.length,22,'Normal roster must contain 22 characters');
assert.equal(matchups.length,506,'Expected 484 regular matchups + 22 Mahoraga guides');unique(matchups.map(m=>`${m.playerCharacterId}>${m.opponentCharacterId}`),'matchup');
for(const q of ['yuji vs todo','how to beat naoya as yuji','rapid punches','what do I block against choso','mahoraga','uro temper','root swarm blockable'])assert(parseSearch(q).length>0,`Search failed: ${q}`);
assert(!evidence.some(e=>/^https:\/\/www\.reddit\.com\/r\/[^/]+\/?$/.test(e.sourceUrl)),'Generic subreddit evidence is forbidden');
const banned=['stay mobile','wait for an opening','punish mistakes','use your strengths','keep pressure','be careful','play patiently'];
for(const c of characters){const visible=JSON.stringify(c).toLowerCase();for(const phrase of banned)assert(!visible.includes(phrase),`${c.id} contains generic filler: ${phrase}`)}
console.log(`Content validation passed: ${characters.length} characters, ${moveFamilies.length} families, ${moveVariants.length} variants, ${matchups.length} matchups, ${evidence.length} evidence records.`);
