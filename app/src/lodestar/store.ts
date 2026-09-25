// Lodestar: small shared state between panels (latest model brief).

export interface BriefOption { action: string; cost: string; protects: string; regulatory_time: string; confidence: string }
export interface BriefDecision { title: string; why: string; owner_function: string; decide_by: string; evidence_ids: string[]; options: BriefOption[] }

let decisions: BriefDecision[] = [];

export function setBriefDecisions(d: BriefDecision[]): void {
  decisions = d;
}

/** Decisions from the latest brief that rest on this hotspot. */
export function decisionsFor(hotspotId: string): BriefDecision[] {
  return decisions.filter((d) => d.evidence_ids?.includes(hotspotId));
}
