export type EligibilityStatus = "eligible" | "partial" | "ineligible";

export interface GrantRequirement {
  label: string;
  met: boolean;
}

export interface Grant {
  id: string;
  name: string;
  funder: string;
  amount: { min: number; max: number };
  deadline: string;
  deadlineDate: Date;
  focus: string[];
  eligibleOrgs: string[];
  locationRestriction: string | null;
  description: string;
  applicationUrl: string;
  requiredDocuments: string[];
  priorityAreas: string[];
  complexity: "low" | "medium" | "high";
  turnaroundWeeks: number;
}

export const HARVEST_TOUCH_PROFILE = {
  orgType: "CIC",
  location: "Rochdale, Greater Manchester",
  region: "North West England",
  focusAreas: ["youth", "wellbeing", "skills", "digital", "mental health", "community"],
  beneficiaries: ["young people", "8-16", "16-25", "NEET", "disadvantaged communities"],
  annualTurnover: 25000,
  programmes: [
    "6-Week Wellbeing Programme",
    "AI & Digital Skills Training",
    "Future Skills Lab",
    "Community Engagement Activities",
  ],
  documents: {
    safeguardingPolicy: true,
    bankAccount: true,
    constitutionOrArticles: true,
    annualAccounts: true,
    equalitiesPolicy: true,
  },
  founded: 2023,
};

