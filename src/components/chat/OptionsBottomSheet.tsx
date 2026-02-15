import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native-gesture-handler';
import { Divider, Text, useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

type OptionsBottomSheetProps = {
  onMute: () => void;
  onBlock: () => void;
  onClear: () => void;
};

export const OptionsBottomSheet = forwardRef<BottomSheetModal, OptionsBottomSheetProps>(
  function OptionsBottomSheet({ onMute, onBlock, onClear }, ref) {
    const theme = useTheme<ThemeType>();
    const snapPoints = useMemo(() => ['32%'], []);

    const options = [
      {
        key: 'mute',
        icon: 'bell-off-outline',
        label: 'Mute notifications',
        onPress: onMute,
        color: theme.colors.onSurface,
      },
      {
        key: 'block',
        icon: 'block-helper',
        label: 'Block contact',
        onPress: onBlock,
        color: theme.colors.warning,
      },
      {
        key: 'clear',
        icon: 'delete-outline',
        label: 'Clear chat history',
        onPress: onClear,
        color: theme.colors.error,
      },
    ];

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.outline }}
      >
        <BottomSheetView style={styles.sheetContent}>
          {options.map((item, index) => (
            <View key={item.key}>
              <Pressable style={styles.option} onPress={item.onPress}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
                <Text variant="titleMedium" style={{ color: item.color }}>
                  {item.label}
                </Text>
              </Pressable>
              {index < options.length - 1 ? <Divider /> : null}
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
});
