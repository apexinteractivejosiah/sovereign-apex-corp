export type PortalId = 'home' | 'solutions' | 'client' | 'employee' | 'director' | 'ceo';

export type PracticeDivisionId =
  | '01. Corporate Strategy & M&A'
  | '02. Enterprise Systems Architecture'
  | '03. Luxury Brand & Industrial Design'
  | '04. Private Equity Operations';

export type TeamSizeOption =
  | 'Dedicated Pod of 3'
  | 'Full Department of 8'
  | 'Enterprise Taskforce of 15';

export type EmployeeRoleTitle =
  | 'Principal Systems Architect'
  | 'Senior Financial Analyst'
  | 'Lead Product Designer'
  | 'Client Account Manager';

export type DeliverableStageName =
  | 'Discovery & Audit'
  | 'Architecture Blueprint'
  | 'Executive Prototype'
  | 'Global Rollout'
  | 'Quarterly Optimization';

export type DeliverableStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Ready for Client Review'
  | 'Approved';

export interface DeliverableStage {
  id: string;
  stageNumber: number;
  name: DeliverableStageName;
  status: DeliverableStatus;
  ownerRole: EmployeeRoleTitle;
  ownerName: string;
  hoursLogged: number;
  summary: string;
  updatedAt: string;
}

export interface ClientMessage {
  id: string;
  senderName: string;
  senderRole: 'Client Executive' | 'Practice Director' | 'Client Account Manager' | 'CEO Office';
  timestamp: string;
  content: string;
}

export interface InvoiceRecord {
  id: string;
  period: string;
  amountUsd: number;
  status: 'Paid' | 'Pending Approval' | 'Scheduled';
  dueDate: string;
}

export interface RetainerContract {
  id: string; // e.g., SAC-4010, SAC-3892, SAC-5092
  clientName: string;
  executiveSponsor: string;
  sponsorTitle: string;
  division: PracticeDivisionId;
  teamSize: TeamSizeOption;
  durationMonths: number;
  monthlyRetainerUsd: number;
  totalContractValueUsd: number;
  status: 'Active Execution' | 'Executive Review' | 'Completed' | 'Priority Escalated';
  practiceDirector: string;
  assignedEmployeeIds: string[];
  selectedModules: string[];
  deliverables: DeliverableStage[];
  progressPercent: number;
  invoices: InvoiceRecord[];
  messages: ClientMessage[];
  createdAt: string;
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: EmployeeRoleTitle;
  division: PracticeDivisionId;
  location: 'New York' | 'London' | 'Zurich' | 'Singapore';
  compensationTier: 'Tier I — Managing Principal' | 'Tier II — Senior Partner Track' | 'Tier III — Executive Specialist';
  annualBaseUsd: number;
  utilizationPercent: number;
  billableHoursYtd: number;
  securityClearance: string;
}

export interface PtoRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: EmployeeRoleTitle;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  coverageSpecialist: string;
  status: 'Pending HR Approval' | 'Approved' | 'Declined';
  submittedAt: string;
}

export interface ExecutiveDirective {
  id: string;
  title: string;
  category: 'Capital Allocation' | 'Global Governance' | 'Practice Mandate' | 'Organizational Architecture';
  priority: 'Immediate Mandate' | 'Quarterly Directive' | 'Board Resolution';
  content: string;
  author: string;
  publishedAt: string;
  targetPortals: ('employee' | 'director' | 'client')[];
}

export interface SovereignVerifiedAsset {
  id: string;
  label:
    | 'Sovereign Global Tower — New York & London Headquarters'
    | '54th Floor Executive Boardroom & Strategy Suite'
    | 'Principal Engineering & Design Floor'
    | 'Private Client Briefing & Hospitality Lounge';
  url: string;
  city: 'New York' | 'London' | 'Zurich' | 'Singapore';
  address: string;
  floorCount: string;
  architecturalNote: string;
}

