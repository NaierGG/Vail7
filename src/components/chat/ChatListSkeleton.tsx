import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

export function ChatListSkeleton() {
  const theme = useTheme<ThemeType>();
  const pulse = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 8, gap: 14 }}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Animated.View key={idx} style={[styles.row, { opacity: pulse }]}> 
          <View style={[styles.circle, { backgroundColor: 'rgba(124,58,237,0.28)' }]} />
          <View style={styles.lines}>
            <View style={[styles.lineLong, { backgroundColor: theme.colors.card }]} />
            <View style={[styles.lineShort, { backgroundColor: 'rgba(124,58,237,0.22)' }]} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  lines: {
    flex: 1,
    gap: 8,
  },
  lineLong: {
    width: '72%',
    height: 14,
    borderRadius: 7,
  },
  lineShort: {
    width: '50%',
    height: 12,
    borderRadius: 6,
  },
});
