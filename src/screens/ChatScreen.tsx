import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Divider, IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { chats, contacts, currentUserId, messages as allMessages } from '../data/mock';
import { ChatStackScreenProps } from '../navigation/types';
import { Avatar } from '../components/common/Avatar';
import { MessageBubble } from '../components/chat/MessageBubble';
import { InputToolbar } from '../components/chat/InputToolbar';
import { formatDateLabel } from '../utils/format';
import { ImagePreviewModal } from '../components/chat/ImagePreviewModal';
import { OptionsBottomSheet } from '../components/chat/OptionsBottomSheet';
import { Message } from '../types/models';
import { EmptyState } from '../components/common/EmptyState';
import { ThemeType } from '../theme/theme';

type DisplayItem =
  | { kind: 'date'; id: string; label: string }
  | { kind: 'message'; id: string; message: Message };

export function ChatScreen({ route, navigation }: ChatStackScreenProps<'Chat'>) {
  const theme = useTheme<ThemeType>();
  const insets = useSafeAreaInsets();
  const { chatId } = route.params;
  const chat = chats.find((entry) => entry.id === chatId);
  const primaryContact = contacts.find((entry) => entry.name === chat?.title || entry.id === chat?.contactIds[0]);

  const [draft, setDraft] = useState('');
  const [messageList, setMessageList] = useState<Message[]>(allMessages.filter((item) => item.chatId === chatId));
  const [previewImageUri, setPreviewImageUri] = useState<string | undefined>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const listRef = useRef<FlatList<DisplayItem>>(null);
  const optionsRef = useRef<BottomSheetModal>(null);

  const displayItems = useMemo<DisplayItem[]>(() => {
    const sorted = [...messageList].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
    );

    const items: DisplayItem[] = [];
    let currentLabel = '';

    sorted.forEach((message) => {
      const label = formatDateLabel(message.sentAt);
      if (label !== currentLabel) {
        items.push({ kind: 'date', id: `date-${message.id}`, label });
        currentLabel = label;
      }
      items.push({ kind: 'message', id: message.id, message });
    });

    return items;
  }, [messageList]);

  const sendMessage = async () => {
    if (!draft.trim()) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      return;
    }

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      chatId,
      senderId: currentUserId,
      contentType: 'text',
      text: draft.trim(),
      sentAt: new Date().toISOString(),
      read: false,
    };

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMessageList((prev) => {
      const next = [...prev, newMessage];
      return next;
    });
    setDraft('');
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  const openOptions = async () => {
    await Haptics.selectionAsync();
    optionsRef.current?.present();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, paddingTop: insets.top + 6 }]}>
        <IconButton
          icon="arrow-left"
          iconColor={theme.colors.textPrimary}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerCenter}>
          <Avatar
            name={chat?.title ?? 'Chat'}
            uri={primaryContact?.avatar}
            online={primaryContact?.online}
            size={38}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text variant="titleMedium" numberOfLines={1}>
              {chat?.title}
            </Text>
            <Text variant="labelSmall" style={{ color: theme.colors.textSecondary }}>
              {primaryContact?.online ? 'Online' : primaryContact?.status ?? 'Last seen recently'}
            </Text>
          </View>
        </View>
        <IconButton
          icon="video-outline"
          iconColor={theme.colors.primary}
          containerColor="rgba(124,58,237,0.14)"
          onPress={() => {}}
        />
        <IconButton
          icon="phone-outline"
          iconColor={theme.colors.primary}
          containerColor="rgba(124,58,237,0.14)"
          onPress={() => {}}
        />
        <IconButton icon="dots-vertical" iconColor={theme.colors.textPrimary} onPress={openOptions} />
      </View>

      <Divider style={{ backgroundColor: 'rgba(124,58,237,0.28)' }} />

      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        {displayItems.length === 0 ? (
          <EmptyState
            title="No messages yet"
            description="Start by sending a message in this chat."
          />
        ) : (
          <FlatList
            ref={listRef}
            data={displayItems}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              if (item.kind === 'date') {
                return (
                  <View style={styles.dateWrap}>
                    <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}>
                      {item.label}
                    </Text>
                  </View>
                );
              }

              return (
                <MessageBubble
                  message={item.message}
                  isMine={item.message.senderId === currentUserId}
                  onImagePress={(uri) => {
                    setPreviewImageUri(uri);
                    setPreviewVisible(true);
                  }}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
            removeClippedSubviews
            initialNumToRender={15}
            windowSize={7}
          />
        )}

        <InputToolbar
          value={draft}
          onChangeText={setDraft}
          onSend={sendMessage}
          onAttach={() => {}}
          onEmoji={() => {}}
        />
      </KeyboardAvoidingView>

      <ImagePreviewModal
        visible={previewVisible}
        imageUri={previewImageUri}
        onClose={() => setPreviewVisible(false)}
      />

      <OptionsBottomSheet
        ref={optionsRef}
        onMute={() => optionsRef.current?.dismiss()}
        onBlock={() => optionsRef.current?.dismiss()}
        onClear={() => {
          setMessageList([]);
          optionsRef.current?.dismiss();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  keyboardArea: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 14,
  },
  dateWrap: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(124,58,237,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
