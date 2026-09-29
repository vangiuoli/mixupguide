import type { Evidence } from './types';

const checked='2026-09-29', patch='V1.82';
const pages: Array<[string,string,string]> = [
 ['gojo','Honored One','honored-one'],['yuji','Vessel','vessel'],['hakari','Restless Gambler','restless-gambler'],
 ['megumi','Ten Shadows','ten-shadows'],['mahoraga','Mahoraga','mahoraga'],['mahito','Perfection','perfection'],
 ['choso','Blood Manipulator','blood-manipulator'],['todo','Switcher','switcher'],['higuruma','Defense Attorney','defense-attorney'],
 ['yuta','Cursed Partners','cursed-partners'],['mechamaru','Puppet Master','puppet-master'],['naoya','Head of the Hei','head-of-the-hei'],
 ['nanami','Salaryman','salaryman'],['ryu','True Cannon','true-cannon'],['hanami','Disaster Plants','disaster-plants'],
 ['reggie','Register','register'],['koguy','Locust Guy','locust-guy'],['yuki','Star Rage','star-rage'],
 ['charles','Aspiring Mangaka','aspiring-mangaka'],['haruta','Lucky Coward','lucky-coward'],['meimei','Crow Charmer','crow-charmer'],
 ['kurourushi','Black Death','black-death'],['uro','Sky Assassin','sky-assassin']
];
export const evidence: Evidence[] = [
 {id:'update-v182',sourceTitle:'JJS Update Log — V1.82',sourceUrl:'https://jujutsushenaniganswiki.com/wiki/update-log/v190-to-v181/',sourceSection:'V1.82',checkedAt:checked,patchOrVersion:patch,evidenceType:'official-update-log',supports:'Sky Assassin, Register and Disaster Plants changes shipped in V1.82.'},
 {id:'mechanics-current',sourceTitle:'JJS Controls & Mechanics',sourceUrl:'https://jujutsushenaniganswiki.com/wiki/controls-mechanics/',sourceSection:'Block, Ragdoll Cancel, Counters',checkedAt:checked,patchOrVersion:patch,evidenceType:'current-wiki',supports:'Universal blocking, evasive, attack-type and counter behavior.'},
 ...pages.map(([id,name,slug]):Evidence=>({id:`wiki-${id}`,sourceTitle:`${name} — current moveset`,sourceUrl:`https://jujutsushenaniganswiki.com/wiki/${slug}/`,sourceSection:'Information, Moveset, History',checkedAt:checked,patchOrVersion:patch,evidenceType:'current-wiki',supports:`Current ${name} health, move families, variants and documented defensive properties.`,...(id==='uro'||id==='reggie'?{expiresAt:'2026-10-13'}:{})})),
];

export const evidenceById = new Map(evidence.map(e=>[e.id,e]));
