import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const STATUS_META = {
  open: { label: 'Open', color: colors.open },
  in_progress: { label: 'In Progress', color: colors.inProgress },
  pending: { label: 'Pending', color: colors.pending },
  resolved: { label: 'Resolved', color: colors.resolved },
  closed: { label: 'Closed', color: colors.closed },
};

export default function StatusChip({ status }) {
  const meta = STATUS_META[status] || { label: status || 'Unknown', color: colors.textDim };

  return (
    <View style={[styles.chip, { backgroundColor: `${meta.color}22` }]}>
      <Text style={[styles.label, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