export const VERIFIED_CORPORATE_ASSETS: SovereignVerifiedAsset[] = [
  {
    id: 'asset-hq',
    label: 'Sovereign Global Tower — New York & London Headquarters',
    url: '/assets/images/sovereign-tower.jpg',
    city: 'New York',
    address: '425 Park Avenue, Floors 48–56, Manhattan, NY 10022',
    floorCount: '9 Dedicated Sovereign Floors',
    architecturalNote: 'Diagrid structural steel and triple-glazed low-iron curtain wall housing North American M&A and Capital Markets command.'
  },
  {
    id: 'asset-boardroom',
    label: '54th Floor Executive Boardroom & Strategy Suite',
    url: '/assets/images/executive-boardroom.jpg',
    city: 'London',
    address: '22 Bishopsgate, Level 54, Financial District, London EC2N 4BQ',
    floorCount: 'Level 54 Sovereign Governance Wing',
    architecturalNote: 'Acoustic double-glazed obsidian partition suite engineered for cross-border sovereign wealth and FTSE-100 board restructurings.'
  },
  {
    id: 'asset-engineering',
    label: 'Principal Engineering & Design Floor',
    url: '/assets/images/engineering-floor.jpg',
    city: 'Zurich',
    address: 'Bahnhofstrasse 64, 8001 Zürich, Switzerland',
    floorCount: 'Floors 12–16 Systems & Industrial Lab',
    architecturalNote: 'Open-span architectural studio for distributed core banking architecture, institutional ERP design, and precision hardware prototyping.'
  },
  {
    id: 'asset-lounge',
    label: 'Private Client Briefing & Hospitality Lounge',
    url: '/assets/images/client-lounge.jpg',
    city: 'Singapore',
    address: '8 Marina Boulevard, Tower 1, Level 42, Marina Bay, Singapore 018981',
    floorCount: 'Level 42 Private Diplomatic Sanctuary',
    architecturalNote: 'Warm-lit bronze and travertine executive salon for confidential APAC family office briefings and post-merger integration summits.'
  }
];

export interface PracticeDivisionSpec {
  id: PracticeDivisionId;
  shortCode: string;
  tagline: string;
  description: string;
  baseMonthlyUsd: number;
  leadDirector: string;
  directorTitle: string;
  keyOutcomes: string[];
  deliverableModules: {
    id: string;
    name: string;
    monthlyAddonUsd: number;
    description: string;
  }[];
}

