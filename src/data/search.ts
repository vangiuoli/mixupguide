import type { Character, MoveVariant } from './types';
import { characters } from './roster';
import { moveVariants } from './moves';
export type SearchResult={kind:'character';character:Character}|{kind:'move';move:MoveVariant;character:Character}|{kind:'matchup';player:Character;enemy:Character};
const names=(c:Character)=>[c.displayName,c.gameName,...c.aliases].map(x=>x.toLowerCase());
const mentioned=(q:string)=>characters.filter(c=>names(c).some(n=>q.includes(n)));
export function parseSearch(input:string):SearchResult[]{
 const q=input.trim().toLowerCase(); if(!q)return[]; const found=mentioned(q); const results:SearchResult[]=[];
 const vs=q.match(/(.+?)\s+vs\.?\s+(.+)/); const as=q.match(/(?:beat|counter|fight)\s+(.+?)\s+as\s+(.+)/);
 if(vs||as){const playerText=(as?.[2]??vs?.[1]??'').trim(),enemyText=(as?.[1]??vs?.[2]??'').trim();const player=characters.find(c=>c.category==='regular'&&names(c).some(n=>playerText.includes(n)||n.includes(playerText)));const enemy=characters.find(c=>names(c).some(n=>enemyText.includes(n)||n.includes(enemyText)));if(player&&enemy)results.push({kind:'matchup',player,enemy});}
 for(const c of found)results.push({kind:'character',character:c});
 for(const m of moveVariants){const familyWords=m.displayName.toLowerCase();if(familyWords.includes(q)||q.includes(familyWords)||q.split(/\s+/).filter(x=>x.length>3).every(x=>familyWords.includes(x)||['what','blockable','against','does'].includes(x))){const family=m.moveFamilyId.split('-')[0];const c=characters.find(x=>x.id===family);if(c)results.push({kind:'move',move:m,character:c});}}
 return results.filter((r,i,a)=>a.findIndex(x=>x.kind===r.kind&&('move'in x?x.move.id:'character'in x?x.character.id:`${x.player.id}-${x.enemy.id}`)===('move'in r?r.move.id:'character'in r?r.character.id:`${r.player.id}-${r.enemy.id}`))===i).slice(0,12);
}
