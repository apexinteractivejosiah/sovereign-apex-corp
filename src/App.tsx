/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  PortalId,
  PracticeDivisionId,
  TeamSizeOption,
  DeliverableStatus,
  EmployeeRoleTitle,
  INITIAL_CONTRACTS,
  INITIAL_EMPLOYEES,
  INITIAL_PTO_REQUESTS,
  INITIAL_DIRECTIVES,
  RetainerContract,
  EmployeeProfile,
  PtoRequest,
  ExecutiveDirective,
  createRetainerContract,
  updateDeliverableStageStatus,
  calculateExecutiveMetrics
} from './utils/enterpriseLogic';
import { HeadquartersPortal } from './components/HeadquartersPortal';
import { SolutionsPortal } from './components/SolutionsPortal';
import { ClientPortal } from './components/ClientPortal';
import { EmployeePortal } from './components/EmployeePortal';
import { DirectorPortal } from './components/DirectorPortal';
import { CeoPortal } from './components/CeoPortal';

const PORTAL_NAV_ITEMS: { id: PortalId; label: string }[] = [
  { id: 'home', label: 'Headquarters' },
  { id: 'solutions', label: 'Retainer Configurator' },
  { id: 'client', label: 'B2B Client Portal' },
  { id: 'employee', label: 'Employee Workspace' },
  { id: 'director', label: 'Director & HR Hub' },
  { id: 'ceo', label: 'CEO Executive Boardroom' }
];