export const PRACTICE_DIVISIONS: PracticeDivisionSpec[] = [
  {
    id: '01. Corporate Strategy & M&A',
    shortCode: 'STRAT-MA',
    tagline: 'Cross-border acquisition architecture, valuation modeling, and post-merger sovereign integration.',
    description:
      'Advising Fortune-500 boards and sovereign funds on transformative mergers, divestitures, defensive capital structuring, and 100-day synergy realization.',
    baseMonthlyUsd: 165000,
    leadDirector: 'Victoria Sterling',
    directorTitle: 'Managing Director, Global M&A Advisory',
    keyOutcomes: [
      '$6.4B average transaction enterprise value advised across 18 jurisdictions',
      '94% synergy target realization within 6 months of deal closure',
      'Dedicated regulatory clearance & antitrust economic modeling pod'
    ],
    deliverableModules: [
      {
        id: 'mod-dd',
        name: 'Buy-Side & Sell-Side Commercial Due Diligence',
        monthlyAddonUsd: 35000,
        description: 'Comprehensive quality-of-earnings, market share resilience, and customer cohort attrition audits.'
      },
      {
        id: 'mod-pmi',
        name: '100-Day Post-Merger Operating Model Blueprint',
        monthlyAddonUsd: 42000,
        description: 'Day-one governance charter, executive retention structuring, and ERP consolidation roadmap.'
      },
      {
        id: 'mod-cap',
        name: 'Sovereign Debt & Capital Structure Optimization',
        monthlyAddonUsd: 38000,
        description: 'Covenant restructuring, institutional syndicate pitch architecture, and treasury liquidity modeling.'
      }
    ]
  },
  {
    id: '02. Enterprise Systems Architecture',
    shortCode: 'SYS-ARCH',
    tagline: 'Zero-downtime core infrastructure, multi-region cloud topology, and institutional ERP consolidation.',
    description:
      'Engineering resilient, high-throughput digital backbones for multinational financial institutions, logistics conglomerates, and defense-grade enterprises.',
    baseMonthlyUsd: 185000,
    leadDirector: 'Marcus Vance',
    directorTitle: 'Managing Director, Enterprise Architecture',
    keyOutcomes: [
      '99.999% mission-critical availability across distributed global ledger nodes',
      '38% reduction in legacy mainframe and cloud egress operating expenditure',
      'ISO-27001 & SOC-2 Type II zero-trust identity fabric deployment'
    ],
    deliverableModules: [
      {
        id: 'mod-erp',
        name: 'Global ERP & Treasury Core Unification',
        monthlyAddonUsd: 48000,
        description: 'Real-time multi-currency ledger synchronization across regional subsidiaries and tax jurisdictions.'
      },
      {
        id: 'mod-zt',
        name: 'Zero-Trust Cryptographic Identity Mesh',
        monthlyAddonUsd: 39000,
        description: 'Hardware-backed executive authentication, sovereign key custody, and automated compliance auditing.'
      },
      {
        id: 'mod-data',
        name: 'Low-Latency Executive Data Warehouse & Lakehouse',
        monthlyAddonUsd: 44000,
        description: 'Unified petabyte-scale operational telemetry pipeline with sub-second boardroom reporting.'
      }
    ]
  },
  {
    id: '03. Luxury Brand & Industrial Design',
    shortCode: 'LUX-IND',
    tagline: 'Heritage brand elevation, flagship architectural identity, and bespoke physical-digital ecosystems.',
    description:
      'Crafting category-defining industrial design, private client digital flagships, and architectural retail systems for ultra-luxury maisons and mobility leaders.',
    baseMonthlyUsd: 145000,
    leadDirector: 'Elena Rostova',
    directorTitle: 'Managing Director, Brand & Industrial Design',
    keyOutcomes: [
      '+62% direct-to-private-client conversion velocity across flagship channels',
      'Bespoke design systems deployed across 140+ global boutiques and salons',
      'Full material science & tactile packaging prototyping in Zurich studio'
    ],
    deliverableModules: [
      {
        id: 'mod-id',
        name: 'Sovereign Visual & Typographic Identity System',
        monthlyAddonUsd: 32000,
        description: 'Custom editorial typography, bespoke color alchemy, and architectural signage standards.'
      },
      {
        id: 'mod-flagship',
        name: 'Private Client Digital Salon & Concierge Portal',
        monthlyAddonUsd: 40000,
        description: 'Invitation-only bespoke commissioning platform with live artisan provenance tracking.'
      },
      {
        id: 'mod-proto',
        name: 'Physical Hardware & Packaging CAD Prototyping',
        monthlyAddonUsd: 36000,
        description: 'Precision milled aluminum, leather, and ceramic structural prototypes ready for Tier-1 OEM tooling.'
      }
    ]
  },
  {
    id: '04. Private Equity Operations',
    shortCode: 'PE-OPS',
    tagline: 'Portfolio-wide EBITDA expansion, working capital release, and exit-readiness transformation.',
    description:
      'Embedded operational taskforces partnering with mega-cap private equity sponsors to accelerate margin expansion and prepare portfolio assets for IPO or strategic exit.',
    baseMonthlyUsd: 175000,
    leadDirector: 'Arthur Pendelton',
    directorTitle: 'Managing Director, Private Equity Value Creation',
    keyOutcomes: [
      '+480 bps average EBITDA margin expansion within 12 months of deployment',
      '$1.9B cumulative working capital unlocked across 28 portfolio companies',
      'Turnkey public-company audit readiness and investor relations architecture'
    ],
    deliverableModules: [
      {
        id: 'mod-ebitda',
        name: 'SG&A Rationalization & Margin Expansion Sprint',
        monthlyAddonUsd: 45000,
        description: 'Zero-based budgeting, strategic procurement renegotiation, and pricing power elasticity overhaul.'
      },
      {
        id: 'mod-sc',
        name: 'Global Supply Chain & Inventory Liquidity Release',
        monthlyAddonUsd: 37000,
        description: 'Working capital cycle compression, dual-sourcing resilience, and freight corridor optimization.'
      },
      {
        id: 'mod-exit',
        name: 'Sell-Side Equity Story & IPO Readiness Governance',
        monthlyAddonUsd: 41000,
        description: 'Audited KPI data room construction, board committee structuring, and institutional roadshow narrative.'
      }
    ]
  }
];

export const TEAM_SIZE_MULTIPLIERS: Record<TeamSizeOption, { multiplier: number; headcount: number; description: string }> = {
  'Dedicated Pod of 3': {
    multiplier: 1.0,
    headcount: 3,
    description: '1 Practice Director (Fractional) + 2 Principal Specialists dedicated to high-velocity targeted execution.'
  },
  'Full Department of 8': {
    multiplier: 1.85,
    headcount: 8,
    description: '1 Full-Time Practice Director + 4 Principal Architects/Analysts + 3 Senior Execution Leads.'
  },
  'Enterprise Taskforce of 15': {
    multiplier: 2.9,
    headcount: 15,
    description: '2 Co-Directors + 13 Multidisciplinary Principals across New York, London, Zurich, and Singapore.'
  }
};

