const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  filterTickets,
  sortTicketsByPriority,
  countByStatus,
  getTicketById,
} = require('./ticketUtils');

const sample = [
  {
    id: 'A',
    priority: 'low',
    status: 'open',
    updatedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'B',
    priority: 'critical',
    status: 'in_progress',
    updatedAt: '2026-07-02T00:00:00Z',
  },
  {
    id: 'C',
    priority: 'high',
    status: 'open',
    updatedAt: '2026-07-03T00:00:00Z',
  },
];

describe('ticketUtils', () => {
  it('filters by priority and status', () => {
    const byPriority = filterTickets(sample, { priority: 'high' });
    assert.equal(byPriority.length, 1);
    assert.equal(byPriority[0].id, 'C');

    const openHigh = filterTickets(sample, { priority: 'high', status: 'open' });
    assert.equal(openHigh.length, 1);
    assert.equal(openHigh[0].id, 'C');

    const all = filterTickets(sample, { priority: 'all', status: 'all' });
    assert.equal(all.length, 3);
  });

  it('sorts critical first then by updatedAt', () => {
    const sorted = sortTicketsByPriority(sample);
    assert.deepEqual(
      sorted.map((t) => t.id),
      ['B', 'C', 'A']
    );
  });

  it('counts by status', () => {
    const counts = countByStatus(sample);
    assert.equal(counts.open, 2);
    assert.equal(counts.in_progress, 1);
    assert.equal(counts.closed, 0);
  });

  it('gets ticket by id', () => {
    assert.equal(getTicketById(sample, 'B').priority, 'critical');
    assert.equal(getTicketById(sample, 'missing'), undefined);
  });

  it('handles non-array input safely', () => {
    assert.deepEqual(filterTickets(null), []);
    assert.deepEqual(sortTicketsByPriority(undefined), []);
    assert.equal(countByStatus(null).open, 0);
  });
});
