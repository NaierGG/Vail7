import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

type SwipeableChatItemProps = {
  children: React.ReactNode;
  onDelete: () => void;
  onArchive: () => void;
};

export function SwipeableChatItem({ children, onArchive, onDelete }: SwipeableChatItemProps) {
  const theme = useTheme<ThemeType>();

  return (
    <Swipeable
      friction={2}
      rightThreshold={30}
      renderRightActions={() => (
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={onArchive}
            style={[styles.action, { backgroundColor: theme.colors.primaryDark }]}
          >
            <MaterialCommunityIcons name="archive-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Archive</Text>
          </Pressable>
          <Pressable
            onPress={onDelete}
            style={[styles.action, { backgroundColor: theme.colors.error }]}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
      )}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  action: {
    width: 86,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 14,
    marginLeft: 8,
    paddingHorizontal: 10,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