export const INITIAL_EMPLOYEES: EmployeeProfile[] = [
  {
    id: 'emp-1',
    name: 'Julian Thorne',
    role: 'Principal Systems Architect',
    division: '02. Enterprise Systems Architecture',
    location: 'New York',
    compensationTier: 'Tier I — Managing Principal',
    annualBaseUsd: 340000,
    utilizationPercent: 92,
    billableHoursYtd: 1640,
    securityClearance: 'Level 5 Sovereign Cryptographic'
  },
  {
    id: 'emp-2',
    name: 'Claire Beaumont',
    role: 'Senior Financial Analyst',
    division: '01. Corporate Strategy & M&A',
    location: 'London',
    compensationTier: 'Tier II — Senior Partner Track',
    annualBaseUsd: 295000,
    utilizationPercent: 89,
    billableHoursYtd: 1580,
    securityClearance: 'Level 5 FCA / SEC Insider Cleared'
  },
  {
    id: 'emp-3',
    name: 'Soren Lindqvist',
    role: 'Lead Product Designer',
    division: '03. Luxury Brand & Industrial Design',
    location: 'Zurich',
    compensationTier: 'Tier II — Senior Partner Track',
    annualBaseUsd: 275000,
    utilizationPercent: 86,
    billableHoursYtd: 1490,
    securityClearance: 'Level 4 Industrial IP Vault'
  },
  {
    id: 'emp-4',
    name: 'Amara Chen-Vance',
    role: 'Client Account Manager',
    division: '04. Private Equity Operations',
    location: 'Singapore',
    compensationTier: 'Tier I — Managing Principal',
    annualBaseUsd: 310000,
    utilizationPercent: 94,
    billableHoursYtd: 1710,
    securityClearance: 'Level 5 Diplomatic & Sovereign'
  }
];

