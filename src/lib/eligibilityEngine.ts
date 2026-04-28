import { Grant, HARVEST_TOUCH_PROFILE, EligibilityStatus, GrantRequirement } from "./grantData";

export interface ScoredGrant extends Grant {
  score: number;
  eligibility: EligibilityStatus;
  matchReasons: string[];
  warnings: string[];
  requirements: GrantRequirement[];
}

function daysUntilDeadline(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function scoreGrant(grant: Grant): ScoredGrant {
  let score = 0;
  const matchReasons: string[] = [];
  const warnings: string[] = [];

  // Org type match (+20)
  const orgTypeMatch = grant.eligibleOrgs.some(
    (o) => o.toLowerCase() === HARVEST_TOUCH_PROFILE.orgType.toLowerCase()
  );
  if (orgTypeMatch) {
    score += 20;
    matchReasons.push("CIC is an eligible organisation type");
  } else {
    score -= 20;
    warnings.push("Organisation type may not be eligible");
  }

  // Location match (+15 for exact, +8 for regional)
  if (!grant.locationRestriction) {
    score += 10;
    matchReasons.push("No location restriction — open to all UK");
  } else if (
    grant.locationRestriction.toLowerCase().includes("rochdale") ||
    grant.locationRestriction.toLowerCase().includes("oldham")
  ) {
    score += 15;
    matchReasons.push(`Location match: ${grant.locationRestriction}`);
  } else if (
    grant.locationRestriction.toLowerCase().includes("greater manchester") ||
    grant.locationRestriction.toLowerCase().includes("north west")
  ) {
    score += 12;
    matchReasons.push(`Regional match: ${grant.locationRestriction}`);
  } else if (
    grant.locationRestriction.toLowerCase().includes("england") ||
    grant.locationRestriction.toLowerCase().includes("uk")
  ) {
    score += 8;
    matchReasons.push("England-wide eligibility");
  } else {
    score -= 15;
    warnings.push(`Location restriction: ${grant.locationRestriction}`);
  }

  // Focus area match (+30 max)
  const profileFocus = HARVEST_TOUCH_PROFILE.focusAreas;
  const focusMatches = grant.focus.filter((f) =>
    profileFocus.some((pf) => pf.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(pf.toLowerCase()))
  );
  const focusScore = Math.min(30, focusMatches.length * 8);
  score += focusScore;
  if (focusMatches.length > 0) {
    matchReasons.push(`Programme focus matches: ${focusMatches.slice(0, 3).join(", ")}`);
  }

  // Funding size fit (+10 if under £25k max is reasonable, +5 if micro)
  if (grant.amount.max <= 10000) {
    score += 10;
    matchReasons.push(`Ideal funding size for new CIC (up to £${grant.amount.max.toLocaleString()})`);
  } else if (grant.amount.max <= 25000) {
    score += 7;
    matchReasons.push(`Good funding fit (up to £${grant.amount.max.toLocaleString()})`);
  } else if (grant.amount.min <= 10000) {
    score += 4;
    matchReasons.push("Minimum amount accessible, larger amounts available");
  }

  // Deadline urgency (+5 for urgent, -5 if already passed)
  const days = daysUntilDeadline(grant.deadlineDate);
  if (days < 0) {
    score -= 10;
    warnings.push("Deadline has passed");
  } else if (days <= 30) {
    score += 5;
    matchReasons.push(`Urgent deadline: ${days} days remaining`);
  } else if (days <= 90) {
    score += 3;
  }

  // Complexity penalty
  if (grant.complexity === "high") {
    score -= 10;
    warnings.push("High complexity application — consider capacity");
  } else if (grant.complexity === "low") {
    score += 5;
    matchReasons.push("Simple, accessible application process");
  }

  // Priority areas alignment (+10 if strong match)
  const priorityMatches = grant.priorityAreas.filter((pa) =>
    HARVEST_TOUCH_PROFILE.focusAreas.some(
      (fa) => fa.toLowerCase().includes(pa.toLowerCase()) || pa.toLowerCase().includes(fa.toLowerCase())
    )
  );
  if (priorityMatches.length >= 2) {
    score += 10;
    matchReasons.push(`Strong priority area alignment: ${priorityMatches.slice(0, 2).join(", ")}`);
  } else if (priorityMatches.length === 1) {
    score += 5;
  }

  // Clamp score to 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine eligibility status
  let eligibility: EligibilityStatus;
  if (score >= 70) {
    eligibility = "eligible";
  } else if (score >= 45) {
    eligibility = "partial";
  } else {
    eligibility = "ineligible";
  }

  // Build requirements checklist
  const requirements: GrantRequirement[] = grant.requiredDocuments.map((doc) => {
    const docLower = doc.toLowerCase();
    let met = false;
    if (docLower.includes("safeguarding")) met = HARVEST_TOUCH_PROFILE.documents.safeguardingPolicy;
    else if (docLower.includes("bank")) met = HARVEST_TOUCH_PROFILE.documents.bankAccount;
    else if (docLower.includes("governing") || docLower.includes("constitution") || docLower.includes("articles"))
      met = HARVEST_TOUCH_PROFILE.documents.constitutionOrArticles;
    else if (docLower.includes("accounts") || docLower.includes("financial"))
      met = HARVEST_TOUCH_PROFILE.documents.annualAccounts;
    else if (docLower.includes("equalit")) met = HARVEST_TOUCH_PROFILE.documents.equalitiesPolicy;
    else met = true; // assume can be prepared
    return { label: doc, met };
  });

  return {
    ...grant,
    score,
    eligibility,
    matchReasons,
    warnings,
    requirements,
  };
}

export function scoreAllGrants(grants: Grant[]): ScoredGrant[] {
  return grants
    .map(scoreGrant)
    .sort((a, b) => b.score - a.score);
}

export function getTopGrants(grants: Grant[], count = 3): ScoredGrant[] {
  return scoreAllGrants(grants).slice(0, count);
}

export function formatAmount(min: number, max: number): string {
  if (min === max) return `£${min.toLocaleString()}`;
  return `£${min.toLocaleString()} – £${max.toLocaleString()}`;
}

export function getDaysUntilDeadline(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function getDeadlineLabel(grant: Grant): string {
  if (grant.deadline === "Rolling") return "Rolling";
  const days = getDaysUntilDeadline(grant.deadlineDate);
  if (days < 0) return "Closed";
  if (days === 0) return "Today!";
  if (days <= 7) return `${days}d left`;
  if (days <= 30) return `${days}d left`;
  return grant.deadline;
}
