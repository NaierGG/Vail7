import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text, useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  const theme = useTheme<ThemeType>();

  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: 'rgba(124,58,237,0.18)' }]}>
        <MaterialCommunityIcons name="chat-outline" size={30} color={theme.colors.primary} />
      </View>
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>{description}</Text>
      {actionLabel && onActionPress ? (
        <Button mode="contained" onPress={onActionPress} buttonColor={theme.colors.primary}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 12,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 4,
  },
  description: {
    textAlign: 'center',
    marginBottom: 4,
  },
});
