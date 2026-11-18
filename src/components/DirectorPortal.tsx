import React, { useState } from 'react';
import {
  UserPlus,
  Send,
  Bell
} from 'lucide-react';
import {
  RetainerContract,
  EmployeeProfile,
  EmployeeRoleTitle,
  PracticeDivisionId,
  PtoRequest,
  ExecutiveDirective
} from '../utils/enterpriseLogic';

interface DirectorPortalProps {
  contracts: RetainerContract[];
  employees: EmployeeProfile[];
  ptoRequests: PtoRequest[];
  directives: ExecutiveDirective[];
  onToggleEmployeeAssignment: (contractId: string, employeeId: string) => void;
  onDecidePtoRequest: (ptoId: string, decision: 'Approved' | 'Declined') => void;
  onUpdateEmployeeCompensation: (
    employeeId: string,
    newTier: EmployeeProfile['compensationTier'],
    newBaseUsd: number
  ) => void;
  onOnboardEmployee: (params: {
    name: string;
    role: EmployeeRoleTitle;
    division: PracticeDivisionId;
    location: 'New York' | 'London' | 'Zurich' | 'Singapore';
    annualBaseUsd: number;
  }) => void;
  onReplyClientMessage: (contractId: string, directorName: string, content: string) => void;
}

type DirectorSubView = 'Resource Allocation' | 'HR & Payroll Directory' | 'Client Communications';

