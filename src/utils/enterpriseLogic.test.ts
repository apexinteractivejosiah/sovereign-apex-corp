import test from 'node:test';
import assert from 'node:assert/strict';
import {
  VERIFIED_CORPORATE_ASSETS,
  INITIAL_CONTRACTS,
  INITIAL_EMPLOYEES,
  calculateRetainerQuote,
  createRetainerContract,
  updateDeliverableStageStatus,
  calculateExecutiveMetrics,
  computeContractProgress
} from './enterpriseLogic';

test('strict 1-to-1 image-to-label mapping matches exact verified URLs', () => {
  assert.equal(VERIFIED_CORPORATE_ASSETS.length, 4);
  const byLabel = Object.fromEntries(VERIFIED_CORPORATE_ASSETS.map((a) => [a.label, a.url]));

  assert.equal(
    byLabel['Sovereign Global Tower — New York & London Headquarters'],
    '/assets/images/sovereign-tower.jpg'
  );
  assert.equal(
    byLabel['54th Floor Executive Boardroom & Strategy Suite'],
    '/assets/images/executive-boardroom.jpg'
  );
  assert.equal(
    byLabel['Principal Engineering & Design Floor'],
    '/assets/images/engineering-floor.jpg'
  );
  assert.equal(
    byLabel['Private Client Briefing & Hospitality Lounge'],
    '/assets/images/client-lounge.jpg'
  );
});

test('calculateRetainerQuote computes monthly and total contract value accurately', () => {
  const quote = calculateRetainerQuote({
    division: '02. Enterprise Systems Architecture',
    teamSize: 'Full Department of 8',
    durationMonths: 12,
    selectedModuleIds: ['mod-erp']
  });

  // Base 185,000 * 1.85 = 342,250 + 48,000 = 390,250; 12 months gives 5% institutional discount -> 370,738
  assert.equal(quote.headcount, 8);
  assert.equal(quote.durationDiscountPercent, 5);
  assert.equal(quote.monthlyRetainerUsd, 370738);
  assert.equal(quote.totalContractValueUsd, 370738 * 12);
});

test('createRetainerContract initializes 5-stage deliverable roadmap and syncs progress', () => {
  const contract = createRetainerContract({
    contractId: 'SAC-5092',
    clientName: 'Meridian Global Bancorp',
    executiveSponsor: 'Victoria Sterling-Hayes',
    sponsorTitle: 'Group Chief Strategy Officer',
    division: '01. Corporate Strategy & M&A',
    teamSize: 'Dedicated Pod of 3',
    durationMonths: 6,
    selectedModuleIds: ['mod-dd', 'mod-pmi']
  });

  assert.equal(contract.id, 'SAC-5092');
  assert.equal(contract.deliverables.length, 5);
  assert.equal(contract.deliverables[0].name, 'Discovery & Audit');
  assert.equal(contract.deliverables[0].status, 'In Progress');
  assert.equal(contract.progressPercent, computeContractProgress(contract.deliverables));
});

test('updateDeliverableStageStatus advances deliverable and recalculates contract progress', () => {
  const baseContract = INITIAL_CONTRACTS[0]; // SAC-4010 (progress 65%)
  const updated = updateDeliverableStageStatus(baseContract, 3, 'Approved', 25);

  const stage3 = updated.deliverables.find((d) => d.stageNumber === 3)!;
  assert.equal(stage3.status, 'Approved');
  assert.equal(stage3.hoursLogged, 285 + 25);
  assert.ok(updated.progressPercent > baseContract.progressPercent);
});

test('calculateExecutiveMetrics computes live ARR, net profit margin, and utilization', () => {
  const metricsBaseline = calculateExecutiveMetrics(INITIAL_CONTRACTS, INITIAL_EMPLOYEES);
  assert.equal(metricsBaseline.annualRecurringRevenueUsd, (425000 + 520000) * 12);
  assert.ok(metricsBaseline.netProfitMarginPercent > 40);
  assert.equal(metricsBaseline.averageUtilizationPercent, 90);
});
