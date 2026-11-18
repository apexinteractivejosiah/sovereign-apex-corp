import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Users,
  Layers,
  ExternalLink
} from 'lucide-react';
import {
  PracticeDivisionId,
  TeamSizeOption,
  PRACTICE_DIVISIONS,
  TEAM_SIZE_MULTIPLIERS,
  calculateRetainerQuote,
  RetainerContract
} from '../utils/enterpriseLogic';

interface SolutionsPortalProps {
  initialDivision?: PracticeDivisionId;
  contracts: RetainerContract[];
  onCreateContract: (params: {
    clientName: string;
    executiveSponsor: string;
    sponsorTitle: string;
    division: PracticeDivisionId;
    teamSize: TeamSizeOption;
    durationMonths: number;
    selectedModuleIds: string[];
  }) => RetainerContract;
  onInspectContractInClientPortal: (contractId: string) => void;
}

export const SolutionsPortal: React.FC<SolutionsPortalProps> = ({
  initialDivision,
  contracts,
  onCreateContract,
  onInspectContractInClientPortal
}) => {
  const [selectedDivision, setSelectedDivision] = useState<PracticeDivisionId>(
    initialDivision || '01. Corporate Strategy & M&A'
  );
  const [selectedTeamSize, setSelectedTeamSize] = useState<TeamSizeOption>('Full Department of 8');
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(['mod-dd', 'mod-pmi']);

  const [clientName, setClientName] = useState<string>('Meridian Sovereign Bancorp');
  const [executiveSponsor, setExecutiveSponsor] = useState<string>('Lord Alistair Sterling');
  const [sponsorTitle, setSponsorTitle] = useState<string>('Group Chief Strategy Officer');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [newlyCreatedContract, setNewlyCreatedContract] = useState<RetainerContract | null>(null);

  useEffect(() => {
    if (initialDivision) {
      setSelectedDivision(initialDivision);
      const spec = PRACTICE_DIVISIONS.find((d) => d.id === initialDivision);
      if (spec && spec.deliverableModules.length > 0) {
        setSelectedModuleIds([spec.deliverableModules[0].id]);
      }
    }
  }, [initialDivision]);

  const currentDivisionSpec =
    PRACTICE_DIVISIONS.find((d) => d.id === selectedDivision) || PRACTICE_DIVISIONS[0];

  const handleDivisionChange = (divId: PracticeDivisionId) => {
    setSelectedDivision(divId);
    const spec = PRACTICE_DIVISIONS.find((d) => d.id === divId);
    if (spec && spec.deliverableModules.length > 0) {
      setSelectedModuleIds([spec.deliverableModules[0].id]);
    }
  };

  const toggleModule = (modId: string) => {
    setSelectedModuleIds((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const quote = calculateRetainerQuote({
    division: selectedDivision,
    teamSize: selectedTeamSize,
    durationMonths,
    selectedModuleIds
  });

  const handleSubmitRetainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !executiveSponsor.trim()) {
      setValidationError('Please provide both the Client Organization Name and Executive Sponsor Name.');
      return;
    }
    setValidationError(null);

    const created = onCreateContract({
      clientName,
      executiveSponsor,
      sponsorTitle,
      division: selectedDivision,
      teamSize: selectedTeamSize,
      durationMonths,
      selectedModuleIds
    });
    setNewlyCreatedContract(created);
  };

  return (
    <div className="space-y-16 pb-20 pt-6">
      {/* SECTION 2A: PORTAL HEADER & LIVE COMMISSIONING BANNER */}
      <section aria-label="Retainer Configurator Header">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Portal 02 · Institutional Retainer Origination &amp; Scope Architecture
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
                B2B Retainer &amp; Project Scope Configurator
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Structure a bespoke multidisciplinary retainer across our four global practice divisions. Commissioning a retainer immediately generates a verified Corporate Contract Reference ID (<span className="text-[#8A6626] font-semibold">#SAC-XXXX</span>) and provisions live workspaces across the Client Gateway, Employee Workspace, Director Hub, and CEO Boardroom.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/40 shrink-0 space-y-1 text-right">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                Estimated Monthly Retainer
              </div>
              <div className="font-display text-3xl font-semibold text-[#8A6626] tabular-nums">
                ${quote.monthlyRetainerUsd.toLocaleString()}
                <span className="text-sm text-stone-500 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-stone-600 tabular-nums">
                Total {durationMonths}-Month Mandate: ${quote.totalContractValueUsd.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Newly Generated Contract Confirmation Banner */}
          {newlyCreatedContract && (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 p-6 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Corporate Retainer Mobilized &amp; Synced Across All 5 Role Portals</span>
                </div>
                <div className="font-display text-xl sm:text-2xl font-semibold text-stone-900">
                  Contract Reference ID: <span className="text-[#8A6626] tabular-nums">{newlyCreatedContract.id}</span> — {newlyCreatedContract.clientName}
                </div>
                <p className="text-xs sm:text-sm text-stone-700">
                  Assigned Practice Director: <span className="font-semibold">{newlyCreatedContract.practiceDirector}</span> · Team: <span className="font-semibold">{newlyCreatedContract.teamSize}</span> · Total Contract Value: <span className="font-semibold tabular-nums">${newlyCreatedContract.totalContractValueUsd.toLocaleString()}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onInspectContractInClientPortal(newlyCreatedContract.id)}
                  className="px-5 py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span>Inspect {newlyCreatedContract.id} in B2B Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2B: INTERACTIVE CONFIGURATION WORKBENCH */}
      <section aria-label="Interactive Scope Configuration Workbench">
        <form onSubmit={handleSubmitRetainer} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Step-by-Step Scope Selectors */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Practice Division Selector */}
            <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                    Step 01 · Practice Division Selection
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                    Select Primary Advisory &amp; Execution Division
                  </h2>
                </div>
                <Layers className="w-5 h-5 text-[#9A7432]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRACTICE_DIVISIONS.map((div) => {
                  const active = selectedDivision === div.id;
                  return (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => handleDivisionChange(div.id)}
                      className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                        active
                          ? 'bg-[#C5A059]/15 border-[#C5A059] shadow-[0_8px_24px_rgba(197,160,89,0.15)]'
                          : 'bg-[#FAF8F5] border-stone-200/90 hover:border-[#C5A059]/60'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span className="text-[#8A6626] font-semibold">{div.shortCode}</span>
                          <span className="tabular-nums font-medium">${(div.baseMonthlyUsd / 1000).toFixed(0)}k / mo base</span>
                        </div>
                        <div className="font-display text-lg font-semibold text-stone-900">
                          {div.id}
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-2">
                          {div.tagline}
                        </p>
                      </div>
                      <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-200/80">
                        Director: <span className="text-stone-900 font-medium">{div.leadDirector}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Team Size & Engagement Duration */}
            <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                      Step 02 · Taskforce Deployment Scale
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                      Select Dedicated Team Size
                    </h2>
                  </div>
                  <Users className="w-5 h-5 text-[#9A7432]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(Object.keys(TEAM_SIZE_MULTIPLIERS) as TeamSizeOption[]).map((sizeKey) => {
                    const spec = TEAM_SIZE_MULTIPLIERS[sizeKey];
                    const active = selectedTeamSize === sizeKey;
                    return (
                      <button
                        key={sizeKey}
                        type="button"
                        onClick={() => setSelectedTeamSize(sizeKey)}
                        className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                          active
                            ? 'bg-[#C5A059]/15 border-[#C5A059]'
                            : 'bg-[#FAF8F5] border-stone-200/90 hover:border-[#C5A059]/60'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="text-xs text-[#8A6626] font-semibold tabular-nums">
                            {spec.headcount} Dedicated Specialists ({spec.multiplier}x Scale)
                          </div>
                          <div className="font-display text-base font-semibold text-stone-900">
                            {sizeKey}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {spec.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Engagement Duration Slider (3 to 24 months) */}
              <div className="pt-6 border-t border-stone-200/80 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <label
                      htmlFor="duration-slider"
                      className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold block"
                    >
                      Step 03 · Retainer Horizon (3 to 24 Months)
                    </label>
                    <div className="text-sm text-stone-600 mt-0.5">
                      Commitments of 12+ months unlock institutional fee compression (up to 10% reduction).
                    </div>
                  </div>
                  <div className="font-display text-2xl font-semibold text-stone-900 tabular-nums">
                    {durationMonths} Months
                    {quote.durationDiscountPercent > 0 && (
                      <span className="ml-2 text-xs text-[#8A6626] font-sans font-semibold">
                        (-{quote.durationDiscountPercent}% Institutional Rate)
                      </span>
                    )}
                  </div>
                </div>

                <input
                  id="duration-slider"
                  type="range"
                  min={3}
                  max={24}
                  step={3}
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full accent-[#9A7432] cursor-pointer h-2 bg-stone-200 rounded-lg"
                />

                <div className="flex justify-between text-xs text-stone-500 tabular-nums">
                  {[3, 6, 9, 12, 15, 18, 21, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDurationMonths(m)}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        durationMonths === m ? 'text-[#8A6626] font-semibold bg-[#C5A059]/20' : 'hover:text-stone-900'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Deliverable Modules Multi-Select & Client Details */}
            <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-8">
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                    Step 04 · Specialized Deliverable Modules
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                    Select Deliverable Workstreams for {currentDivisionSpec.shortCode}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {currentDivisionSpec.deliverableModules.map((mod) => {
                    const isChecked = selectedModuleIds.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleModule(mod.id);
                          }
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isChecked
                            ? 'bg-[#C5A059]/15 border-[#C5A059]'
                            : 'bg-[#FAF8F5] border-stone-200/90 hover:border-stone-400'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                                isChecked
                                  ? 'bg-[#9A7432] border-[#9A7432] text-white font-bold'
                                  : 'border-stone-400 bg-white'
                              }`}
                            >
                              {isChecked ? '✓' : ''}
                            </span>
                            <span>{mod.name}</span>
                          </div>
                          <p className="text-xs text-stone-600 pl-6">{mod.description}</p>
                        </div>
                        <div className="font-display text-sm italic text-[#8A6626] font-semibold tabular-nums shrink-0">
                          +${mod.monthlyAddonUsd.toLocaleString()} / mo
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Organization & Sponsor Inputs */}
              <div className="pt-6 border-t border-stone-200/80 space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                  Step 05 · Counterparty &amp; Executive Sponsor Registration
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="client-org-input" className="block text-xs text-stone-700 font-medium mb-1.5">
                      Client Organization Legal Name
                    </label>
                    <input
                      id="client-org-input"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Meridian Sovereign Bancorp"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                    />
                  </div>

                  <div>
                    <label htmlFor="sponsor-name-input" className="block text-xs text-stone-700 font-medium mb-1.5">
                      Executive Sponsor Full Name
                    </label>
                    <input
                      id="sponsor-name-input"
                      type="text"
                      value={executiveSponsor}
                      onChange={(e) => setExecutiveSponsor(e.target.value)}
                      placeholder="e.g. Lord Alistair Sterling"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                    />
                  </div>

                  <div>
                    <label htmlFor="sponsor-title-input" className="block text-xs text-stone-700 font-medium mb-1.5">
                      Sponsor Executive Title
                    </label>
                    <input
                      id="sponsor-title-input"
                      type="text"
                      value={sponsorTitle}
                      onChange={(e) => setSponsorTitle(e.target.value)}
                      placeholder="e.g. Group Chief Strategy Officer"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                    />
                  </div>
                </div>

                {validationError && (
                  <p className="text-xs text-rose-600 font-medium">{validationError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Live Financial Summary & Contract Generator Dossier */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="backdrop-blur-3xl bg-white/90 border border-[#C5A059]/40 shadow-[0_16px_48px_rgba(28,25,23,0.08)] rounded-3xl p-7 space-y-6">
              <div className="space-y-1 border-b border-stone-200/80 pb-4">
                <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                  Sovereign Engagement Charter
                </div>
                <h3 className="font-display text-2xl font-semibold text-stone-900">
                  Retainer Investment Summary
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Counterparty:</span>
                  <span className="font-semibold text-stone-900 text-right">{clientName || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Practice Division:</span>
                  <span className="font-semibold text-[#8A6626] text-right">{selectedDivision}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Lead Practice Director:</span>
                  <span className="font-semibold text-stone-900">{currentDivisionSpec.leadDirector}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Taskforce Scale:</span>
                  <span className="font-semibold text-stone-900">{selectedTeamSize}</span>
                </div>
                <div className="flex justify-between text-stone-600 tabular-nums">
                  <span>Base Practice Allocation:</span>
                  <span>${quote.baseMonthlyUsd.toLocaleString()} × {quote.teamMultiplier}</span>
                </div>
                <div className="flex justify-between text-stone-600 tabular-nums">
                  <span>Selected Deliverable Modules ({selectedModuleIds.length}):</span>
                  <span>+${quote.modulesMonthlyUsd.toLocaleString()} / mo</span>
                </div>
                {quote.durationDiscountPercent > 0 && (
                  <div className="flex justify-between text-[#8A6626] font-semibold tabular-nums">
                    <span>Duration Commitment Incentive ({durationMonths}m):</span>
                    <span>-{quote.durationDiscountPercent}%</span>
                  </div>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Net Monthly Retainer</span>
                  <span className="font-display text-2xl font-semibold text-stone-900 tabular-nums">
                    ${quote.monthlyRetainerUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-stone-200/80">
                  <span className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                    Total {durationMonths}-Month Value
                  </span>
                  <span className="font-display text-2xl font-semibold text-[#8A6626] tabular-nums">
                    ${quote.totalContractValueUsd.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7B3B] text-[#0B0C10] font-semibold text-sm tracking-wide hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Authorize &amp; Generate Contract ID</span>
              </button>

              <p className="text-[11px] text-stone-500 leading-relaxed text-center">
                Immediate synchronization across Client Gateway, Specialist Workspaces, HR Resource Allocation, and CEO ARR Ledger.
              </p>
            </div>
          </div>
        </form>
      </section>

      {/* SECTION 2C: 5-STAGE DELIVERABLE GOVERNANCE PROTOCOL */}
      <section aria-label="Deliverable Governance Protocol">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
              Standardized Sovereign Execution Cadence
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
              Every Commissioned Retainer Deploys Our 5-Stage Deliverable Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              {
                stage: '01',
                name: 'Discovery & Audit',
                role: 'Senior Financial Analyst',
                desc: 'Forensic baseline audit, stakeholder interviews, and capital/systems telemetry benchmarking.'
              },
              {
                stage: '02',
                name: 'Architecture Blueprint',
                role: 'Principal Systems Architect',
                desc: 'Target operating model, technical schema specification, and board governance charter.'
              },
              {
                stage: '03',
                name: 'Executive Prototype',
                role: 'Lead Product Designer',
                desc: 'Working high-security sandbox prototype and physical/digital validation suite.'
              },
              {
                stage: '04',
                name: 'Global Rollout',
                role: 'Client Account Manager',
                desc: 'Multi-region cutover orchestration across New York, London, Zurich, and Singapore.'
              },
              {
                stage: '05',
                name: 'Quarterly Optimization',
                role: 'Senior Financial Analyst',
                desc: 'Continuous EBITDA margin expansion, SLA auditing, and boardroom reporting.'
              }
            ].map((item) => (
              <div
                key={item.stage}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2.5"
              >
                <div className="text-xs font-semibold text-[#8A6626]">Stage {item.stage}</div>
                <div className="font-display text-lg font-semibold text-stone-900">{item.name}</div>
                <div className="text-[11px] text-stone-500 font-medium">Lead: {item.role}</div>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2D: ACTIVE CORPORATE CONTRACT LEDGER */}
      <section aria-label="Active Corporate Contract Ledger">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Live Synchronized Registry
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
                Active Corporate Retainer Contracts ({contracts.length})
              </h2>
            </div>
            <p className="text-xs text-stone-600">
              Click any Contract Reference ID to inspect its live 5-Stage Roadmap in the B2B Client Portal.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                  <th className="py-3.5 px-4">Contract ID</th>
                  <th className="py-3.5 px-4">Client Organization</th>
                  <th className="py-3.5 px-4">Practice Division</th>
                  <th className="py-3.5 px-4">Team Scale</th>
                  <th className="py-3.5 px-4 text-right">Monthly Retainer</th>
                  <th className="py-3.5 px-4 text-right">Total Mandate</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 text-sm">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-100/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#8A6626] tabular-nums">{c.id}</td>
                    <td className="py-4 px-4 text-stone-900">
                      <div className="font-semibold">{c.clientName}</div>
                      <div className="text-xs text-stone-500">{c.executiveSponsor} · {c.sponsorTitle}</div>
                    </td>
                    <td className="py-4 px-4 text-stone-700 text-xs">{c.division}</td>
                    <td className="py-4 px-4 text-stone-700 text-xs">{c.teamSize}</td>
                    <td className="py-4 px-4 text-right font-display text-stone-900 font-semibold tabular-nums">
                      ${c.monthlyRetainerUsd.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right font-display text-[#8A6626] font-semibold tabular-nums">
                      ${c.totalContractValueUsd.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onInspectContractInClientPortal(c.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-[#8A6626] text-white text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>Open in Client Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