export const INITIAL_CONTRACTS: RetainerContract[] = [
  {
    id: 'SAC-4010',
    clientName: 'Aethelgard Sovereign Holdings AG',
    executiveSponsor: 'Henrik von Berg',
    sponsorTitle: 'Chief Operating Officer',
    division: '02. Enterprise Systems Architecture',
    teamSize: 'Full Department of 8',
    durationMonths: 12,
    monthlyRetainerUsd: 425000,
    totalContractValueUsd: 5100000,
    status: 'Active Execution',
    practiceDirector: 'Marcus Vance',
    assignedEmployeeIds: ['emp-1', 'emp-2', 'emp-4'],
    selectedModules: [
      'Global ERP & Treasury Core Unification',
      'Zero-Trust Cryptographic Identity Mesh'
    ],
    progressPercent: 65,
    createdAt: '2026-08-14',
    deliverables: [
      {
        id: 'SAC-4010-s1',
        stageNumber: 1,
        name: 'Discovery & Audit',
        status: 'Approved',
        ownerRole: 'Senior Financial Analyst',
        ownerName: 'Claire Beaumont',
        hoursLogged: 310,
        summary: 'Completed forensic audit of 14 regional treasury systems across Zurich, Frankfurt, and Singapore.',
        updatedAt: '2026-09-10'
      },
      {
        id: 'SAC-4010-s2',
        stageNumber: 2,
        name: 'Architecture Blueprint',
        status: 'Approved',
        ownerRole: 'Principal Systems Architect',
        ownerName: 'Julian Thorne',
        hoursLogged: 420,
        summary: 'Delivered multi-region active-active ledger topology and hardware HSM key hierarchy specification.',
        updatedAt: '2026-10-04'
      },
      {
        id: 'SAC-4010-s3',
        stageNumber: 3,
        name: 'Executive Prototype',
        status: 'Ready for Client Review',
        ownerRole: 'Principal Systems Architect',
        ownerName: 'Julian Thorne',
        hoursLogged: 285,
        summary: 'Live sandbox treasury engine processing 45,000 institutional settlements/sec with zero packet loss.',
        updatedAt: '2026-11-15'
      },
      {
        id: 'SAC-4010-s4',
        stageNumber: 4,
        name: 'Global Rollout',
        status: 'In Progress',
        ownerRole: 'Client Account Manager',
        ownerName: 'Amara Chen-Vance',
        hoursLogged: 190,
        summary: 'Orchestrating EMEA and APAC subsidiary cutover waves and executive war-room readiness.',
        updatedAt: '2026-11-16'
      },
      {
        id: 'SAC-4010-s5',
        stageNumber: 5,
        name: 'Quarterly Optimization',
        status: 'Scheduled',
        ownerRole: 'Lead Product Designer',
        ownerName: 'Soren Lindqvist',
        hoursLogged: 60,
        summary: 'Boardroom telemetry refinement and post-deployment latency tuning.',
        updatedAt: '2026-11-01'
      }
    ],
    invoices: [
      {
        id: 'INV-4010-01',
        period: 'Q3 2026 Retainer Tranche',
        amountUsd: 1275000,
        status: 'Paid',
        dueDate: '2026-09-30'
      },
      {
        id: 'INV-4010-02',
        period: 'Q4 2026 Retainer Tranche',
        amountUsd: 1275000,
        status: 'Pending Approval',
        dueDate: '2026-11-30'
      }
    ],
    messages: [
      {
        id: 'msg-4010-1',
        senderName: 'Henrik von Berg',
        senderRole: 'Client Executive',
        timestamp: 'Yesterday, 16:40 EST',
        content: 'Marcus, Julian — our Audit Committee reviewed the Stage 2 Architecture Blueprint with high commendation. Please confirm when Stage 3 Executive Prototype is ready for formal sign-off.'
      },
      {
        id: 'msg-4010-2',
        senderName: 'Marcus Vance',
        senderRole: 'Practice Director',
        timestamp: 'Today, 08:15 EST',
        content: 'Thank you, Henrik. Julian Thorne has staged the Executive Prototype in your dedicated Zurich enclave. You may inspect and approve Milestone 3 directly in this gateway.'
      }
    ]
  },
  {
    id: 'SAC-3892',
    clientName: 'Vanguardia Chronométrie & Maison Horlogère',
    executiveSponsor: 'Geneviève Delacroix',
    sponsorTitle: 'Chief Executive Officer',
    division: '03. Luxury Brand & Industrial Design',
    teamSize: 'Enterprise Taskforce of 15',
    durationMonths: 18,
    monthlyRetainerUsd: 520000,
    totalContractValueUsd: 9360000,
    status: 'Active Execution',
    practiceDirector: 'Elena Rostova',
    assignedEmployeeIds: ['emp-2', 'emp-3', 'emp-4'],
    selectedModules: [
      'Sovereign Visual & Typographic Identity System',
      'Private Client Digital Salon & Concierge Portal',
      'Physical Hardware & Packaging CAD Prototyping'
    ],
    progressPercent: 50,
    createdAt: '2026-06-20',
    deliverables: [
      {
        id: 'SAC-3892-s1',
        stageNumber: 1,
        name: 'Discovery & Audit',
        status: 'Approved',
        ownerRole: 'Client Account Manager',
        ownerName: 'Amara Chen-Vance',
        hoursLogged: 290,
        summary: 'Completed global collector ethnographic audit across Geneva, Tokyo, New York, and Dubai.',
        updatedAt: '2026-08-02'
      },
      {
        id: 'SAC-3892-s2',
        stageNumber: 2,
        name: 'Architecture Blueprint',
        status: 'Approved',
        ownerRole: 'Lead Product Designer',
        ownerName: 'Soren Lindqvist',
        hoursLogged: 380,
        summary: 'Approved architectural salon standards and cryptographic timepiece provenance ledger schema.',
        updatedAt: '2026-09-25'
      },
      {
        id: 'SAC-3892-s3',
        stageNumber: 3,
        name: 'Executive Prototype',
        status: 'In Progress',
        ownerRole: 'Lead Product Designer',
        ownerName: 'Soren Lindqvist',
        hoursLogged: 340,
        summary: 'Machining grade-5 titanium bespoke presentation trunk and interactive collector commissioning suite.',
        updatedAt: '2026-11-16'
      },
      {
        id: 'SAC-3892-s4',
        stageNumber: 4,
        name: 'Global Rollout',
        status: 'Scheduled',
        ownerRole: 'Principal Systems Architect',
        ownerName: 'Julian Thorne',
        hoursLogged: 110,
        summary: 'Global deployment to 38 flagship salons and private diplomatic lounges.',
        updatedAt: '2026-11-10'
      },
      {
        id: 'SAC-3892-s5',
        stageNumber: 5,
        name: 'Quarterly Optimization',
        status: 'Scheduled',
        ownerRole: 'Senior Financial Analyst',
        ownerName: 'Claire Beaumont',
        hoursLogged: 45,
        summary: 'Private client allocation yield modeling and boutique wait-list conversion optimization.',
        updatedAt: '2026-11-10'
      }
    ],
    invoices: [
      {
        id: 'INV-3892-01',
        period: 'H2 2026 Bespoke Retainer Installment',
        amountUsd: 1560000,
        status: 'Paid',
        dueDate: '2026-10-15'
      },
      {
        id: 'INV-3892-02',
        period: 'Q4 2026 Industrial Tooling & Advisory',
        amountUsd: 1560000,
        status: 'Pending Approval',
        dueDate: '2026-12-01'
      }
    ],
    messages: [
      {
        id: 'msg-3892-1',
        senderName: 'Geneviève Delacroix',
        senderRole: 'Client Executive',
        timestamp: '2 days ago, 14:20 CET',
        content: 'Elena, Soren — the Geneva board was deeply impressed by the bespoke presentation trunk CAD tolerances. Can we accelerate the Private Client Digital Salon preview ahead of the Zurich summit?'
      },
      {
        id: 'msg-3892-2',
        senderName: 'Elena Rostova',
        senderRole: 'Practice Director',
        timestamp: 'Yesterday, 11:05 CET',
        content: 'Certainly, Geneviève. Soren Lindqvist and Julian Thorne have prioritized the collector salon build for next week’s briefing.'
      }
    ]
  }
];