export const GRANTS: Grant[] = [
  {
    id: "nclf-awards-for-all",
    name: "Awards for All (England)",
    funder: "National Lottery Community Fund",
    amount: { min: 300, max: 10000 },
    deadline: "Rolling",
    deadlineDate: new Date("2026-12-31"),
    focus: ["community", "youth", "wellbeing", "skills", "mental health"],
    eligibleOrgs: ["CIC", "charity", "voluntary group", "social enterprise"],
    locationRestriction: null,
    description:
      "Funding for community projects that bring people together and improve local life. Ideal for small organisations delivering direct community benefit.",
    applicationUrl: "https://www.tnlcommunityfund.org.uk/funding/programmes/awards-for-all-england",
    requiredDocuments: [
      "Bank statement (3 months)",
      "Governing document",
      "Safeguarding policy",
      "Two signatories",
    ],
    priorityAreas: ["mental health", "community cohesion", "skills & employment", "young people"],
    complexity: "low",
    turnaroundWeeks: 8,
  },
  {
    id: "nclf-reaching-communities",
    name: "Reaching Communities",
    funder: "National Lottery Community Fund",
    amount: { min: 10000, max: 500000 },
    deadline: "Rolling",
    deadlineDate: new Date("2026-12-31"),
    focus: ["community", "youth", "wellbeing", "social inclusion"],
    eligibleOrgs: ["CIC", "charity", "voluntary org"],
    locationRestriction: null,
    description:
      "Larger grants for organisations working with communities facing the most disadvantage. Multi-year funding available for sustained programmes.",
    applicationUrl: "https://www.tnlcommunityfund.org.uk/funding/programmes/reaching-communities-england",
    requiredDocuments: [
      "Full accounts (last 2 years)",
      "Organisational policies",
      "Detailed project plan",
      "Evidence of community need",
      "Monitoring & evaluation framework",
    ],
    priorityAreas: ["disadvantaged communities", "youth", "health & wellbeing"],
    complexity: "high",
    turnaroundWeeks: 26,
  },
  {
    id: "sport-england-together-fund",
    name: "Together Fund",
    funder: "Sport England",
    amount: { min: 300, max: 15000 },
    deadline: "Rolling",
    deadlineDate: new Date("2026-09-30"),
    focus: ["sport", "wellbeing", "youth", "community", "physical activity"],
    eligibleOrgs: ["CIC", "charity", "community group", "sport club"],
    locationRestriction: null,
    description:
      "Helping organisations get more people active, especially those who face the most barriers. Supports innovative approaches to sport and physical activity.",
    applicationUrl: "https://www.sportengland.org/apply-for-funding",
    requiredDocuments: ["Governing document", "Bank account details", "Project outline"],
    priorityAreas: ["inactive people", "disadvantaged communities", "young people"],
    complexity: "low",
    turnaroundWeeks: 10,
  },
  {
    id: "action-together-community",
    name: "Community Grants Programme",
    funder: "Action Together (Oldham & Rochdale)",
    amount: { min: 500, max: 5000 },
    deadline: "31 Jul 2026",
    deadlineDate: new Date("2026-07-31"),
    focus: ["community", "youth", "wellbeing", "skills"],
    eligibleOrgs: ["CIC", "charity", "voluntary group", "community group"],
    locationRestriction: "Oldham or Rochdale",
    description:
      "Local grants for Oldham and Rochdale based organisations. Strong preference for Rochdale CICs delivering grassroots community benefit.",
    applicationUrl: "https://www.actiontogether.org.uk/grants",
    requiredDocuments: ["Governing document", "Bank statement", "Brief project plan"],
    priorityAreas: ["local community", "youth engagement", "wellbeing"],
    complexity: "low",
    turnaroundWeeks: 6,
  },
  {
    id: "bbc-children-in-need",
    name: "Small Grants Programme",
    funder: "BBC Children in Need",
    amount: { min: 300, max: 10000 },
    deadline: "15 Sep 2026",
    deadlineDate: new Date("2026-09-15"),
    focus: ["children", "youth", "wellbeing", "disadvantage", "mental health"],
    eligibleOrgs: ["CIC", "charity", "voluntary org"],
    locationRestriction: null,
    description:
      "Supporting organisations that help disadvantaged children aged 18 and under in the UK. Focus on mental health, disability, poverty and disadvantage.",
    applicationUrl: "https://www.bbcchildreninneed.co.uk/grants/",
    requiredDocuments: [
      "Governing document",
      "Latest accounts",
      "Safeguarding policy",
      "Child protection policy",
    ],
    priorityAreas: ["disadvantaged children", "mental health", "disability", "poverty"],
    complexity: "medium",
    turnaroundWeeks: 16,
  },
  {
    id: "power-to-change",
    name: "Community Business Fund",
    funder: "Power to Change",
    amount: { min: 50000, max: 300000 },
    deadline: "30 Jun 2026",
    deadlineDate: new Date("2026-06-30"),
    focus: ["community business", "social enterprise", "community ownership"],
    eligibleOrgs: ["CIC", "community benefit society", "charity trading"],
    locationRestriction: "England",
    description:
      "Supports community businesses to grow and become more resilient. For organisations with community ownership at their heart.",
    applicationUrl: "https://www.powertochange.org.uk/get-support/programmes/",
    requiredDocuments: [
      "Business plan",
      "3-year financial projections",
      "Community governance evidence",
      "Evidence of trading income",
    ],
    priorityAreas: ["community ownership", "economic resilience", "local assets"],
    complexity: "high",
    turnaroundWeeks: 20,
  },
  {
    id: "youth-united-foundation",
    name: "Youth Engagement Fund",
    funder: "Youth United Foundation",
    amount: { min: 5000, max: 50000 },
    deadline: "1 Aug 2026",
    deadlineDate: new Date("2026-08-01"),
    focus: ["youth", "skills", "volunteering", "community"],
    eligibleOrgs: ["CIC", "charity", "youth org"],
    locationRestriction: "England",
    description:
      "Building youth-led organisations and strengthening the sector. Priority for organisations engaging young people from underserved communities.",
    applicationUrl: "https://youthunited.org.uk",
    requiredDocuments: [
      "Governing document",
      "Accounts",
      "Youth leadership evidence",
      "Programme outcomes data",
    ],
    priorityAreas: ["youth leadership", "skills development", "volunteering", "underserved communities"],
    complexity: "medium",
    turnaroundWeeks: 14,
  },
  {
    id: "henry-smith-charity",
    name: "Core Costs Grant",
    funder: "Henry Smith Charity",
    amount: { min: 5000, max: 30000 },
    deadline: "Rolling",
    deadlineDate: new Date("2026-12-31"),
    focus: ["community", "poverty", "disadvantage", "wellbeing", "youth"],
    eligibleOrgs: ["CIC", "charity"],
    locationRestriction: null,
    description:
      "Core cost funding for organisations helping people overcome poverty, disadvantage and social exclusion. Supports running costs, not just projects.",
    applicationUrl: "https://www.henrysmithcharity.org.uk/apply-for-a-grant/",
    requiredDocuments: ["Governing document", "Full accounts", "Strategic plan", "Staff structure"],
    priorityAreas: ["poverty relief", "social inclusion", "disadvantaged communities"],
    complexity: "medium",
    turnaroundWeeks: 20,
  },
  {
    id: "digital-skills-gm",
    name: "Greater Manchester Digital Skills Fund",
    funder: "Greater Manchester Combined Authority",
    amount: { min: 2000, max: 20000 },
    deadline: "30 Sep 2026",
    deadlineDate: new Date("2026-09-30"),
    focus: ["digital skills", "employment", "youth", "technology", "AI"],
    eligibleOrgs: ["CIC", "charity", "social enterprise", "voluntary org"],
    locationRestriction: "Greater Manchester",
    description:
      "Funding digital skills programmes across Greater Manchester. Priority for organisations upskilling young people and adults facing digital exclusion.",
    applicationUrl: "https://www.greatermanchester-ca.gov.uk",
    requiredDocuments: [
      "Governing document",
      "Bank statement",
      "Programme curriculum outline",
      "Tutor/facilitator CVs",
    ],
    priorityAreas: ["digital exclusion", "youth employment", "AI literacy", "future skills"],
    complexity: "medium",
    turnaroundWeeks: 10,
  },
  {
    id: "comic-relief-active-communities",
    name: "Active Communities Fund",
    funder: "Comic Relief",
    amount: { min: 1000, max: 20000 },
    deadline: "15 Oct 2026",
    deadlineDate: new Date("2026-10-15"),
    focus: ["community", "wellbeing", "mental health", "youth", "social inclusion"],
    eligibleOrgs: ["CIC", "charity", "community group"],
    locationRestriction: null,
    description:
      "Supporting community-led approaches to tackling mental health and wellbeing challenges. Emphasis on lived experience leadership.",
    applicationUrl: "https://www.comicrelief.com/funding/active-communities/",
    requiredDocuments: [
      "Governing document",
      "Financial information",
      "Equality & diversity policy",
      "Project outline",
    ],
    priorityAreas: ["mental health", "lived experience", "community-led", "young people"],
    complexity: "medium",
    turnaroundWeeks: 16,
  },
  {
    id: "ukspf-rochdale",
    name: "UK Shared Prosperity Fund (Rochdale)",
    funder: "Rochdale Borough Council / GMCA",
    amount: { min: 5000, max: 75000 },
    deadline: "31 May 2026",
    deadlineDate: new Date("2026-05-31"),
    focus: ["skills", "employment", "community", "youth", "social inclusion"],
    eligibleOrgs: ["CIC", "charity", "social enterprise", "community org"],
    locationRestriction: "Rochdale Borough",
    description:
      "Levelling-up investment for Rochdale communities. Priority for projects addressing economic inactivity, skills gaps, and community regeneration.",
    applicationUrl: "https://www.rochdale.gov.uk/community/grants",
    requiredDocuments: [
      "Governing document",
      "Latest accounts",
      "Project delivery plan",
      "Budget breakdown",
      "Monitoring framework",
    ],
    priorityAreas: ["economic inactivity", "skills", "community regeneration", "young people"],
    complexity: "medium",
    turnaroundWeeks: 12,
  },
  {
    id: "tudor-trust",
    name: "Tudor Trust General Fund",
    funder: "Tudor Trust",
    amount: { min: 1000, max: 20000 },
    deadline: "Rolling",
    deadlineDate: new Date("2026-12-31"),
    focus: ["community", "disadvantage", "wellbeing", "social change"],
    eligibleOrgs: ["CIC", "charity", "community org"],
    locationRestriction: null,
    description:
      "Funding for small organisations working with people on the margins of society. Values relationships, trust and long-term impact over short-term outputs.",
    applicationUrl: "https://www.tudortrust.org.uk/apply",
    requiredDocuments: ["Governing document", "Accounts", "Brief description of work"],
    priorityAreas: ["marginalised communities", "social change", "community wellbeing"],
    complexity: "low",
    turnaroundWeeks: 12,
  },
];
