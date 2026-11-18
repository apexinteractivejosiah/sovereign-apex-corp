import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Briefcase,
  Award,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Network,
  Building2
} from 'lucide-react';
import {
  PortalId,
  PracticeDivisionId,
  VERIFIED_CORPORATE_ASSETS,
  PRACTICE_DIVISIONS,
  RetainerContract
} from '../utils/enterpriseLogic';

interface HeadquartersPortalProps {
  onNavigatePortal: (portal: PortalId) => void;
  onSelectDivisionForConfigurator: (division: PracticeDivisionId) => void;
  onInspectContractInClientPortal: (contractId: string) => void;
  contracts: RetainerContract[];
  annualRecurringRevenueUsd: number;
}

export const HeadquartersPortal: React.FC<HeadquartersPortalProps> = ({
  onNavigatePortal,
  onSelectDivisionForConfigurator,
  contracts,
  annualRecurringRevenueUsd
}) => {
  // 3-scene crossfading full-bleed background showcase using the exact Headquarters, Boardroom, and Workspace photos
  const heroScenes = [
    VERIFIED_CORPORATE_ASSETS[0], // Sovereign Global Tower — New York & London Headquarters
    VERIFIED_CORPORATE_ASSETS[1], // 54th Floor Executive Boardroom & Strategy Suite
    VERIFIED_CORPORATE_ASSETS[2]  // Principal Engineering & Design Floor
  ];

  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [selectedDivisionModal, setSelectedDivisionModal] = useState<PracticeDivisionId | null>(null);
  const [activeGovernanceNode, setActiveGovernanceNode] = useState<PortalId>('client');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % heroScenes.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroScenes.length]);

  const currentScene = heroScenes[activeSceneIndex];

  const governanceNodes: {
    portal: PortalId;
    roleLabel: string;
    title: string;
    flowDescription: string;
    syncOutputs: string[];
  }[] = [
    {
      portal: 'solutions',
      roleLabel: '01 · Retainer Origination',
      title: 'B2B Retainer & Scope Configurator',
      flowDescription:
        'Institutional clients configure practice division scope, multidisciplinary pod size (3, 8, or 15 specialists), and multi-month engagement horizons to generate an active #SAC-XXXX contract.',
      syncOutputs: [
        'Generates live #SAC-XXXX Contract Reference ID',
        'Initializes 5-Stage Deliverable Roadmap automatically',
        'Recalculates CEO Boardroom Annual Recurring Revenue (ARR)'
      ]
    },
    {
      portal: 'client',
      roleLabel: '02 · External Client Gateway',
      title: 'B2B Client Portal & Milestone Governance',
      flowDescription:
        'Executive sponsors inspect real-time deliverable stages, approve completed prototypes, review tranche invoices, and correspond directly with their Practice Director.',
      syncOutputs: [
        '1-click Milestone Sign-Off updates overall contract progress',
        'Direct executive messages route straight to Director Hub',
        'Live visibility into assigned Principal Specialists'
      ]
    },
    {
      portal: 'employee',
      roleLabel: '03 · Specialist Execution',
      title: 'Internal Specialist & Consultant Workspace',
      flowDescription:
        'Principal Architects, Financial Analysts, Product Designers, and Account Managers advance task stages, log billable hours, and submit PTO requests with designated coverage.',
      syncOutputs: [
        'Advancing task status immediately updates Client Gateway progress bar',
        'Logging billable hours recalculates firm-wide utilization',
        'PTO requests route immediately to HR & Payroll Directory'
      ]
    },
    {
      portal: 'director',
      roleLabel: '04 · Practice & HR Command',
      title: 'Practice Director & HR Management Hub',
      flowDescription:
        'Managing Directors allocate specialists across active #SAC contracts, adjudicate employee PTO & compensation tiers, onboard new principals, and reply to client threads.',
      syncOutputs: [
        'Resource allocation syncs specialist cards in Client & Employee portals',
        'Compensation & new hire onboarding updates payroll ledger',
        'Executive replies publish instantaneously to Client Gateway'
      ]
    },
    {
      portal: 'ceo',
      roleLabel: '05 · Sovereign Boardroom ERP',
      title: 'Chief Executive Officer Master Command Room',
      flowDescription:
        'The CEO monitors live ARR, Net Profit Margin, and Department Utilization, exercises contract status overrides, and publishes company-wide Executive Directives.',
      syncOutputs: [
        'Executive Directives broadcast live to Employee & Director workspaces',
        'Contract overrides update status and Practice Director assignments globally',
        'Real-time financial synthesis of all active retainers'
      ]
    }
  ];

  const activeGovSpec =
    governanceNodes.find((n) => n.portal === activeGovernanceNode) || governanceNodes[0];

  return (
    <div className="space-y-20 pb-20">
      {/* SECTION 1A: FULL-IMAGE BACKGROUND EXECUTIVE HERO SHOWCASE */}
      <section aria-label="Executive Hero Showcase" className="pt-4">
        <div className="relative min-h-[640px] lg:min-h-[680px] rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-[0_24px_60px_rgba(28,25,23,0.14)] flex flex-col justify-between p-6 sm:p-12 lg:p-14">
          {/* Full-Bleed Crossfading Architectural Photography Background */}
          {heroScenes.map((scene, idx) => (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === activeSceneIndex ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={scene.url}
                alt={scene.label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
              />
            </div>
          ))}

          {/* Multi-layered editorial contrast scrims for unmistakable legibility & visual drama */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B0C10]/90 via-[#0B0C10]/65 to-[#0B0C10]/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0C10]/90 via-transparent to-[#0B0C10]/30"
          />

          {/* Top Bar inside Full-Image Hero: Kicker + Scene Switcher Controls */}
          <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-[#E5C378] font-semibold">
              <span>Sovereign Apex Corp</span>
              <span aria-hidden="true">·</span>
              <span>New York · London · Zurich · Singapore</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-stone-100">
                Live Portfolio ARR: ${(annualRecurringRevenueUsd / 1000000).toFixed(2)}M
              </span>
            </div>

            {/* Scene Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-[#0B0C10]/70 backdrop-blur-xl p-1.5 rounded-xl border border-[#C5A059]/40 self-start md:self-auto">
              {heroScenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveSceneIndex(idx)}
                  aria-label={`View scene: ${scene.label}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    idx === activeSceneIndex
                      ? 'bg-[#C5A059] text-[#0B0C10] font-semibold shadow-sm'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  0{idx + 1} · {scene.city}
                </button>
              ))}
            </div>
          </div>

          {/* Middle & Bottom Content over Full-Bleed Architectural Background */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-12">
            {/* Left 7 Columns: 6-Word H1, Subheadline, Primary CTAs */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-5">
                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  Enterprise Strategy. Executed Without Compromise.
                </h1>

                <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal">
                  Dedicated multidisciplinary teams delivering digital infrastructure, M&amp;A advisory, and brand transformation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onNavigatePortal('solutions')}
                  className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#AA843F] text-[#0B0C10] font-semibold text-sm tracking-wide hover:brightness-110 transition-all shadow-lg flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Configure Corporate Retainer</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigatePortal('client')}
                  className="w-full sm:w-auto justify-center px-4 sm:px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Inspect Live Client Gateway (#SAC-4010)</span>
                  <ChevronRight className="w-4 h-4 text-[#E5C378] shrink-0" />
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Floating Frosted Alabaster Architectural Scene Dossier Card */}
            <div className="lg:col-span-5">
              <div className="backdrop-blur-2xl bg-white/90 border border-[#C5A059]/40 rounded-2xl p-6 shadow-2xl space-y-2.5 text-stone-900">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                  <span>{currentScene.city} · {currentScene.floorCount}</span>
                  <Building2 className="w-4 h-4 text-[#8A6626]" />
                </div>
                <div className="font-display text-lg sm:text-xl font-semibold text-stone-900 leading-snug">
                  {currentScene.label}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {currentScene.architecturalNote}
                </p>
                <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-500">
                  {currentScene.address}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip: 5-Role Enterprise OS Quick Triggers */}
          <div className="relative z-20 pt-8 mt-8 border-t border-white/20">
            <p className="text-xs uppercase tracking-wider text-[#E5C378] font-semibold mb-3">
              Direct Role-Portal Switchboard — Synchronized Enterprise State
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigatePortal('solutions')}
                className="px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-[#C5A059]/40 text-left transition-all cursor-pointer group shadow-sm"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#8A6626] font-semibold">Role 01</div>
                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#8A6626] whitespace-nowrap">
                  Configurator
                </div>
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal('client')}
                className="px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-[#C5A059]/40 text-left transition-all cursor-pointer group shadow-sm"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#8A6626] font-semibold">Role 02</div>
                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#8A6626] whitespace-nowrap">
                  Client Portal
                </div>
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal('employee')}
                className="px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-[#C5A059]/40 text-left transition-all cursor-pointer group shadow-sm"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#8A6626] font-semibold">Role 03</div>
                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#8A6626] whitespace-nowrap">
                  Specialist Hub
                </div>
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal('director')}
                className="px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-[#C5A059]/40 text-left transition-all cursor-pointer group shadow-sm"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#8A6626] font-semibold">Role 04</div>
                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#8A6626] whitespace-nowrap">
                  Director &amp; HR
                </div>
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal('ceo')}
                className="px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-[#C5A059]/40 text-left transition-all cursor-pointer group shadow-sm col-span-2 sm:col-span-1"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#8A6626] font-semibold">Role 05</div>
                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#8A6626] whitespace-nowrap">
                  CEO Boardroom
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1B: GLOBAL IMPACT METRICS (4 LIGHT FROSTED ALABASTER COLUMNS) */}
      <section aria-label="Global Impact Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Verified Advisory Impact</span>
              <Award className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tabular-nums">
              $14.2B
            </div>
            <div>
              <div className="text-sm font-semibold text-[#8A6626]">
                $14.2B Client Enterprise Value Created
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Audited M&amp;A synergy realization, EBITDA expansion, and core infrastructure modernization since 2019.
              </p>
            </div>
          </div>

          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Institutional Mandate Portfolio</span>
              <Briefcase className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tabular-nums">
              42
            </div>
            <div>
              <div className="text-sm font-semibold text-[#8A6626]">
                42 Fortune-500 Retainers
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Active multi-year corporate architecture &amp; transformation mandates ({contracts.length} live synced in ERP).
              </p>
            </div>
          </div>

          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Sovereign Jurisdiction Footprint</span>
              <Globe2 className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tabular-nums">
              4
            </div>
            <div>
              <div className="text-sm font-semibold text-[#8A6626]">
                4 Global Offices
              </div>
              <p className="text-xs text-stone-600 mt-1">
                24/7 follow-the-sun principal taskforces operating across New York, London, Zurich, and Singapore.
              </p>
            </div>
          </div>

          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Multi-Year Partner Continuity</span>
              <ShieldCheck className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tabular-nums">
              99.4%
            </div>
            <div>
              <div className="text-sm font-semibold text-[#8A6626]">
                99.4% Client Retention
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Sustained board-level renewal rate across sovereign funds, global banks, and industrial flagships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1C: 4 PRACTICE DIVISIONS BENTO GRID */}
      <section aria-label="Practice Divisions Bento Grid" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
              Multidisciplinary Practice Architecture
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900">
              Four Sovereign Practice Divisions
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-xl">
            Select any practice division below to inspect its deliverable modules or launch the B2B Retainer Configurator pre-calibrated to that discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {PRACTICE_DIVISIONS.map((division, idx) => {
            const isWide = idx === 0 || idx === 3;
            const isExpanded = selectedDivisionModal === division.id;

            return (
              <div
                key={division.id}
                className={`${
                  isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                } backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-[#C5A059] transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-xs text-stone-500">
                    <span className="text-[#8A6626] font-semibold tracking-wide uppercase">
                      Practice Division · {division.shortCode}
                    </span>
                    <span className="tabular-nums text-stone-700 font-medium">
                      Base Retainer: ${(division.baseMonthlyUsd / 1000).toFixed(0)}k / mo
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
                    {division.id}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {division.description}
                  </p>

                  {/* Audited Outcomes */}
                  <div className="pt-2 space-y-2">
                    <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                      Quantified Division Benchmarks
                    </div>
                    <ul className="space-y-1.5">
                      {division.keyOutcomes.map((outcome, i) => (
                        <li key={i} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#9A7432] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverable Modules Drawer */}
                  {isExpanded && (
                    <div className="pt-4 mt-4 border-t border-stone-200/80 space-y-3">
                      <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                        Available Retainer Deliverable Modules
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {division.deliverableModules.map((mod) => (
                          <div
                            key={mod.id}
                            className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div>
                              <div className="text-xs font-semibold text-stone-900">{mod.name}</div>
                              <div className="text-xs text-stone-600">{mod.description}</div>
                            </div>
                            <div className="text-xs font-display italic text-[#8A6626] font-semibold tabular-nums shrink-0">
                              +${(mod.monthlyAddonUsd / 1000).toFixed(0)}k / mo
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-stone-500">
                    Lead Partner: <span className="text-stone-900 font-semibold">{division.leadDirector}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDivisionModal(isExpanded ? null : division.id)
                      }
                      className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-300/80 text-xs font-medium text-stone-800 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {isExpanded ? 'Hide Modules' : 'Inspect Modules'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectDivisionForConfigurator(division.id)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-[#9A7432] text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                    >
                      <span>Commission Division</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 1D: CORPORATE HIERARCHY & REAL-TIME GOVERNANCE OVERVIEW */}
      <section aria-label="Corporate Hierarchy and Governance Overview">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Synchronized 5-Role Enterprise Operating System
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900">
                Corporate Hierarchy &amp; Real-Time Governance Architecture
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-xl">
              Every action taken across Sovereign Apex Corp propagates instantaneously across all five role portals—from client retainer origination to specialist task execution, HR resource allocation, and CEO boardroom telemetry.
            </p>
          </div>

          {/* Interactive 5-Node Governance Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {governanceNodes.map((node) => {
              const isSelected = activeGovernanceNode === node.portal;
              return (
                <button
                  key={node.portal}
                  type="button"
                  onClick={() => setActiveGovernanceNode(node.portal)}
                  className={`p-5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 border ${
                    isSelected
                      ? 'bg-[#C5A059]/15 border-[#C5A059] shadow-[0_8px_24px_rgba(197,160,89,0.18)]'
                      : 'bg-[#FAF8F5] border-stone-200/90 hover:border-[#C5A059]/60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider text-[#8A6626] font-semibold">
                      {node.roleLabel}
                    </div>
                    <div className="font-display text-base font-semibold text-stone-900 leading-snug">
                      {node.title}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200/80">
                    <span>{isSelected ? 'Inspecting Flow' : 'Select Node'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9A7432]" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Governance Node Deep-Dive Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Active Governance Node · {activeGovSpec.roleLabel}
              </div>
              <h3 className="font-display text-2xl font-semibold text-stone-900">
                {activeGovSpec.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {activeGovSpec.flowDescription}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigatePortal(activeGovSpec.portal)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#9A7432] transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <span>Open {activeGovSpec.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 border-t lg:border-t-0 lg:border-l border-stone-200/90 pt-4 lg:pt-0 lg:pl-8">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Real-Time Cross-Portal State Propagation
              </div>
              <ul className="space-y-2.5">
                {activeGovSpec.syncOutputs.map((out, i) => (
                  <li key={i} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                    <Network className="w-4 h-4 text-[#9A7432] shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1E: GLOBAL OFFICES GALLERY (STRICT 1-TO-1 IMAGE-TO-LABEL MAPPING) */}
      <section aria-label="Global Offices Architectural Gallery" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
              Sovereign Architectural Enclaves
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900">
              Global Headquarters &amp; Regional Command Suites
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-xl">
            Every Sovereign Apex Corp facility is engineered for institutional discretion, cryptographic security, and executive hospitality across New York, London, Zurich, and Singapore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERIFIED_CORPORATE_ASSETS.map((office) => (
            <div
              key={office.id}
              className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-200">
                <img
                  src={office.url}
                  alt={office.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-[#C5A059]/40 text-xs font-semibold text-[#8A6626] flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{office.city}</span>
                </div>
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-[#8A6626] font-medium">{office.floorCount}</div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-stone-900">
                    {office.label}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {office.architecturalNote}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                  <span>{office.address}</span>
                  <button
                    type="button"
                    onClick={() => onNavigatePortal('solutions')}
                    className="text-[#8A6626] hover:underline font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Briefing Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