export const INITIAL_PTO_REQUESTS: PtoRequest[] = [
  {
    id: 'pto-101',
    employeeId: 'emp-2',
    employeeName: 'Claire Beaumont',
    employeeRole: 'Senior Financial Analyst',
    startDate: '2026-12-18',
    endDate: '2026-12-24',
    days: 5,
    reason: 'Annual Year-End Family Sabbatical (St. Moritz)',
    coverageSpecialist: 'Julian Thorne',
    status: 'Pending HR Approval',
    submittedAt: '2026-11-15'
  },
  {
    id: 'pto-102',
    employeeId: 'emp-3',
    employeeName: 'Soren Lindqvist',
    employeeRole: 'Lead Product Designer',
    startDate: '2026-11-26',
    endDate: '2026-11-28',
    days: 3,
    reason: 'Guest Jury Chair — Swiss Architectural & Industrial Design Biennale',
    coverageSpecialist: 'Amara Chen-Vance',
    status: 'Approved',
    submittedAt: '2026-11-08'
  }
];

export const INITIAL_DIRECTIVES: ExecutiveDirective[] = [
  {
    id: 'dir-01',
    title: 'Q4 Sovereign Capital & Cross-Practice Margin Mandate',
    category: 'Capital Allocation',
    priority: 'Board Resolution',
    content:
      'All Practice Directors and Managing Principals are instructed to prioritize multi-division retainers combining Enterprise Systems Architecture with Private Equity Operations. Target net operating margin across all active pods is raised to 44.5% for FY2027.',
    author: 'Alistair Vance-Kensington, Chief Executive Officer',
    publishedAt: 'Nov 16, 2026 · 18:00 EST',
    targetPortals: ['employee', 'director']
  },
  {
    id: 'dir-02',
    title: 'Zero-Trust Client Data Enclave Protocol (Zurich & Singapore)',
    category: 'Global Governance',
    priority: 'Immediate Mandate',
    content:
      'Effective immediately, all Stage 2 Architecture Blueprints and Stage 3 Executive Prototypes must be dual-signed by the assigned Principal Systems Architect and Practice Director prior to B2B Client Gateway release.',
    author: 'Alistair Vance-Kensington, Chief Executive Officer',
    publishedAt: 'Nov 12, 2026 · 09:30 EST',
    targetPortals: ['employee', 'director']
  }
];

/**
 * Pure calculation for Deliverable Progress Percentage across a 5-stage roadmap.
 */
export function computeContractProgress(deliverables: DeliverableStage[]): number {
  if (!deliverables.length) return 0;
  const weights: Record<DeliverableStatus, number> = {
    Approved: 100,
    'Ready for Client Review': 75,
    'In Progress': 40,
    Scheduled: 0
  };
  const total = deliverables.reduce((acc, stage) => acc + weights[stage.status], 0);
  return Math.round(total / deliverables.length);
}

/**
 * Pure calculation for B2B Retainer monthly & total investment quote.
 */