export const DirectorPortal: React.FC<DirectorPortalProps> = ({
  contracts,
  employees,
  ptoRequests,
  directives,
  onToggleEmployeeAssignment,
  onDecidePtoRequest,
  onUpdateEmployeeCompensation,
  onOnboardEmployee,
  onReplyClientMessage
}) => {
  const [activeSubView, setActiveSubView] = useState<DirectorSubView>('Resource Allocation');

  // New Hire Onboarding Form State
  const [newHireName, setNewHireName] = useState<string>('');
  const [newHireRole, setNewHireRole] = useState<EmployeeRoleTitle>('Principal Systems Architect');
  const [newHireDivision] = useState<PracticeDivisionId>(
    '02. Enterprise Systems Architecture'
  );
  const [newHireLocation, setNewHireLocation] = useState<'New York' | 'London' | 'Zurich' | 'Singapore'>('London');
  const [newHireBase, setNewHireBase] = useState<number>(290000);
  const [onboardNotice, setOnboardNotice] = useState<string | null>(null);

  // Client Communications Reply State
  const [selectedCommContractId, setSelectedCommContractId] = useState<string>(
    contracts[0]?.id || 'SAC-4010'
  );
  const [directorReplyDraft, setDirectorReplyDraft] = useState<string>('');

  const activeCommContract =
    contracts.find((c) => c.id === selectedCommContractId) || contracts[0];

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHireName.trim()) return;
    onOnboardEmployee({
      name: newHireName.trim(),
      role: newHireRole,
      division: newHireDivision,
      location: newHireLocation,
      annualBaseUsd: newHireBase
    });
    setOnboardNotice(`Principal Specialist "${newHireName.trim()}" onboarded into ${newHireDivision} (${newHireLocation}).`);
    setNewHireName('');
  };

  const handleSendDirectorReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directorReplyDraft.trim() || !activeCommContract) return;
    onReplyClientMessage(
      activeCommContract.id,
      activeCommContract.practiceDirector,
      directorReplyDraft.trim()
    );
    setDirectorReplyDraft('');
  };

  const pendingPtoCount = ptoRequests.filter((p) => p.status === 'Pending HR Approval').length;
  const totalPayrollUsd = employees.reduce((sum, e) => sum + e.annualBaseUsd, 0);

  return (
    <div className="space-y-14 pb-20 pt-6">
      {/* SECTION 5A: PRACTICE DIRECTOR & HR COMMAND HEADER + SUB-VIEW NAVIGATION */}
      <section aria-label="Practice Director and HR Hub Header">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Portal 05 · Practice Director &amp; Human Capital Governance Hub
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
                Practice Director &amp; HR Management Hub
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Manage specialist pod assignments across active client retainers, adjudicate HR leave requests and partner compensation tiers, onboard new hires, and respond directly to B2B Client Gateway communications.
              </p>
            </div>

            {/* Summary KPIs */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-center">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Active Contracts</div>
                <div className="font-display text-2xl font-semibold text-[#8A6626] tabular-nums mt-1">
                  {contracts.length}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-center">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Specialists</div>
                <div className="font-display text-2xl font-semibold text-stone-900 tabular-nums mt-1">
                  {employees.length}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-center">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Pending PTO</div>
                <div className="font-display text-2xl font-semibold text-[#8A6626] tabular-nums mt-1">
                  {pendingPtoCount}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Mandatory Sub-View Switcher Tabs */}
          <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Director Hub Sub-Views">
              {(
                ['Resource Allocation', 'HR & Payroll Directory', 'Client Communications'] as DirectorSubView[]
              ).map((tab) => {
                const isActive = activeSubView === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveSubView(tab)}
                    className={`px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-stone-600 tabular-nums">
              Total Specialist Annual Base Payroll: <span className="text-stone-900 font-semibold">${totalPayrollUsd.toLocaleString()} / yr</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5B: SUB-VIEW 1 — RESOURCE ALLOCATION MATRIX */}
      <section
        aria-label="Resource Allocation Matrix"
        className={activeSubView === 'Resource Allocation' ? 'block' : 'opacity-95'}
      >
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Sub-View 01 · Resource Allocation Matrix (Live Sync to Portal 3 &amp; Portal 4)
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                Assign Principal Specialists to Active Client Contracts
              </h2>
            </div>
            <p className="text-xs text-stone-600 max-w-md">
              Toggling a specialist assignment immediately updates the Client's Assigned Team Roster in Portal 3 and the Employee's Contract Workbench in Portal 4.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-t-0 border-b border-stone-200/80">
                  <div>
                    <div className="text-xs text-[#8A6626] font-semibold tabular-nums">
                      {contract.id} · {contract.division}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-stone-900">
                      {contract.clientName}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-600">
                    Lead Practice Director: <span className="text-[#8A6626] font-semibold">{contract.practiceDirector}</span> · Assigned Pod: <span className="tabular-nums font-semibold text-stone-900">{contract.assignedEmployeeIds.length} Specialists</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {employees.map((emp) => {
                    const isAssigned = contract.assignedEmployeeIds.includes(emp.id);
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => onToggleEmployeeAssignment(contract.id, emp.id)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isAssigned
                            ? 'bg-[#C5A059]/15 border-[#C5A059]'
                            : 'bg-white border-stone-200/90 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-stone-900">{emp.name}</span>
                          <span
                            className={`text-[11px] font-semibold ${
                              isAssigned ? 'text-[#8A6626]' : 'text-stone-400'
                            }`}
                          >
                            {isAssigned ? 'Assigned ✓' : 'Unassigned'}
                          </span>
                        </div>
                        <div className="text-xs text-stone-600">{emp.role}</div>
                        <div className="text-[11px] text-stone-500 tabular-nums">
                          {emp.location} · {emp.utilizationPercent}% Utilized
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5C: SUB-VIEW 2 — HR & PAYROLL DIRECTORY (PTO ADJUDICATION, COMP TIERS & ONBOARDING) */}
      <section aria-label="HR and Payroll Directory">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Sub-View 02 · HR &amp; Payroll Directory
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                PTO Adjudication, Compensation Tiers &amp; Principal Onboarding
              </h2>
            </div>
            <p className="text-xs text-stone-600">
              Adjusting specialist compensation or onboarding new principals immediately recalculates the CEO Boardroom Net Profit Margin.
            </p>
          </div>

          {/* Part 1: Employee PTO Request Approval Queue */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-stone-900">
              Employee PTO &amp; Sabbatical Approval Queue ({ptoRequests.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ptoRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-stone-900">{req.employeeName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#8A6626] font-medium">{req.employeeRole}</span>
                    </div>
                    <div className="text-sm text-stone-700 font-medium">{req.reason}</div>
                    <div className="text-xs text-stone-500 tabular-nums">
                      {req.startDate} to {req.endDate} ({req.days} Business Days) · Coverage: {req.coverageSpecialist}
                    </div>
                    <div className="text-xs font-semibold pt-1">
                      Current Status:{' '}
                      <span
                        className={
                          req.status === 'Approved'
                            ? 'text-emerald-700'
                            : req.status === 'Declined'
                            ? 'text-rose-700'
                            : 'text-[#8A6626]'
                        }
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onDecidePtoRequest(req.id, 'Approved')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      Approve Leave
                    </button>
                    <button
                      type="button"
                      onClick={() => onDecidePtoRequest(req.id, 'Declined')}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part 2: Compensation Tier Directory */}
          <div className="space-y-4 pt-6 border-t border-stone-200/80">
            <h3 className="font-display text-xl font-semibold text-stone-900">
              Principal Compensation &amp; Payroll Ledger
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                    <th className="py-3 px-4">Specialist</th>
                    <th className="py-3 px-4">Position &amp; Office</th>
                    <th className="py-3 px-4">Compensation Tier</th>
                    <th className="py-3 px-4 text-right">Annual Base (USD)</th>
                    <th className="py-3 px-4 text-right">Adjust Compensation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/80 text-sm">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-stone-100/60">
                      <td className="py-3.5 px-4 font-semibold text-stone-900">{emp.name}</td>
                      <td className="py-3.5 px-4 text-xs text-stone-600">
                        {emp.role} · {emp.location}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#8A6626] font-medium">{emp.compensationTier}</td>
                      <td className="py-3.5 px-4 text-right font-display text-stone-900 font-semibold tabular-nums">
                        ${emp.annualBaseUsd.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateEmployeeCompensation(
                                emp.id,
                                'Tier I — Managing Principal',
                                emp.annualBaseUsd + 25000
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-[#8A6626] text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Promote +$25k
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Part 3: Onboard New Specialist Hire */}
          <div className="space-y-4 pt-6 border-t border-stone-200/80">
            <h3 className="font-display text-xl font-semibold text-stone-900">
              Onboard New Principal Specialist
            </h3>
            {onboardNotice && (
              <div className="p-3.5 rounded-xl bg-[#C5A059]/15 border border-[#C5A059] text-xs text-stone-900 font-medium">
                {onboardNotice}
              </div>
            )}
            <form onSubmit={handleOnboardSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label htmlFor="onboard-name" className="block text-xs text-stone-700 font-medium mb-1">
                  Full Legal Name
                </label>
                <input
                  id="onboard-name"
                  type="text"
                  value={newHireName}
                  onChange={(e) => setNewHireName(e.target.value)}
                  placeholder="e.g. Dr. Sebastian Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                />
              </div>
              <div>
                <label htmlFor="onboard-role" className="block text-xs text-stone-700 font-medium mb-1">
                  Specialist Position
                </label>
                <select
                  id="onboard-role"
                  value={newHireRole}
                  onChange={(e) => setNewHireRole(e.target.value as EmployeeRoleTitle)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                >
                  <option value="Principal Systems Architect">Principal Systems Architect</option>
                  <option value="Senior Financial Analyst">Senior Financial Analyst</option>
                  <option value="Lead Product Designer">Lead Product Designer</option>
                  <option value="Client Account Manager">Client Account Manager</option>
                </select>
              </div>
              <div>
                <label htmlFor="onboard-office" className="block text-xs text-stone-700 font-medium mb-1">
                  Global Office
                </label>
                <select
                  id="onboard-office"
                  value={newHireLocation}
                  onChange={(e) =>
                    setNewHireLocation(e.target.value as 'New York' | 'London' | 'Zurich' | 'Singapore')
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                >
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                  <option value="Zurich">Zurich</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
              <div>
                <label htmlFor="onboard-base" className="block text-xs text-stone-700 font-medium mb-1">
                  Annual Base Compensation
                </label>
                <input
                  id="onboard-base"
                  type="number"
                  step={10000}
                  value={newHireBase}
                  onChange={(e) => setNewHireBase(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432] tabular-nums"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-[#8A6626] transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>Onboard Specialist</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 5D: SUB-VIEW 3 — CLIENT COMMUNICATIONS DISPATCH DESK */}
      <section aria-label="Client Communications Dispatch Desk">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Sub-View 03 · Client Communications Dispatch (Live Sync with B2B Client Gateway)
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                Direct Practice Director Response Console
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {contracts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCommContractId(c.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tabular-nums cursor-pointer ${
                    activeCommContract?.id === c.id
                      ? 'bg-[#C5A059] text-[#0B0C10] font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {c.id} · {c.clientName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {activeCommContract && (
            <div className="space-y-4">
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {activeCommContract.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-stone-900">
                        {msg.senderName} <span className="text-[#8A6626]">({msg.senderRole})</span>
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700">{msg.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendDirectorReply} className="flex gap-3 pt-2">
                <input
                  type="text"
                  aria-label="Practice Director Reply Message"
                  value={directorReplyDraft}
                  onChange={(e) => setDirectorReplyDraft(e.target.value)}
                  placeholder={`Reply as ${activeCommContract.practiceDirector} (Practice Director) to ${activeCommContract.executiveSponsor}...`}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Partner Reply</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5E: LIVE CEO EXECUTIVE DIRECTIVES IN DIRECTOR HUB */}
      <section aria-label="Director Hub CEO Directives Feed">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Live Boardroom Feed · Synced from CEO Executive Boardroom
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                Active Executive Directives &amp; Practice Mandates ({directives.length})
              </h2>
            </div>
            <Bell className="w-5 h-5 text-[#9A7432]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directives.map((dir) => (
              <div
                key={dir.id}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/40 space-y-2"
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
