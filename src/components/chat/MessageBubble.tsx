import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { Text, useTheme } from 'react-native-paper';

import { Message } from '../../types/models';
import { formatTime } from '../../utils/format';
import { ThemeType } from '../../theme/theme';

type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
  onImagePress?: (imageUri: string) => void;
};

export function MessageBubble({ message, isMine, onImagePress }: MessageBubbleProps) {
  const theme = useTheme<ThemeType>();

  const bubbleBackground = isMine ? theme.colors.sentBubble : theme.colors.receivedBubble;
  const textColor = theme.colors.textPrimary;

  return (
    <Animated.View
      entering={FadeInUp.duration(180)}
      layout={Layout.springify()}
      style={[styles.row, isMine ? styles.rowMine : styles.rowOther]}
    >
      <View
        style={[
          styles.bubble,
          { backgroundColor: bubbleBackground },
          isMine ? styles.mine : styles.other,
          isMine
            ? {
                shadowColor: theme.colors.primary,
                shadowOpacity: 0.45,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 2 },
              }
            : null,
        ]}
      >
        {isMine ? (
          <>
            <View
              style={[
                styles.sentOverlayOne,
                { backgroundColor: theme.colors.primaryDark },
              ]}
            />
            <View
              style={[
                styles.sentOverlayTwo,
                { backgroundColor: theme.colors.primaryLight },
              ]}
            />
          </>
        ) : null}

        {message.contentType === 'text' && message.text ? (
          <Text style={[styles.messageText, { color: textColor }]}>{message.text}</Text>
        ) : null}

        {message.contentType === 'image' && message.mediaUri ? (
          <View style={styles.mediaBlock}>
            <Pressable onPress={() => onImagePress?.(message.mediaUri as string)}>
              <Image
                source={message.mediaUri}
                style={styles.image}
                cachePolicy="memory-disk"
                contentFit="cover"
                transition={120}
              />
            </Pressable>
            {message.text ? (
              <Text style={[styles.caption, { color: textColor }]}>{message.text}</Text>
            ) : null}
          </View>
        ) : null}

        {message.contentType === 'file' ? (
          <View style={styles.fileWrap}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={18}
              color={isMine ? theme.colors.textPrimary : theme.colors.primary}
            />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ color: textColor, fontWeight: '600' }}>
                {message.fileName}
              </Text>
              {message.text ? <Text style={{ color: textColor }}>{message.text}</Text> : null}
            </View>
          </View>
        ) : null}

        <View style={styles.meta}>
          <Text
            style={[
              styles.time,
              {
                color: isMine ? 'rgba(255,255,255,0.82)' : theme.colors.textSecondary,
              },
            ]}
          >
            {formatTime(message.sentAt)}
          </Text>
          {isMine ? (
            <MaterialCommunityIcons
              name={message.read ? 'check-all' : 'check'}
              size={14}
              color={message.read ? '#D9CCFF' : 'rgba(255,255,255,0.82)'}
            />
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 2,
    paddingHorizontal: 12,
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  rowOther: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    overflow: 'hidden',
  },
  mine: {
    borderBottomRightRadius: 6,
  },
  other: {
    borderBottomLeftRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  sentOverlayOne: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.64,
  },
  sentOverlayTwo: {
    position: 'absolute',
    top: -8,
    left: -4,
    right: 40,
    bottom: 22,
    borderBottomRightRadius: 26,
    opacity: 0.55,
  },
  mediaBlock: {
    gap: 8,
  },
  image: {
    width: 220,
    height: 160,
    borderRadius: 14,
  },
  caption: {
    paddingHorizontal: 2,
  },
  messageText: {
    lineHeight: 20,
  },
  fileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 180,
  },
  meta: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  time: {
    fontSize: 11,
  },
});
