import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  ShieldCheck,
  Send,
  CreditCard,
  MessageSquare,
  RotateCcw
} from 'lucide-react';
import {
  RetainerContract,
  EmployeeProfile,
  DeliverableStatus,
  VERIFIED_CORPORATE_ASSETS
} from '../utils/enterpriseLogic';

interface ClientPortalProps {
  contracts: RetainerContract[];
  employees: EmployeeProfile[];
  activeContractId: string;
  onSelectContractId: (contractId: string) => void;
  onUpdateDeliverableStatus: (
    contractId: string,
    stageNumber: number,
    newStatus: DeliverableStatus
  ) => void;
  onApproveInvoice: (contractId: string, invoiceId: string) => void;
  onSendClientMessage: (contractId: string, senderName: string, content: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  contracts,
  employees,
  activeContractId,
  onSelectContractId,
  onUpdateDeliverableStatus,
  onApproveInvoice,
  onSendClientMessage
}) => {
  const [lookupInput, setLookupInput] = useState<string>(activeContractId);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [messageDraft, setMessageDraft] = useState<string>('');

  useEffect(() => {
    setLookupInput(activeContractId);
    setLookupError(null);
  }, [activeContractId]);

  const currentContract =
    contracts.find((c) => c.id.toUpperCase() === activeContractId.toUpperCase()) || contracts[0];

  const assignedSpecialists = employees.filter((e) =>
    currentContract.assignedEmployeeIds.includes(e.id)
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = lookupInput.trim().toUpperCase();
    const found = contracts.find((c) => c.id.toUpperCase() === cleaned);
    if (!found) {
      setLookupError(
        `Contract Reference "${lookupInput}" not found. Select one of the active references below (e.g., SAC-4010 or SAC-3892).`
      );
      return;
    }
    setLookupError(null);
    onSelectContractId(found.id);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageDraft.trim()) return;
    onSendClientMessage(currentContract.id, currentContract.executiveSponsor, messageDraft.trim());
    setMessageDraft('');
  };

  const loungeAsset = VERIFIED_CORPORATE_ASSETS[3]; // Private Client Briefing & Hospitality Lounge

  return (
    <div className="space-y-14 pb-20 pt-6">
      {/* SECTION 3A: CONTRACT REFERENCE LOOKUP & 1-CLICK SAMPLE GATEWAY */}
      <section aria-label="B2B Client Contract Gateway Header">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Portal 03 · External B2B Client Gateway &amp; Milestone Telemetry
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
                B2B Client Executive Gateway
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Enter your Corporate Contract Reference ID or select a live retainer below to inspect your 5-Stage Deliverable Roadmap, assigned Practice Director and Specialist Pod, invoice tranches, and direct executive communications.
              </p>
            </div>

            {/* Search & 1-Click Contract Switcher */}
            <div className="lg:col-span-5 space-y-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    aria-label="Enter Corporate Contract Reference ID"
                    value={lookupInput}
                    onChange={(e) => setLookupInput(e.target.value)}
                    placeholder="Enter Contract ID (e.g. SAC-4010)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432] tabular-nums"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all cursor-pointer whitespace-nowrap shadow-xs"
                >
                  Load Dossier
                </button>
              </form>

              {lookupError && (
                <p className="text-xs text-rose-600 font-medium">{lookupError}</p>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-500 font-medium">1-Click Active Contracts:</span>
                {contracts.map((c) => {
                  const isCurrent = c.id === currentContract.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onSelectContractId(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium tabular-nums transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#C5A059] text-[#0B0C10] font-semibold shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                      }`}
                    >
                      {c.id} · {c.clientName.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Contract Executive Summary Strip */}
          <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Active Contract ID</div>
              <div className="font-display text-2xl font-semibold text-[#8A6626] tabular-nums mt-0.5">
                {currentContract.id}
              </div>
              <div className="text-xs text-stone-600 mt-1">{currentContract.status}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 lg:col-span-2">
              <div className="text-xs text-stone-500 font-medium">Client Organization &amp; Executive Sponsor</div>
              <div className="font-display text-xl font-semibold text-stone-900 mt-0.5 truncate">
                {currentContract.clientName}
              </div>
              <div className="text-xs text-stone-600 mt-1">
                {currentContract.executiveSponsor} · {currentContract.sponsorTitle}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Practice Division &amp; Pod</div>
              <div className="text-xs font-semibold text-stone-900 mt-1">
                {currentContract.division}
              </div>
              <div className="text-xs text-[#8A6626] font-medium mt-1">{currentContract.teamSize}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Overall Roadmap Progress</div>
              <div className="font-display text-2xl font-semibold text-stone-900 tabular-nums mt-0.5">
                {currentContract.progressPercent}%
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-[#9A7432] transition-all duration-500"
                  style={{ width: `${currentContract.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3B: LIVE 5-STAGE DELIVERABLE ROADMAP & MILESTONE APPROVAL */}
      <section aria-label="Live 5-Stage Deliverable Roadmap">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Real-Time Deliverable Telemetry · Synced with Employee Workspace
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                Live 5-Stage Deliverable Roadmap ({currentContract.id})
              </h2>
            </div>
            <div className="text-xs text-stone-600">
              Milestones marked <span className="text-[#8A6626] font-semibold">Ready for Client Review</span> or <span className="text-stone-900 font-semibold">In Progress</span> can be signed off directly by the Executive Sponsor.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentContract.deliverables.map((stage) => {
              const isApproved = stage.status === 'Approved';
              const isReadyForReview = stage.status === 'Ready for Client Review';
              const isInProgress = stage.status === 'In Progress';

              return (
                <div
                  key={stage.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                    isReadyForReview
                      ? 'bg-[#C5A059]/15 border-[#C5A059]'
                      : isApproved
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-[#FAF8F5] border-stone-200/90'
                  }`}
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="font-semibold text-[#8A6626] uppercase tracking-wider">
                        Stage 0{stage.stageNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-900 font-semibold">
                        Status: {stage.status}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-600">
                        Lead Role: {stage.ownerRole} ({stage.ownerName})
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-500 tabular-nums">
                        {stage.hoursLogged} Billable Hrs Logged
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-stone-900">
                      {stage.name}
                    </h3>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  {/* Client Milestone Sign-Off Controls */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {!isApproved ? (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateDeliverableStatus(currentContract.id, stage.stageNumber, 'Approved')
                        }
                        className="px-4 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Milestone 0{stage.stageNumber}</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100/80 border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Milestone Signed Off</span>
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateDeliverableStatus(
                              currentContract.id,
                              stage.stageNumber,
                              'In Progress'
                            )
                          }
                          title="Re-open milestone for further iteration"
                          className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-xs text-stone-700 cursor-pointer flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reopen</span>
                        </button>
                      </div>
                    )}

                    {isInProgress && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateDeliverableStatus(
                            currentContract.id,
                            stage.stageNumber,
                            'Ready for Client Review'
                          )
                        }
                        className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-xs text-stone-800 font-medium cursor-pointer whitespace-nowrap"
                      >
                        Request Immediate Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3C: ASSIGNED PRACTICE DIRECTOR & SENIOR SPECIALIST TEAM CARDS */}
      <section aria-label="Assigned Practice Director and Senior Specialist Team">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Live Resource Roster · Synced from Practice Director &amp; HR Hub
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                Assigned Practice Director &amp; Senior Specialist Team
              </h2>
            </div>
            <div className="text-xs text-stone-600">
              Practice Director: <span className="text-[#8A6626] font-semibold">{currentContract.practiceDirector}</span> · Active Specialists Assigned: <span className="text-stone-900 font-semibold tabular-nums">{assignedSpecialists.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lead Practice Director Card */}
            <div className="p-6 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                  Managing Practice Director
                </div>
                <div className="font-display text-xl font-semibold text-stone-900">
                  {currentContract.practiceDirector}
                </div>
                <p className="text-xs text-stone-700">
                  Executive Partner overseeing {currentContract.division} governance, board sign-offs, and SLA assurance.
                </p>
              </div>
              <div className="pt-3 border-t border-[#C5A059]/40 text-xs text-stone-700 flex items-center justify-between font-medium">
                <span>Clearance: Level 5 Sovereign</span>
                <ShieldCheck className="w-4 h-4 text-[#8A6626]" />
              </div>
            </div>

            {/* Assigned Senior Specialists */}
            {assignedSpecialists.map((spec) => (
              <div
                key={spec.id}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1.5">
                  <div className="text-xs text-[#8A6626] font-semibold">
                    {spec.role}
                  </div>
                  <div className="font-display text-xl font-semibold text-stone-900">
                    {spec.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {spec.location} Office · {spec.compensationTier}
                  </div>
                </div>
                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-700 font-medium tabular-nums">
                  <span>Utilization: {spec.utilizationPercent}%</span>
                  <span>{spec.billableHoursYtd} hrs YTD</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3D: INVOICE TRANCHE LEDGER, EXECUTIVE MESSAGE THREAD & HOSPITALITY LOUNGE */}
      <section aria-label="Invoices and Executive Communications">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 6 Columns: Direct Executive Message Thread */}
          <div className="lg:col-span-6 backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                    Encrypted Partner Channel · Synced with Director Hub
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                    Direct Executive Message Thread
                  </h2>
                </div>
                <MessageSquare className="w-5 h-5 text-[#9A7432]" />
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {currentContract.messages.map((msg) => {
                  const isClient = msg.senderRole === 'Client Executive';
                  return (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border ${
                        isClient
                          ? 'bg-[#C5A059]/12 border-[#C5A059]/50'
                          : 'bg-[#FAF8F5] border-stone-200/90'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                        <span className="font-semibold text-stone-900">
                          {msg.senderName} <span className="text-[#8A6626]">({msg.senderRole})</span>
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="pt-4 border-t border-stone-200/80 space-y-3">
              <label htmlFor="client-message-input" className="block text-xs text-stone-600 font-medium">
                Dispatch Direct Instruction to {currentContract.practiceDirector} (Practice Director)
              </label>
              <div className="flex gap-2">
                <input
                  id="client-message-input"
                  type="text"
                  value={messageDraft}
                  onChange={(e) => setMessageDraft(e.target.value)}
                  placeholder="Write an executive directive or milestone query..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right 6 Columns: Invoice Status & Private Client Briefing Lounge */}
          <div className="lg:col-span-6 space-y-8">
            <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                    Institutional Treasury &amp; Billing
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                    Retainer Tranche Invoices
                  </h2>
                </div>
                <CreditCard className="w-5 h-5 text-[#9A7432]" />
              </div>

              <div className="space-y-3">
                {currentContract.invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs text-stone-500 tabular-nums">
                        {inv.id} · Due {inv.dueDate}
                      </div>
                      <div className="text-sm font-semibold text-stone-900 mt-0.5">
                        {inv.period}
                      </div>
                      <div className="font-display text-lg text-[#8A6626] font-semibold tabular-nums mt-0.5">
                        ${inv.amountUsd.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-semibold ${
                          inv.status === 'Paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        Status: {inv.status}
                      </span>
                      {inv.status !== 'Paid' && (
                        <button
                          type="button"
                          onClick={() => onApproveInvoice(currentContract.id, inv.id)}
                          className="px-3.5 py-2 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-[#8A6626] transition-all cursor-pointer whitespace-nowrap"
                        >
                          Authorize Settlement
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Private Client Briefing & Hospitality Lounge Card */}
            <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-5 relative min-h-[180px] bg-stone-200">
                <img
                  src={loungeAsset.url}
                  alt={loungeAsset.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                    VIP Diplomatic Access Included
                  </div>
                  <h3 className="font-display text-lg font-semibold text-stone-900">
                    {loungeAsset.label}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    As Executive Sponsor for <span className="text-stone-900 font-semibold">{currentContract.id}</span>, your leadership team holds continuous access to our private diplomatic briefing suites in New York, London, Zurich, and Singapore.
                  </p>
                </div>
                <div className="text-xs text-stone-500 pt-2 border-t border-stone-200/80">
                  {loungeAsset.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
