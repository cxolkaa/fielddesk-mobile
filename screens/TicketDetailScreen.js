import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import PriorityBadge from '../components/PriorityBadge';
import StatusChip from '../components/StatusChip';
import { colors, spacing } from '../constants/theme';
import { TICKETS } from '../data/tickets';
import { getTicketById } from '../lib/ticketUtils';

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function formatWhen(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function TicketDetailScreen({ route }) {
  const { ticketId } = route.params;
  const ticket = useMemo(() => getTicketById(TICKETS, ticketId), [ticketId]);

  if (!ticket) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.missing}>Ticket not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.id}>{ticket.id}</Text>
        <Text style={styles.title}>{ticket.title}</Text>

        <View style={styles.badges}>
          <PriorityBadge priority={ticket.priority} />
          <StatusChip status={ticket.status} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>{ticket.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Field notes</Text>
          <Text style={styles.body}>{ticket.notes}</Text>
        </View>

        <View style={styles.metaCard}>
          <Field label="Category" value={ticket.category} />
          <Field label="Location" value={ticket.location} />
          <Field label="Assignee" value={ticket.assignee} />
          <Field label="Requester" value={ticket.requester} />
          <Field label="Created" value={formatWhen(ticket.createdAt)} />
          <Field label="Updated" value={formatWhen(ticket.updatedAt)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  missing: {
    color: colors.textMuted,
    padding: spacing.lg,
  },
  id: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    lineHeight: 30,
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  metaCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.md,
  },
  field: {},
  fieldLabel: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  fieldValue: {
    color: colors.text,
    fontSize: 15,
  },
});
