import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Contact } from '../../types/models';
import { Avatar } from './Avatar';
import { ThemeType } from '../../theme/theme';

type ContactListItemProps = {
  contact: Contact;
  onPress?: () => void;
  selected?: boolean;
  subtitle?: string;
  rightAccessory?: React.ReactNode;
};

export function ContactListItem({
  contact,
  onPress,
  selected,
  subtitle,
  rightAccessory,
}: ContactListItemProps) {
  const theme = useTheme<ThemeType>();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: selected
            ? 'rgba(124,58,237,0.18)'
            : pressed
              ? theme.colors.surfaceVariant
              : 'transparent',
          borderColor: selected ? theme.colors.primary : 'transparent',
        },
      ]}
    >
      <Avatar name={contact.name} uri={contact.avatar} online={contact.online} />
      <View style={styles.content}>
        <Text variant="titleMedium" numberOfLines={1}>
          {contact.name}
        </Text>
        <Text variant="bodySmall" numberOfLines={1} style={{ color: theme.colors.onSurfaceVariant }}>
          {subtitle ?? contact.status}
        </Text>
      </View>
      {rightAccessory ? <View style={styles.right}>{rightAccessory}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    minHeight: 72,
    borderWidth: 1,
  },
  content: {
    marginLeft: 12,
    flex: 1,
    gap: 2,
  },
  right: {
    marginLeft: 12,
  },
});
