export type Confidence = 'verified' | 'high' | 'community' | 'experimental';
export type Access = 'public' | 'early-access' | 'base-only';
export type Response = 'block'|'sideDash'|'backDash'|'jump'|'evasive'|'interrupt'|'counter'|'space';
export interface Source { id:string; title:string; url:string; checked:string; patch?:string }
export interface Tip { title:string; body:string; confidence:Confidence; sourceIds:string[] }
export interface MoveCounter { id:string; moveName:string; characterId:string; form:'base'|'awakening'; attackType:'melee'|'bullet'|'beam'|'swarm'|'explosion'|'domain'|'other'; blockable:boolean|'partial'|'unknown'; guardBreak:boolean|'conditional'|'unknown'; recommendedResponse:Response; tell:string; counterStrategy:string; avoid:string; evasiveTiming?:string; punishWindow?:string; confidence:Confidence; sourceIds:string[] }
export interface Character { id:string; displayName:string; gameName:string; aliases:string[]; access:Access; status:string; accent:string; initials:string; playstyle:string[]; range:string; biggestWeakness:string; block:string; dodge:string; evasive:string; punish:string; awakening:string; topTips:Tip[]; weaknesses:Tip[]; patterns:{level:'Beginner'|'Experienced'; theyTry:string; youDo:string}[]; trouble:Record<string,string>; moveIds:string[]; lastVerified:string; patch:string }
