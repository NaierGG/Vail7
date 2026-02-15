import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from 'react-native-paper';

import { ThemeType } from '../../theme/theme';

type AvatarProps = {
  size?: number;
  name: string;
  uri?: string;
  online?: boolean;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

export function Avatar({ size = 48, name, uri, online }: AvatarProps) {
  const theme = useTheme<ThemeType>();

  return (
    <View style={[styles.container, { width: size, height: size }]}> 
      {uri ? (
        <View
          style={[
            styles.imageWrap,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <Image
            source={uri}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            cachePolicy="memory-disk"
            transition={150}
            contentFit="cover"
          />
        </View>
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <Text style={[styles.initials, { color: theme.colors.primary }]}>{getInitials(name)}</Text>
        </View>
      )}
      {online ? (
        <View
          style={[
            styles.online,
            {
              backgroundColor: theme.colors.online,
              borderColor: theme.colors.surface,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.28)',
  },
  imageWrap: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  initials: {
    fontSize: 15,
    fontWeight: '700',
  },
  online: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    shadowColor: '#10B981',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
});
