import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton, TextInput, useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

type InputToolbarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttach: () => void;
  onEmoji: () => void;
};

export function InputToolbar({
  value,
  onChangeText,
  onSend,
  onAttach,
  onEmoji,
}: InputToolbarProps) {
  const theme = useTheme<ThemeType>();
  const hasText = value.trim().length > 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.outline },
      ]}
    >
      <IconButton
        icon="paperclip"
        onPress={onAttach}
        mode="contained-tonal"
        iconColor={theme.colors.primary}
        containerColor="rgba(124,58,237,0.18)"
        size={20}
      />
      <TextInput
        mode="flat"
        value={value}
        onChangeText={onChangeText}
        placeholder="Type a message"
        style={styles.input}
        textColor={theme.colors.textPrimary}
        placeholderTextColor={theme.colors.textSecondary}
        selectionColor={theme.colors.primary}
        cursorColor={theme.colors.primary}
        activeUnderlineColor="transparent"
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
        multiline
      />
      <IconButton icon="emoticon-outline" iconColor={theme.colors.primary} onPress={onEmoji} size={22} />
      <IconButton
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name={hasText ? 'send' : 'microphone'}
            color={color}
            size={size}
          />
        )}
        onPress={onSend}
        mode="contained"
        containerColor={theme.colors.primary}
        iconColor="#FFFFFF"
        size={20}
        style={styles.sendButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    borderRadius: 22,
    maxHeight: 120,
    marginBottom: 2,
    backgroundColor: '#111111',
  },
  sendButton: {
    shadowColor: '#7C3AED',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
});
