import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Bell
} from 'lucide-react';
import {
  EmployeeProfile,
  EmployeeRoleTitle,
  RetainerContract,
  DeliverableStatus,
  PtoRequest,
  ExecutiveDirective,
  VERIFIED_CORPORATE_ASSETS
} from '../utils/enterpriseLogic';

interface EmployeePortalProps {
  employees: EmployeeProfile[];
  contracts: RetainerContract[];
  ptoRequests: PtoRequest[];
  directives: ExecutiveDirective[];
  onAdvanceTaskStatus: (
    contractId: string,
    stageNumber: number,
    newStatus: DeliverableStatus,
    hoursToAdd: number,
    employeeId: string
  ) => void;
  onSubmitPtoRequest: (params: {
    employeeId: string;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    coverageSpecialist: string;
  }) => void;
  onInspectContractInClientPortal: (contractId: string) => void;
}

const ROLE_POSITIONS: EmployeeRoleTitle[] = [
  'Principal Systems Architect',
  'Senior Financial Analyst',
  'Lead Product Designer',
  'Client Account Manager'
];

export const EmployeePortal: React.FC<EmployeePortalProps> = ({
  employees,
  contracts,
  ptoRequests,
  directives,
  onAdvanceTaskStatus,
  onSubmitPtoRequest,
  onInspectContractInClientPortal
}) => {
  const [selectedRole, setSelectedRole] = useState<EmployeeRoleTitle>('Principal Systems Architect');
  const [hoursInputByStage, setHoursInputByStage] = useState<Record<string, number>>({});

  // PTO Request Form State
  const [ptoStartDate, setPtoStartDate] = useState<string>('2026-12-10');
  const [ptoEndDate, setPtoEndDate] = useState<string>('2026-12-14');
  const [ptoDays, setPtoDays] = useState<number>(4);
  const [ptoReason, setPtoReason] = useState<string>('Executive Architecture Symposium & Personal Sabbatical');
  const [coverageSpecialist, setCoverageSpecialist] = useState<string>('Claire Beaumont');
  const [ptoSuccessBanner, setPtoSuccessBanner] = useState<string | null>(null);

  const activeEmployee =
    employees.find((e) => e.role === selectedRole) || employees[0];

  const assignedContracts = contracts.filter((c) =>
    c.assignedEmployeeIds.includes(activeEmployee.id)
  );

  const handleLogAndAdvance = (
    contractId: string,
    stageNumber: number,
    stageId: string,
    nextStatus: DeliverableStatus
  ) => {
    const hoursToAdd = hoursInputByStage[stageId] ?? 16;
    onAdvanceTaskStatus(contractId, stageNumber, nextStatus, hoursToAdd, activeEmployee.id);
  };

  const handlePtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ptoReason.trim()) return;
    onSubmitPtoRequest({
      employeeId: activeEmployee.id,
      startDate: ptoStartDate,
      endDate: ptoEndDate,
      days: ptoDays,
      reason: ptoReason.trim(),
      coverageSpecialist
    });
    setPtoSuccessBanner(
      `Leave request for ${activeEmployee.name} (${ptoDays} days) transmitted to the Director & HR Hub for immediate review.`
    );
  };

  const engineeringFloorAsset = VERIFIED_CORPORATE_ASSETS[2]; // Principal Engineering & Design Floor

  return (
    <div className="space-y-14 pb-20 pt-6">
      {/* SECTION 4A: 4-ROLE INTERNAL POSITION SWITCHER & SPECIALIST TELEMETRY */}
      <section aria-label="Internal Specialist Role Switcher">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Portal 04 · Internal Specialist &amp; Consultant Workspace
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
                Principal Specialist Execution Workbench
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Switch between our 4 core internal specialist positions below. Advancing deliverable milestones or logging billable hours here immediately updates the B2B Client Gateway progress bar and CEO utilization gauges.
              </p>
            </div>

            {/* Verified Engineering Floor Reference Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 max-w-md">
              <img
                src={engineeringFloorAsset.url}
                alt={engineeringFloorAsset.label}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#C5A059]/40"
              />
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#8A6626] font-semibold">
                  Active Workspace Environment
                </div>
                <div className="font-display text-sm font-semibold text-stone-900">
                  {engineeringFloorAsset.label}
                </div>
                <div className="text-xs text-stone-500">
                  {activeEmployee.location} Enclave · {activeEmployee.securityClearance}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Concrete Position Selector Buttons */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              Select Internal Office Position (4 Concrete Specialist Roles):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ROLE_POSITIONS.map((roleTitle) => {
                const emp = employees.find((e) => e.role === roleTitle);
                const isSelected = selectedRole === roleTitle;
                return (
                  <button
                    key={roleTitle}
                    type="button"
                    onClick={() => {
                      setSelectedRole(roleTitle);
                      setPtoSuccessBanner(null);
                    }}
                    className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-[#C5A059]/15 border-[#C5A059] shadow-[0_8px_24px_rgba(197,160,89,0.18)]'
                        : 'bg-[#FAF8F5] border-stone-200/90 hover:border-[#C5A059]/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs text-[#8A6626] font-semibold">
                        {emp?.location || 'Global'} · {emp?.utilizationPercent || 90}% Utilized
                      </div>
                      <div className="font-display text-lg font-semibold text-stone-900">
                        {roleTitle}
                      </div>
                      <div className="text-xs text-stone-600">
                        Specialist: <span className="font-semibold text-stone-900">{emp?.name}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-200/80">
                      {emp?.division}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Employee KPI Strip */}
          <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Active Specialist Profile</div>
              <div className="font-display text-xl font-semibold text-stone-900 mt-0.5">
                {activeEmployee.name}
              </div>
              <div className="text-xs text-[#8A6626] font-semibold mt-1">{activeEmployee.role}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Assigned Client Contracts</div>
              <div className="font-display text-2xl font-semibold text-stone-900 tabular-nums mt-0.5">
                {assignedContracts.length} Active Mandates
              </div>
              <div className="text-xs text-stone-600 mt-1">
                {assignedContracts.map((c) => c.id).join(', ')}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Billable Hours Logged YTD</div>
              <div className="font-display text-2xl font-semibold text-[#8A6626] tabular-nums mt-0.5">
                {activeEmployee.billableHoursYtd.toLocaleString()} hrs
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Utilization Rate: {activeEmployee.utilizationPercent}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
              <div className="text-xs text-stone-500 font-medium">Compensation Tier &amp; Standing</div>
              <div className="text-sm font-semibold text-stone-900 mt-1">
                {activeEmployee.compensationTier}
              </div>
              <div className="text-xs text-stone-600 tabular-nums mt-1">
                Base: ${activeEmployee.annualBaseUsd.toLocaleString()} / yr
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4B: LIVE CEO EXECUTIVE DIRECTIVES BROADCAST FEED */}
      <section aria-label="CEO Executive Directives Broadcast Feed">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Live Boardroom Feed · Synced from CEO Master Command Room
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                Company-Wide Broadcasts &amp; Executive Directives
              </h2>
            </div>
            <Bell className="w-5 h-5 text-[#9A7432]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directives.map((dir) => (
              <div
                key={dir.id}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/40 space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[#8A6626] font-semibold uppercase tracking-wider">
                    {dir.priority} · {dir.category}
                  </span>
                  <span>{dir.publishedAt}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-stone-900">
                  {dir.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {dir.content}
                </p>
                <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-200/80">
                  Issued by: <span className="text-stone-900 font-medium">{dir.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4C: ASSIGNED CLIENT CONTRACTS & DELIVERABLE TASK EXECUTION */}
      <section aria-label="Assigned Client Contracts and Deliverable Execution" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
              Direct Deliverable Execution · Syncs Live with B2B Client Portal
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              Assigned Client Contracts for {activeEmployee.name} ({selectedRole})
            </h2>
          </div>
          <p className="text-xs text-stone-600">
            Advancing any deliverable to <span className="text-[#8A6626] font-semibold">Ready for Client Review</span> or <span className="text-emerald-700 font-semibold">Approved</span> immediately updates the Client's Roadmap in Portal 3.
          </p>
        </div>

        {assignedContracts.map((contract) => (
          <div
            key={contract.id}
            className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-[#8A6626] tabular-nums text-sm">
                    {contract.id}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-700 font-medium">{contract.division}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500">Director: {contract.practiceDirector}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-stone-900">
                  {contract.clientName}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-stone-500">Client Roadmap Progress</div>
                  <div className="font-display text-xl font-semibold text-[#8A6626] tabular-nums">
                    {contract.progressPercent}% Complete
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectContractInClientPortal(contract.id)}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-[#8A6626] text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Verify in Client Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Deliverable Tasks List */}
            <div className="space-y-4">
              {contract.deliverables.map((stage) => {
                const isRoleOwner = stage.ownerRole === selectedRole;
                const hoursVal = hoursInputByStage[stage.id] ?? 16;

                return (
                  <div
                    key={stage.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6 ${
                      isRoleOwner
                        ? 'bg-[#C5A059]/12 border-[#C5A059]'
                        : 'bg-[#FAF8F5] border-stone-200/90'
                    }`}
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-[#8A6626]">
                          Stage 0{stage.stageNumber}: {stage.name}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-stone-900 font-semibold">
                          Current Status: {stage.status}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-stone-500 tabular-nums">
                          {stage.hoursLogged} hrs logged
                        </span>
                        {isRoleOwner && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#8A6626] font-semibold">
                              Primary Role Assignment
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600">
                        {stage.summary}
                      </p>
                    </div>

                    {/* Billable Hours Input & Status Progression Controls */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-xl px-3 py-1.5">
                        <label htmlFor={`hrs-${stage.id}`} className="text-xs text-stone-600 font-medium">
                          Log Hrs:
                        </label>
                        <input
                          id={`hrs-${stage.id}`}
                          type="number"
                          min={1}
                          max={200}
                          value={hoursVal}
                          onChange={(e) =>
                            setHoursInputByStage((prev) => ({
                              ...prev,
                              [stage.id]: Math.max(1, Number(e.target.value))
                            }))
                          }
                          className="w-14 bg-transparent text-xs text-stone-900 font-semibold text-center focus:outline-none tabular-nums"
                        />
                      </div>

                      {stage.status !== 'In Progress' && stage.status !== 'Approved' && (
                        <button
                          type="button"
                          onClick={() =>
                            handleLogAndAdvance(contract.id, stage.stageNumber, stage.id, 'In Progress')
                          }
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-xs font-medium text-stone-800 cursor-pointer whitespace-nowrap"
                        >
                          Start Execution (+{hoursVal}h)
                        </button>
                      )}

                      {stage.status !== 'Ready for Client Review' && (
                        <button
                          type="button"
                          onClick={() =>
                            handleLogAndAdvance(
                              contract.id,
                              stage.stageNumber,
                              stage.id,
                              'Ready for Client Review'
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-[#8A6626] transition-all cursor-pointer whitespace-nowrap"
                        >
                          Mark Ready for Client Review (+{hoursVal}h)
                        </button>
                      )}

                      {stage.status === 'Ready for Client Review' && (
                        <button
                          type="button"
                          onClick={() =>
                            handleLogAndAdvance(contract.id, stage.stageNumber, stage.id, 'Approved')
                          }
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all cursor-pointer whitespace-nowrap"
                        >
                          Finalize &amp; Approve (+{hoursVal}h)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 4D: SUBMIT PTO / SABBATICAL REQUEST TO HR & PAYROLL DIRECTORY */}
      <section aria-label="Employee PTO and Leave Management">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Columns: Submit PTO Form */}
          <div className="lg:col-span-7 backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                HR &amp; Sabbatical Governance · Syncs with Director &amp; HR Hub
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                Submit Executive Leave / PTO Request ({activeEmployee.name})
              </h2>
            </div>

            {ptoSuccessBanner && (
              <div
                role="status"
                className="p-4 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059] text-xs sm:text-sm text-stone-900 flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8A6626] shrink-0" />
                <span>{ptoSuccessBanner}</span>
              </div>
            )}

            <form onSubmit={handlePtoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="pto-start" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Leave Start Date
                  </label>
                  <input
                    id="pto-start"
                    type="date"
                    value={ptoStartDate}
                    onChange={(e) => setPtoStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                  />
                </div>
                <div>
                  <label htmlFor="pto-end" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Leave Return Date
                  </label>
                  <input
                    id="pto-end"
                    type="date"
                    value={ptoEndDate}
                    onChange={(e) => setPtoEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                  />
                </div>
                <div>
                  <label htmlFor="pto-days" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Total Business Days
                  </label>
                  <input
                    id="pto-days"
                    type="number"
                    min={1}
                    max={30}
                    value={ptoDays}
                    onChange={(e) => setPtoDays(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432] tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pto-reason" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Sabbatical / Leave Purpose
                  </label>
                  <input
                    id="pto-reason"
                    type="text"
                    value={ptoReason}
                    onChange={(e) => setPtoReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                  />
                </div>

                <div>
                  <label htmlFor="pto-coverage" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Designated Interim Coverage Principal
                  </label>
                  <select
                    id="pto-coverage"
                    value={coverageSpecialist}
                    onChange={(e) => setCoverageSpecialist(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                  >
                    {employees
                      .filter((e) => e.id !== activeEmployee.id)
                      .map((e) => (
                        <option key={e.id} value={e.name}>
                          {e.name} ({e.role})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all cursor-pointer whitespace-nowrap"
              >
                Transmit Leave Request to HR Hub
              </button>
            </form>
          </div>

          {/* Right 5 Columns: Live PTO Request Status Log */}
          <div className="lg:col-span-5 backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Live HR Adjudication Status
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                Specialist PTO &amp; Sabbatical Ledger
              </h2>
            </div>

            <div className="space-y-3">
              {ptoRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900">{req.employeeName}</span>
                    <span
                      className={`font-semibold ${
                        req.status === 'Approved'
                          ? 'text-emerald-700'
                          : req.status === 'Declined'
                          ? 'text-rose-700'
                          : 'text-[#8A6626]'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600">{req.reason}</div>
                  <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                    <span className="tabular-nums">
                      {req.startDate} to {req.endDate} ({req.days}d)
                    </span>
                    <span>Coverage: {req.coverageSpecialist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