export default function App() {
  const [activePortal, setActivePortal] = useState<PortalId>('home');
  const [contracts, setContracts] = useState<RetainerContract[]>(INITIAL_CONTRACTS);
  const [employees, setEmployees] = useState<EmployeeProfile[]>(INITIAL_EMPLOYEES);
  const [ptoRequests, setPtoRequests] = useState<PtoRequest[]>(INITIAL_PTO_REQUESTS);
  const [directives, setDirectives] = useState<ExecutiveDirective[]>(INITIAL_DIRECTIVES);

  const [selectedDivisionForConfigurator, setSelectedDivisionForConfigurator] =
    useState<PracticeDivisionId>('01. Corporate Strategy & M&A');
  const [activeClientContractId, setActiveClientContractId] = useState<string>('SAC-4010');
  const [nextContractSeed, setNextContractSeed] = useState<number>(5092);

  const executiveMetrics = calculateExecutiveMetrics(contracts, employees);

  const handleNavigatePortal = (portal: PortalId) => {
    setActivePortal(portal);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectDivisionForConfigurator = (division: PracticeDivisionId) => {
    setSelectedDivisionForConfigurator(division);
    handleNavigatePortal('solutions');
  };

  const handleInspectContractInClientPortal = (contractId: string) => {
    setActiveClientContractId(contractId);
    handleNavigatePortal('client');
  };

  // Portal 2: Create new B2B Retainer Contract and sync across all portals
  const handleCreateContract = (params: {
    clientName: string;
    executiveSponsor: string;
    sponsorTitle: string;
    division: PracticeDivisionId;
    teamSize: TeamSizeOption;
    durationMonths: number;
    selectedModuleIds: string[];
  }): RetainerContract => {
    const newId = `SAC-${nextContractSeed}`;
    setNextContractSeed((prev) => prev + 14);
    const created = createRetainerContract({
      contractId: newId,
      ...params
    });
    setContracts((prev) => [created, ...prev]);
    setActiveClientContractId(created.id);
    return created;
  };

  // Portal 3 & 4: Update Deliverable Stage Status
  const handleUpdateDeliverableStatus = (
    contractId: string,
    stageNumber: number,
    newStatus: DeliverableStatus,
    additionalHours = 0,
    employeeId?: string
  ) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? updateDeliverableStageStatus(c, stageNumber, newStatus, additionalHours)
          : c
      )
    );

    if (employeeId && additionalHours > 0) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === employeeId
            ? {
                ...e,
                billableHoursYtd: e.billableHoursYtd + additionalHours,
                utilizationPercent: Math.min(99, e.utilizationPercent + 1)
              }
            : e
        )
      );
    }
  };

  // Portal 3: Approve Invoice
  const handleApproveInvoice = (contractId: string, invoiceId: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          invoices: c.invoices.map((inv) =>
            inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv
          )
        };
      })
    );
  };

  // Portal 3: Client sends message to Practice Director
  const handleSendClientMessage = (contractId: string, senderName: string, content: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          messages: [
            ...c.messages,
            {
              id: `msg-${Date.now()}`,
              senderName,
              senderRole: 'Client Executive',
              timestamp: 'Just now',
              content
            }
          ]
        };
      })
    );
  };

  // Portal 4: Employee submits PTO request to HR
  const handleSubmitPtoRequest = (params: {
    employeeId: string;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    coverageSpecialist: string;
  }) => {
    const emp = employees.find((e) => e.id === params.employeeId) || employees[0];
    const newReq: PtoRequest = {
      id: `pto-${Date.now()}`,
      employeeId: emp.id,
      employeeName: emp.name,
      employeeRole: emp.role,
      startDate: params.startDate,
      endDate: params.endDate,
      days: params.days,
      reason: params.reason,
      coverageSpecialist: params.coverageSpecialist,
      status: 'Pending HR Approval',
      submittedAt: '2026-11-17'
    };
    setPtoRequests((prev) => [newReq, ...prev]);
  };

  // Portal 5: Toggle Specialist Assignment on Contract
  const handleToggleEmployeeAssignment = (contractId: string, employeeId: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const exists = c.assignedEmployeeIds.includes(employeeId);
        const nextAssigned = exists
          ? c.assignedEmployeeIds.filter((id) => id !== employeeId)
          : [...c.assignedEmployeeIds, employeeId];
        return {
          ...c,
          assignedEmployeeIds: nextAssigned
        };
      })
    );
  };

  // Portal 5: HR approves or declines PTO request
  const handleDecidePtoRequest = (ptoId: string, decision: 'Approved' | 'Declined') => {
    setPtoRequests((prev) =>
      prev.map((req) => (req.id === ptoId ? { ...req, status: decision } : req))
    );
  };

  // Portal 5: HR updates specialist compensation
  const handleUpdateEmployeeCompensation = (
    employeeId: string,
    newTier: EmployeeProfile['compensationTier'],
    newBaseUsd: number
  ) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId
          ? { ...emp, compensationTier: newTier, annualBaseUsd: newBaseUsd }
          : emp
      )
    );
  };

  // Portal 5: HR onboards new specialist
  const handleOnboardEmployee = (params: {
    name: string;
    role: EmployeeRoleTitle;
    division: PracticeDivisionId;
    location: 'New York' | 'London' | 'Zurich' | 'Singapore';
    annualBaseUsd: number;
  }) => {
    const newEmp: EmployeeProfile = {
      id: `emp-${Date.now()}`,
      name: params.name,
      role: params.role,
      division: params.division,
      location: params.location,
      compensationTier: 'Tier II — Senior Partner Track',
      annualBaseUsd: params.annualBaseUsd,
      utilizationPercent: 88,
      billableHoursYtd: 420,
      securityClearance: 'Level 5 Sovereign Cryptographic'
    };
    setEmployees((prev) => [...prev, newEmp]);
  };

  // Portal 5: Practice Director replies to Client message
  const handleReplyClientMessage = (
    contractId: string,
    directorName: string,
    content: string
  ) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          messages: [
            ...c.messages,
            {
              id: `msg-${Date.now()}`,
              senderName: directorName,
              senderRole: 'Practice Director',
              timestamp: 'Just now',
              content
            }
          ]
        };
      })
    );
  };

  // Portal 6: CEO overrides contract status or director
  const handleOverrideContract = (
    contractId: string,
    newStatus: RetainerContract['status'],
    newDirector: string
  ) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? { ...c, status: newStatus, practiceDirector: newDirector }
          : c
      )
    );
  };

  // Portal 6: CEO publishes company-wide broadcast directive
  const handlePublishDirective = (params: {
    title: string;
    category: ExecutiveDirective['category'];
    priority: ExecutiveDirective['priority'];
    content: string;
  }) => {
    const newDir: ExecutiveDirective = {
      id: `dir-${Date.now()}`,
      title: params.title,
      category: params.category,
      priority: params.priority,
      content: params.content,
      author: 'Alistair Vance-Kensington, Chief Executive Officer',
      publishedAt: 'Just now · Sovereign Boardroom',
      targetPortals: ['employee', 'director']
    };
    setDirectives((prev) => [newDir, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 relative selection:bg-[#C5A059]/25 selection:text-stone-900">
      {/* 3 SLOW-PULSATING CIRCULAR AMBIENT GRADIENT ORBS (PREMIUM WARM ALABASTER & CHAMPAGNE GOLD) */}
      <div
        aria-hidden="true"
        className="w-[580px] h-[580px] rounded-full bg-[#C5A059]/20 blur-[150px] pointer-events-none fixed -top-32 -left-24 z-0 animate-orb-1"
      />
      <div
        aria-hidden="true"
        className="w-[640px] h-[640px] rounded-full bg-[#8C6239]/12 blur-[150px] pointer-events-none fixed top-1/3 -right-32 z-0 animate-orb-2"
      />
      <div
        aria-hidden="true"
        className="w-[560px] h-[560px] rounded-full bg-[#E6DEC8]/60 blur-[150px] pointer-events-none fixed -bottom-32 left-1/4 z-0 animate-orb-3"
      />

      {/* STICKY FROSTED GLASS NAVIGATION DOCK */}
      <header className="fixed top-0 inset-x-0 z-[100] backdrop-blur-3xl bg-[#FAF8F5]/85 border-b border-[#C5A059]/30 shadow-[0_4px_24px_rgba(28,25,23,0.04)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigatePortal('home')}
            className="font-display text-lg sm:text-xl font-semibold tracking-tight text-stone-900 hover:text-[#9A7432] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sovereign Apex Corp
          </button>

          {/* Zone 2: 6 Portal Navigation Links */}
          <nav
            aria-label="Corporate Enterprise Portals"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1"
          >
            {PORTAL_NAV_ITEMS.map((item) => {
              const isActive = activePortal === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigatePortal(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#C5A059]/20 text-[#8A6626] border border-[#C5A059]/50 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden xl:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleNavigatePortal('solutions')}
              className="px-4 py-2 rounded-xl bg-stone-900 text-[#FAF8F5] font-semibold text-xs tracking-wide hover:bg-stone-800 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              Commission Retainer
            </button>
          </div>
        </div>
      </header>

      {/* MAIN PORTAL VIEWPORT CONTAINER */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 pt-20">
        {activePortal === 'home' && (
          <HeadquartersPortal
            onNavigatePortal={handleNavigatePortal}
            onSelectDivisionForConfigurator={handleSelectDivisionForConfigurator}
            onInspectContractInClientPortal={handleInspectContractInClientPortal}
            contracts={contracts}
            annualRecurringRevenueUsd={executiveMetrics.annualRecurringRevenueUsd}
          />
        )}

        {activePortal === 'solutions' && (
          <SolutionsPortal
            initialDivision={selectedDivisionForConfigurator}
            contracts={contracts}
            onCreateContract={handleCreateContract}
            onInspectContractInClientPortal={handleInspectContractInClientPortal}
          />
        )}

        {activePortal === 'client' && (
          <ClientPortal
            contracts={contracts}
            employees={employees}
            activeContractId={activeClientContractId}
            onSelectContractId={setActiveClientContractId}
            onUpdateDeliverableStatus={(contractId, stageNumber, newStatus) =>
              handleUpdateDeliverableStatus(contractId, stageNumber, newStatus, 0)
            }
            onApproveInvoice={handleApproveInvoice}
            onSendClientMessage={handleSendClientMessage}
          />
        )}

        {activePortal === 'employee' && (
          <EmployeePortal
            employees={employees}
            contracts={contracts}
            ptoRequests={ptoRequests}
            directives={directives}
            onAdvanceTaskStatus={handleUpdateDeliverableStatus}
            onSubmitPtoRequest={handleSubmitPtoRequest}
            onInspectContractInClientPortal={handleInspectContractInClientPortal}
          />
        )}

        {activePortal === 'director' && (
          <DirectorPortal
            contracts={contracts}
            employees={employees}
            ptoRequests={ptoRequests}
            directives={directives}
            onToggleEmployeeAssignment={handleToggleEmployeeAssignment}
            onDecidePtoRequest={handleDecidePtoRequest}
            onUpdateEmployeeCompensation={handleUpdateEmployeeCompensation}
            onOnboardEmployee={handleOnboardEmployee}
            onReplyClientMessage={handleReplyClientMessage}
          />
        )}

        {activePortal === 'ceo' && (
          <CeoPortal
            contracts={contracts}
            employees={employees}
            directives={directives}
            onOverrideContract={handleOverrideContract}
            onPublishDirective={handlePublishDirective}
            onInspectContractInClientPortal={handleInspectContractInClientPortal}
          />
        )}
      </main>

      {/* QUIET EXECUTIVE FOOTER */}
      <footer className="relative z-10 border-t border-[#C5A059]/30 bg-white/80 backdrop-blur-2xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-stone-600">
          <div className="space-y-1">
            <div className="font-display text-base font-semibold text-stone-900">
              Sovereign Apex Corp — Global Strategy, Corporate Architecture &amp; Enterprise Advisory
            </div>
            <div>
              New York (425 Park Ave) · London (22 Bishopsgate) · Zurich (Bahnhofstrasse 64) · Singapore (8 Marina Blvd)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {PORTAL_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigatePortal(item.id)}
                className="hover:text-[#9A7432] font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