export function calculateRetainerQuote(params: {
  division: PracticeDivisionId;
  teamSize: TeamSizeOption;
  durationMonths: number;
  selectedModuleIds: string[];
}): {
  baseMonthlyUsd: number;
  teamMultiplier: number;
  modulesMonthlyUsd: number;
  durationDiscountPercent: number;
  monthlyRetainerUsd: number;
  totalContractValueUsd: number;
  headcount: number;
} {
  const divSpec = PRACTICE_DIVISIONS.find((d) => d.id === params.division) || PRACTICE_DIVISIONS[0];
  const teamSpec = TEAM_SIZE_MULTIPLIERS[params.teamSize] || TEAM_SIZE_MULTIPLIERS['Dedicated Pod of 3'];

  const modulesMonthlyUsd = divSpec.deliverableModules
    .filter((m) => params.selectedModuleIds.includes(m.id))
    .reduce((sum, m) => sum + m.monthlyAddonUsd, 0);

  const rawMonthly = Math.round(divSpec.baseMonthlyUsd * teamSpec.multiplier + modulesMonthlyUsd);

  // Duration institutional commitment incentive: 12+ months -> 5%, 18+ months -> 8%, 24 months -> 10%
  let durationDiscountPercent = 0;
  if (params.durationMonths >= 24) {
    durationDiscountPercent = 10;
  } else if (params.durationMonths >= 18) {
    durationDiscountPercent = 8;
  } else if (params.durationMonths >= 12) {
    durationDiscountPercent = 5;
  }

  const monthlyRetainerUsd = Math.round(rawMonthly * (1 - durationDiscountPercent / 100));
  const totalContractValueUsd = monthlyRetainerUsd * params.durationMonths;

  return {
    baseMonthlyUsd: divSpec.baseMonthlyUsd,
    teamMultiplier: teamSpec.multiplier,
    modulesMonthlyUsd,
    durationDiscountPercent,
    monthlyRetainerUsd,
    totalContractValueUsd,
    headcount: teamSpec.headcount
  };
}

/**
 * Creates a new RetainerContract with a deterministic or custom SAC-XXXX ID.
 */
export function createRetainerContract(params: {
  contractId: string;
  clientName: string;
  executiveSponsor: string;
  sponsorTitle: string;
  division: PracticeDivisionId;
  teamSize: TeamSizeOption;
  durationMonths: number;
  selectedModuleIds: string[];
}): RetainerContract {
  const divSpec = PRACTICE_DIVISIONS.find((d) => d.id === params.division) || PRACTICE_DIVISIONS[0];
  const quote = calculateRetainerQuote({
    division: params.division,
    teamSize: params.teamSize,
    durationMonths: params.durationMonths,
    selectedModuleIds: params.selectedModuleIds
  });

  const selectedModuleNames = divSpec.deliverableModules
    .filter((m) => params.selectedModuleIds.includes(m.id))
    .map((m) => m.name);

  const deliverables: DeliverableStage[] = [
    {
      id: `${params.contractId}-s1`,
      stageNumber: 1,
      name: 'Discovery & Audit',
      status: 'In Progress',
      ownerRole: 'Senior Financial Analyst',
      ownerName: 'Claire Beaumont',
      hoursLogged: 48,
      summary: `Initial executive baseline audit and stakeholder alignment for ${params.clientName}.`,
      updatedAt: '2026-11-17'
    },
    {
      id: `${params.contractId}-s2`,
      stageNumber: 2,
      name: 'Architecture Blueprint',
      status: 'Scheduled',
      ownerRole: 'Principal Systems Architect',
      ownerName: 'Julian Thorne',
      hoursLogged: 0,
      summary: 'Core operating model, technical topology, and governance specification.',
      updatedAt: '2026-11-17'
    },
    {
      id: `${params.contractId}-s3`,
      stageNumber: 3,
      name: 'Executive Prototype',
      status: 'Scheduled',
      ownerRole: 'Lead Product Designer',
      ownerName: 'Soren Lindqvist',
      hoursLogged: 0,
      summary: 'Interactive validation environment and boardroom pilot verification.',
      updatedAt: '2026-11-17'
    },
    {
      id: `${params.contractId}-s4`,
      stageNumber: 4,
      name: 'Global Rollout',
      status: 'Scheduled',
      ownerRole: 'Client Account Manager',
      ownerName: 'Amara Chen-Vance',
      hoursLogged: 0,
      summary: 'Full multi-jurisdiction deployment and subsidiary transition management.',
      updatedAt: '2026-11-17'
    },
    {
      id: `${params.contractId}-s5`,
      stageNumber: 5,
      name: 'Quarterly Optimization',
      status: 'Scheduled',
      ownerRole: 'Senior Financial Analyst',
      ownerName: 'Claire Beaumont',
      hoursLogged: 0,
      summary: 'Continuous EBITDA & performance telemetry review with board reporting.',
      updatedAt: '2026-11-17'
    }
  ];

  const progressPercent = computeContractProgress(deliverables);

  return {
    id: params.contractId,
    clientName: params.clientName.trim(),
    executiveSponsor: params.executiveSponsor.trim(),
    sponsorTitle: params.sponsorTitle.trim() || 'Executive Sponsor',
    division: params.division,
    teamSize: params.teamSize,
    durationMonths: params.durationMonths,
    monthlyRetainerUsd: quote.monthlyRetainerUsd,
    totalContractValueUsd: quote.totalContractValueUsd,
    status: 'Active Execution',
    practiceDirector: divSpec.leadDirector,
    assignedEmployeeIds: ['emp-1', 'emp-2', 'emp-3', 'emp-4'],
    selectedModules:
      selectedModuleNames.length > 0
        ? selectedModuleNames
        : [divSpec.deliverableModules[0].name],
    deliverables,
    progressPercent,
    invoices: [
      {
        id: `INV-${params.contractId.replace('SAC-', '')}-01`,
        period: 'Initial Mobilization & Q4 Tranche',
        amountUsd: quote.monthlyRetainerUsd * 3,
        status: 'Pending Approval',
        dueDate: '2026-12-15'
      }
    ],
    messages: [
      {
        id: `msg-${params.contractId}-1`,
        senderName: divSpec.leadDirector,
        senderRole: 'Practice Director',
        timestamp: 'Just now',
        content: `Welcome to Sovereign Apex Corp, ${params.executiveSponsor}. Your ${params.teamSize} under ${params.division} has been mobilized under reference ${params.contractId}. Stage 1 Discovery & Audit is now underway.`
      }
    ],
    createdAt: '2026-11-17'
  };
}

