import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import {
  RetainerContract,
  EmployeeProfile,
  ExecutiveDirective,
  calculateExecutiveMetrics,
  VERIFIED_CORPORATE_ASSETS
} from '../utils/enterpriseLogic';

interface CeoPortalProps {
  contracts: RetainerContract[];
  employees: EmployeeProfile[];
  directives: ExecutiveDirective[];
  onOverrideContract: (
    contractId: string,
    newStatus: RetainerContract['status'],
    newDirector: string
  ) => void;
  onPublishDirective: (params: {
    title: string;
    category: ExecutiveDirective['category'];
    priority: ExecutiveDirective['priority'];
    content: string;
  }) => void;
  onInspectContractInClientPortal: (contractId: string) => void;
}

const PRACTICE_DIRECTORS = [
  'Victoria Sterling',
  'Marcus Vance',
  'Elena Rostova',
  'Arthur Pendelton'
];

export const CeoPortal: React.FC<CeoPortalProps> = ({
  contracts,
  employees,
  directives,
  onOverrideContract,
  onPublishDirective,
  onInspectContractInClientPortal
}) => {
  const [directiveTitle, setDirectiveTitle] = useState<string>('');
  const [directiveCategory, setDirectiveCategory] =
    useState<ExecutiveDirective['category']>('Capital Allocation');
  const [directivePriority, setDirectivePriority] =
    useState<ExecutiveDirective['priority']>('Immediate Mandate');
  const [directiveContent, setDirectiveContent] = useState<string>('');
  const [directiveConfirm, setDirectiveConfirm] = useState<string | null>(null);

  const metrics = calculateExecutiveMetrics(contracts, employees);
  const boardroomAsset = VERIFIED_CORPORATE_ASSETS[1]; // 54th Floor Executive Boardroom & Strategy Suite

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directiveTitle.trim() || !directiveContent.trim()) return;
    onPublishDirective({
      title: directiveTitle.trim(),
      category: directiveCategory,
      priority: directivePriority,
      content: directiveContent.trim()
    });
    setDirectiveConfirm(
      `Executive Directive "${directiveTitle.trim()}" broadcast live to all Employee and Practice Director portals.`
    );
    setDirectiveTitle('');
    setDirectiveContent('');
  };

  return (
    <div className="space-y-14 pb-20 pt-6">
      {/* SECTION 6A: CEO MASTER COMMAND ROOM HEADER & 54TH FLOOR BOARDROOM SHOWCASE */}
      <section aria-label="CEO Master Command Room Header">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Portal 06 · Chief Executive Officer Master Command Room &amp; Sovereign ERP
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900">
                CEO Executive Boardroom
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Real-time synthesis of firm-wide Annual Recurring Revenue (ARR), Net Profit Margin, and Department Utilization. Exercise board-level contract overrides or broadcast binding Executive Directives across all global practices.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-52 rounded-2xl overflow-hidden border border-[#C5A059]/40 bg-stone-200 shadow-md">
                <img
                  src={boardroomAsset.url}
                  alt={boardroomAsset.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/85 via-[#0B0C10]/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#E5C378] font-semibold">
                    {boardroomAsset.city} · {boardroomAsset.floorCount}
                  </div>
                  <div className="font-display text-base font-semibold text-white">
                    {boardroomAsset.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6B: LIVE ARR, NET PROFIT MARGIN & DEPARTMENT UTILIZATION GAUGES */}
      <section aria-label="Executive Financial and Utilization Gauges">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gauge 1: Live Annual Recurring Revenue (ARR) */}
          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Live Annual Recurring Revenue (ARR)</span>
              <TrendingUp className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-4xl font-semibold text-[#8A6626] tabular-nums">
              ${metrics.annualRecurringRevenueUsd.toLocaleString()}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-600 tabular-nums">
                <span>Total Portfolio Contract Value:</span>
                <span className="font-semibold text-stone-900">${metrics.totalPortfolioContractValueUsd.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                <div className="h-full bg-[#9A7432]" style={{ width: '84%' }} />
              </div>
              <p className="text-xs text-stone-500">
                Automatically recalculated across {metrics.activeRetainerCount} active institutional retainers.
              </p>
            </div>
          </div>

          {/* Gauge 2: Net Profit Margin */}
          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Consolidated Net Profit Margin</span>
              <Award className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-4xl font-semibold text-stone-900 tabular-nums">
              {metrics.netProfitMarginPercent}%
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-600 tabular-nums">
                <span>Specialist Base Payroll Pool:</span>
                <span className="font-semibold text-stone-900">${metrics.totalAnnualPayrollUsd.toLocaleString()} / yr</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, metrics.netProfitMarginPercent)}%` }}
                />
              </div>
              <p className="text-xs text-stone-500">
                Exceeds Q4 Sovereign Board target benchmark of 44.5% net operating margin.
              </p>
            </div>
          </div>

          {/* Gauge 3: Department Utilization */}
          <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Global Department Utilization</span>
              <ShieldCheck className="w-4 h-4 text-[#9A7432]" />
            </div>
            <div className="font-display text-4xl font-semibold text-stone-900 tabular-nums">
              {metrics.averageUtilizationPercent}%
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-600 tabular-nums">
                <span>Active Principal Headcount:</span>
                <span className="font-semibold text-stone-900">{employees.length} Managing Specialists</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-[#9A7432] transition-all duration-500"
                  style={{ width: `${Math.min(100, metrics.averageUtilizationPercent)}%` }}
                />
              </div>
              <p className="text-xs text-stone-500">
                Live billable capacity across New York, London, Zurich, and Singapore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6C: EXECUTIVE CONTRACT OVERRIDE TABLE */}
      <section aria-label="Executive Contract Override Table">
        <div className="backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Sovereign Governance Authority · Immediate Cross-Portal Sync
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
                Executive Contract Override Table
              </h2>
            </div>
            <p className="text-xs text-stone-600">
              Approve high-value retainers, escalate contract governance status, or reallocate Managing Practice Directors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                  <th className="py-3.5 px-4">Contract ID</th>
                  <th className="py-3.5 px-4">Client &amp; Division</th>
                  <th className="py-3.5 px-4 text-right">Monthly / Total Value</th>
                  <th className="py-3.5 px-4">Practice Director Override</th>
                  <th className="py-3.5 px-4">Contract Status Override</th>
                  <th className="py-3.5 px-4 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 text-sm">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-stone-100/60">
                    <td className="py-4 px-4 font-semibold text-[#8A6626] tabular-nums">
                      {contract.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-stone-900">{contract.clientName}</div>
                      <div className="text-xs text-stone-500">{contract.division}</div>
                    </td>
                    <td className="py-4 px-4 text-right tabular-nums">
                      <div className="font-display font-semibold text-stone-900">
                        ${contract.monthlyRetainerUsd.toLocaleString()} / mo
                      </div>
                      <div className="text-xs text-[#8A6626] font-medium">
                        ${contract.totalContractValueUsd.toLocaleString()} total
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        aria-label={`Practice Director for ${contract.id}`}
                        value={contract.practiceDirector}
                        onChange={(e) =>
                          onOverrideContract(contract.id, contract.status, e.target.value)
                        }
                        className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                      >
                        {PRACTICE_DIRECTORS.map((dir) => (
                          <option key={dir} value={dir}>
                            {dir}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        aria-label={`Governance Status for ${contract.id}`}
                        value={contract.status}
                        onChange={(e) =>
                          onOverrideContract(
                            contract.id,
                            e.target.value as RetainerContract['status'],
                            contract.practiceDirector
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                      >
                        <option value="Active Execution">Active Execution</option>
                        <option value="Executive Review">Executive Review</option>
                        <option value="Priority Escalated">Priority Escalated</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onInspectContractInClientPortal(contract.id)}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-[#8A6626] text-white text-xs font-medium transition-colors inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6D: COMPANY-WIDE BROADCAST & EXECUTIVE DIRECTIVE PUBLISHER */}
      <section aria-label="Company-Wide Broadcast and Executive Directive Publisher">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 6 Columns: Publish New Directive Form */}
          <div className="lg:col-span-6 backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Boardroom Dispatch · Publishes to Employee &amp; Director Portals
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                Company-Wide Broadcast &amp; Executive Directive Publisher
              </h2>
            </div>

            {directiveConfirm && (
              <div
                role="status"
                className="p-4 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059] text-xs text-stone-900 font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8A6626] shrink-0" />
                <span>{directiveConfirm}</span>
              </div>
            )}

            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <div>
                <label htmlFor="directive-title" className="block text-xs text-stone-700 font-medium mb-1.5">
                  Executive Directive Headline
                </label>
                <input
                  id="directive-title"
                  type="text"
                  value={directiveTitle}
                  onChange={(e) => setDirectiveTitle(e.target.value)}
                  placeholder="e.g. Q1 Sovereign Wealth Advisory Expansion Mandate"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="directive-cat" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Governance Category
                  </label>
                  <select
                    id="directive-cat"
                    value={directiveCategory}
                    onChange={(e) =>
                      setDirectiveCategory(e.target.value as ExecutiveDirective['category'])
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                  >
                    <option value="Capital Allocation">Capital Allocation</option>
                    <option value="Global Governance">Global Governance</option>
                    <option value="Practice Mandate">Practice Mandate</option>
                    <option value="Organizational Architecture">Organizational Architecture</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="directive-prio" className="block text-xs text-stone-700 font-medium mb-1.5">
                    Enforcement Priority
                  </label>
                  <select
                    id="directive-prio"
                    value={directivePriority}
                    onChange={(e) =>
                      setDirectivePriority(e.target.value as ExecutiveDirective['priority'])
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#9A7432]"
                  >
                    <option value="Immediate Mandate">Immediate Mandate</option>
                    <option value="Quarterly Directive">Quarterly Directive</option>
                    <option value="Board Resolution">Board Resolution</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="directive-body" className="block text-xs text-stone-700 font-medium mb-1.5">
                  Directive Text &amp; Partner Instructions
                </label>
                <textarea
                  id="directive-body"
                  rows={4}
                  value={directiveContent}
                  onChange={(e) => setDirectiveContent(e.target.value)}
                  placeholder="Enter full executive directive for immediate distribution to all Practice Directors and Principal Specialists..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#9A7432]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-[#8A6626] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Publish Company-Wide Executive Directive</span>
              </button>
            </form>
          </div>

          {/* Right 6 Columns: Active Directives Registry */}
          <div className="lg:col-span-6 backdrop-blur-3xl bg-white/85 border border-[#C5A059]/30 shadow-[0_16px_48px_rgba(28,25,23,0.06)] rounded-3xl p-8 space-y-5">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A6626] font-semibold">
                Active Corporate Broadcast Log
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
                Published Boardroom Directives ({directives.length})
              </h2>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {directives.map((dir) => (
                <div
                  key={dir.id}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-2"
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
                    Signed: <span className="text-stone-900 font-medium">{dir.author}</span>
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
