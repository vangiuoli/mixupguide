export type VerificationStatus = 'verified-live'|'verified-documentation'|'corroborated'|'strategy'|'needs-live-test'|'stale'|'unknown';
export type BlockBehavior = 'unblockable'|'front-blockable'|'all-sides-blockable'|'semi-blockable'|'perfect-blockable'|'chip-through-block'|'domain'|'not-applicable'|'unknown';
export type DefensiveResponse = 'block'|'side-dash'|'backdash'|'jump'|'create-distance'|'close-distance'|'interrupt'|'do-not-challenge'|'evasive';
export type AttackType = 'melee'|'bullet'|'beam'|'explosion'|'swarm'|'domain'|'utility';
export type CounterResult = 'counterattack'|'parry-reflect'|'avoid-nullify'|'does-not-work'|'conditional';
export type ActivationCondition =
 | {kind:'default'} | {kind:'air'} | {kind:'high-air';minimumHeight?:number}
 | {kind:'hold';threshold?:string} | {kind:'special'} | {kind:'use-again'}
 | {kind:'use-twice'} | {kind:'use-thrice'} | {kind:'direction';direction:string}
 | {kind:'distance';rule:string} | {kind:'state';stateId:string}
 | {kind:'target-state';rule:string} | {kind:'other';description:string};

export interface Evidence {
 id:string; sourceTitle:string; sourceUrl:string; sourceSection:string; checkedAt:string;
 patchOrVersion:string; evidenceType:'official-update-log'|'current-wiki'|'live-test'|'video'|'community-strategy';
 supports:string; notes?:string; expiresAt?:string;
}
export interface CounterInteraction { abilityId:string; result:CounterResult; explanation:string }
export interface DefenderPlan {
 primaryResponse:DefensiveResponse; action:string; whyItWorks:string; timing:string;
 failureIfEarly:string; failureIfLate:string; exceptions:string[];
}
export interface MoveVariant {
 id:string; moveFamilyId:string; displayName:string; form:'base'|'awakening'|'super-awakening'|'special-form';
 activation:ActivationCondition[]; attackTypes:AttackType[]; blockBehavior:BlockBehavior; blockExplanation:string;
 interruptible:boolean|'conditional'|'unknown'; interruptExplanation:string;
 bypassesRagdoll:boolean|'conditional'|'unknown'; trueRagdoll?:boolean|'conditional';
 armorOrIFrames?:{melee?:boolean|'conditional';bullet?:boolean|'conditional';total?:boolean|'conditional';explanation:string};
 counterInteractions:CounterInteraction[]; visualTell:string; effectiveRange:string; defenderPlan:DefenderPlan;
 punish?:{condition:string;windowDescription:string;recommendedAction:string;liveTestRequired:boolean};
 evasive?:{canEscape:boolean|'conditional'|'unknown';timing:string;punishOpportunity?:string;failureCases:string[]};
 verification:VerificationStatus; lastVerified:string; patchOrVersion:string; evidenceIds:string[];
}
export interface MoveFamily { id:string; characterId:string; displayName:string; slot?:number|'special'|'passive'; variants:string[]; current:boolean }
export interface StrategyTip {
 id:string; title:string; action:string; whyItWorks:string; cueOrCondition:string; timingOrSpacing:string;
 commonFailure:string; exceptions:string[]; skillLevel:'beginner'|'intermediate'|'advanced'; verification:VerificationStatus; evidenceIds:string[];
}
export interface QuickItem { value:string; explanation:string }
export interface QuickPlan {
 spacing:QuickItem; threat:QuickItem; weakness:QuickItem; block:QuickItem; doNotBlock:QuickItem;
 dodge:QuickItem; saveEvasive:QuickItem; noEvasive:QuickItem; punish:QuickItem; awakening:QuickItem;
}
export interface Weakness { title:string; mechanic:string; exploit:string; verification:VerificationStatus; evidenceIds:string[] }
export interface Pattern { level:'beginner'|'experienced'; cue:string; opponentPlan:string; response:string; why:string }
export interface TroubleshootingEntry { id:string; label:string; cue:string; action:string; why:string; exception:string }
export interface Character {
 id:string; displayName:string; gameName:string; aliases:string[]; category:'regular'|'special-form';
 access:'public'|'early-access'|'base-only'|'summoned-form'; health:number; accent:string; initials:string;
 archetype:string; currentPatch:string; lastFullAudit:string; auditStatus:'current'|'short-expiry'|'needs-live-test';
 sourceEvidenceId:string; quickPlan:QuickPlan; weaknesses:Weakness[]; patterns:Pattern[];
 tips:StrategyTip[]; troubleshooting:TroubleshootingEntry[]; awakeningSummary:string; capabilities:string[];
}
export interface CounterAbility {
 id:string; name:string; owner:string; kind:'counterattack'|'parry-reflect'|'avoid-nullify'|'conditional';
 melee:CounterResult; bullet:CounterResult; swarm:CounterResult; explosion:CounterResult; domain:CounterResult;
 requirements:string; multiHitBehavior:string; evidenceIds:string[];
}
export interface MatchupGuide {
 playerCharacterId:string; opponentCharacterId:string; authored:boolean; summary:string;
 threeStepPlan:[{title:string;action:string;why:string},{title:string;action:string;why:string},{title:string;action:string;why:string}];
 neutral:string; approachOrKeepAway:string; playerToolsToPrioritize:string[]; playerToolsToAvoidThrowingRaw:string[];
 enemyMovesToBait:string[]; enemyMovesToBlock:string[]; enemyMovesToDodge:string[]; enemyMovesToPunish:string[];
 evasivePlan:string; noEvasivePlan:string; awakeningPlan:string; opponentAdaptation:string; likelyLossReasons:string[];
 verification:VerificationStatus; evidenceIds:string[];
}
