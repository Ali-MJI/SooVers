import type {DemoRole,CampusSpace,IncidentPhase} from './model';
/** Integration boundaries only. No network provider is wired into the local demo. */
export interface VerifiedIdentity {subject:string;displayName:string;role:DemoRole;allowedSpaces:CampusSpace[];}
export interface IdentityProvider {getVerifiedIdentity():Promise<VerifiedIdentity>;signOut():Promise<void>;}
export interface PresenceEvent {sessionId:string;subject:string;space:CampusSpace;position:[number,number,number];rotation:number;}
export interface PresenceProvider {join(space:CampusSpace):Promise<void>;leave():Promise<void>;subscribe(handler:(event:PresenceEvent)=>void):()=>void;}
export interface TrainingEvent {sessionId:string;scenarioId:string;kind:'alert'|'evidence'|'decision'|'outcome';at:string;data:Record<string,unknown>;}
export interface IsolatedLabProvider {provision(scenarioId:string):Promise<{sessionId:string}>;subscribe(sessionId:string,callback:(event:TrainingEvent)=>void):()=>void;submitDecision(sessionId:string,action:string):Promise<{phase:IncidentPhase}>;release(sessionId:string):Promise<void>;}
export const capabilityStatus={spatialNavigation:'implemented',whiteboard:'implemented',slides:'implemented',localScenario:'implemented',localAssessment:'implemented',demoRoles:'prototype',avatars:'prototype',hostAgent:'scripted-prototype',multiuser:'planned',voice:'planned',authentication:'planned',splunk:'planned',cyberRange:'planned',liveVideo:'planned',educationWebXR:'planned'} as const;