/**
 * Pure state update for advancing or setting a deliverable stage status and recalculating contract progress.
 */
export function updateDeliverableStageStatus(
  contract: RetainerContract,
  stageNumber: number,
  newStatus: DeliverableStatus,
  additionalHours = 0
): RetainerContract {
  const updatedDeliverables = contract.deliverables.map((stage) => {
    if (stage.stageNumber !== stageNumber) return stage;
    return {
      ...stage,
      status: newStatus,
      hoursLogged: stage.hoursLogged + additionalHours,
      updatedAt: '2026-11-17'
    };
  });

  return {
    ...contract,
    deliverables: updatedDeliverables,
    progressPercent: computeContractProgress(updatedDeliverables)
  };
}

/**
 * Pure calculation for CEO Master Command Room ERP metrics.
 */
export function calculateExecutiveMetrics(
  contracts: RetainerContract[],
  employees: EmployeeProfile[]
): {
  annualRecurringRevenueUsd: number;
  totalPortfolioContractValueUsd: number;
  totalAnnualPayrollUsd: number;
  netProfitMarginPercent: number;
  averageUtilizationPercent: number;
  activeRetainerCount: number;
} {
  const activeContracts = contracts.filter((c) => c.status !== 'Completed');
  const totalMonthlyRevenue = activeContracts.reduce((sum, c) => sum + c.monthlyRetainerUsd, 0);
  const annualRecurringRevenueUsd = totalMonthlyRevenue * 12;
  const totalPortfolioContractValueUsd = contracts.reduce((sum, c) => sum + c.totalContractValueUsd, 0);

  // Calculate total annual payroll across specialists + practice overhead factor
  const baseSpecialistPayroll = employees.reduce((sum, e) => sum + e.annualBaseUsd, 0);
  // Sovereign global operating overhead + partner compensation pool scaled realistically against ARR
  const totalAnnualOperatingCost = baseSpecialistPayroll * 2.8 + 1850000;

  const netProfitUsd = Math.max(0, annualRecurringRevenueUsd - totalAnnualOperatingCost);
  const netProfitMarginPercent =
    annualRecurringRevenueUsd > 0
      ? Number(((netProfitUsd / annualRecurringRevenueUsd) * 100).toFixed(1))
      : 0;

  const averageUtilizationPercent =
    employees.length > 0
      ? Math.round(employees.reduce((sum, e) => sum + e.utilizationPercent, 0) / employees.length)
      : 0;

  return {
    annualRecurringRevenueUsd,
    totalPortfolioContractValueUsd,
    totalAnnualPayrollUsd: baseSpecialistPayroll,
    netProfitMarginPercent,
    averageUtilizationPercent,
    activeRetainerCount: activeContracts.length
  };
}
