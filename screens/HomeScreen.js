import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { colors, spacing } from '../constants/theme';
import { TICKETS } from '../data/tickets';
import { countByStatus } from '../lib/ticketUtils';

export default function HomeScreen({ navigation }) {
  const counts = useMemo(() => countByStatus(TICKETS), []);
  const openish = counts.open + counts.in_progress + counts.pending;

  const tiles = [
    { key: 'open', label: 'Open', value: counts.open },
    { key: 'in_progress', label: 'In Progress', value: counts.in_progress },
    { key: 'pending', label: 'Pending', value: counts.pending },
    { key: 'resolved', label: 'Resolved', value: counts.resolved },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>FieldDesk</Text>
        <Text style={styles.subtitle}>
          Field technician workspace — tickets, priority, and site context.
        </Text>

        <View style={styles.heroStat}>
          <Text style={styles.heroValue}>{openish}</Text>
          <Text style={styles.heroLabel}>active tickets needing attention</Text>
        </View>

        <View style={styles.grid}>
          {tiles.map((tile) => (
            <View key={tile.key} style={styles.tile}>
              <Text style={styles.tileValue}>{tile.value}</Text>
              <Text style={styles.tileLabel}>{tile.label}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => navigation.navigate('Tickets')}
        >
          <Text style={styles.ctaText}>View ticket queue</Text>
        </Pressable>

        <Text style={styles.footnote}>
          Demo data only — no backend required. Built for IT Support / Mobile Dev portfolios.
        </Text>
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
  brand: {
    color: colors.teal,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.sm,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  heroStat: {
    backgroundColor: colors.bgCard,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.teal,
  },
  heroValue: {
    color: colors.text,
    fontSize: 40,
    fontWeight: '800',
  },
  heroLabel: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tile: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.bgElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  tileValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  tileLabel: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: 4,
  },
  cta: {
    backgroundColor: colors.teal,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaPressed: {
    backgroundColor: colors.tealDim,
  },
  ctaText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: '700',
  },
  footnote: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});
