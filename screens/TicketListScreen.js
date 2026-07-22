import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import TicketCard from '../components/TicketCard';
import { colors, spacing } from '../constants/theme';
import { TICKETS } from '../data/tickets';
import { filterTickets, sortTicketsByPriority } from '../lib/ticketUtils';

const PRIORITY_FILTERS = ['all', 'critical', 'high', 'medium', 'low'];
const STATUS_FILTERS = ['all', 'open', 'in_progress', 'pending', 'resolved', 'closed'];

const STATUS_LABELS = {
  all: 'All',
  open: 'Open',
  in_progress: 'In Progress',
  pending: 'Pending',
  resolved: 'Resolved',
  closed: 'Closed',
};

function FilterChip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.filterChip, active && styles.filterChipActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

export default function TicketListScreen({ navigation }) {
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  const tickets = useMemo(() => {
    const filtered = filterTickets(TICKETS, { priority, status });
    return sortTicketsByPriority(filtered);
  }, [priority, status]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.heading}>Ticket queue</Text>
        <Text style={styles.count}>{tickets.length} shown</Text>
      </View>

      <Text style={styles.filterLabel}>Priority</Text>
      <View style={styles.filterRow}>
        {PRIORITY_FILTERS.map((p) => (
          <FilterChip
            key={p}
            label={p === 'all' ? 'All' : p}
            active={priority === p}
            onPress={() => setPriority(p)}
          />
        ))}
      </View>

      <Text style={styles.filterLabel}>Status</Text>
      <View style={styles.filterRow}>
        {STATUS_FILTERS.map((s) => (
          <FilterChip
            key={s}
            label={STATUS_LABELS[s]}
            active={status === s}
            onPress={() => setStatus(s)}
          />
        ))}
      </View>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No tickets match these filters.</Text>
        }
        renderItem={({ item, index }) => (
          <TicketCard
            ticket={item}
            index={index}
            onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  count: {
    color: colors.textMuted,
    fontSize: 13,
  },
  filterLabel: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.md,
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    borderColor: colors.teal,
    backgroundColor: colors.tealSoft,
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: colors.teal,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
