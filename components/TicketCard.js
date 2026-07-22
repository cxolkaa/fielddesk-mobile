import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import PriorityBadge from './PriorityBadge';
import StatusChip from './StatusChip';
import { colors, spacing } from '../constants/theme';

export default function TicketCard({ ticket, onPress, index = 0 }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        delay: Math.min(index * 40, 240),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        delay: Math.min(index * 40, 240),
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        accessibilityRole="button"
        accessibilityLabel={`Ticket ${ticket.id} ${ticket.title}`}
      >
        <View style={styles.topRow}>
          <Text style={styles.id}>{ticket.id}</Text>
          <StatusChip status={ticket.status} />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {ticket.title}
        </Text>
        <View style={styles.bottomRow}>
          <PriorityBadge priority={ticket.priority} />
          <Text style={styles.meta} numberOfLines={1}>
            {ticket.category} · {ticket.location}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardPressed: {
    borderColor: colors.teal,
    backgroundColor: colors.bgElevated,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  id: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  meta: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
  },
});
