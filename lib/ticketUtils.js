/** Priority order for sorting (higher = more urgent). */
const PRIORITY_RANK = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Filter tickets by priority and/or status.
 * Pass 'all' (or falsy) to skip a dimension.
 */
function filterTickets(tickets, { priority = 'all', status = 'all' } = {}) {
  if (!Array.isArray(tickets)) return [];
  return tickets.filter((t) => {
    const priorityOk = !priority || priority === 'all' || t.priority === priority;
    const statusOk = !status || status === 'all' || t.status === status;
    return priorityOk && statusOk;
  });
}

/**
 * Sort tickets by priority (critical first), then by updatedAt descending.
 */
function sortTicketsByPriority(tickets) {
  if (!Array.isArray(tickets)) return [];
  return [...tickets].sort((a, b) => {
    const rankDiff = (PRIORITY_RANK[b.priority] || 0) - (PRIORITY_RANK[a.priority] || 0);
    if (rankDiff !== 0) return rankDiff;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
}

/** Count tickets by status for simple dashboard stats. */
function countByStatus(tickets) {
  const counts = {
    open: 0,
    in_progress: 0,
    pending: 0,
    resolved: 0,
    closed: 0,
  };
  if (!Array.isArray(tickets)) return counts;
  for (const t of tickets) {
    if (counts[t.status] !== undefined) counts[t.status] += 1;
  }
  return counts;
}

function getTicketById(tickets, id) {
  if (!Array.isArray(tickets)) return undefined;
  return tickets.find((t) => t.id === id);
}

module.exports = {
  PRIORITY_RANK,
  filterTickets,
  sortTicketsByPriority,
  countByStatus,
  getTicketById,
};
