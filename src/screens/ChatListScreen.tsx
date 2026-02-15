import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Searchbar, Text, Badge, FAB, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { chats as initialChats, contacts } from '../data/mock';
import { ChatStackScreenProps } from '../navigation/types';
import { Avatar } from '../components/common/Avatar';
import { formatChatListTime } from '../utils/format';
import { SwipeableChatItem } from '../components/chat/SwipeableChatItem';
import { ChatListSkeleton } from '../components/chat/ChatListSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ChatPreview } from '../types/models';
import { ThemeType } from '../theme/theme';

const ITEM_HEIGHT = 88;

export function ChatListScreen({ navigation }: ChatStackScreenProps<'ChatList'>) {
  const theme = useTheme<ThemeType>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatItems, setChatItems] = useState<ChatPreview[]>(initialChats);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) {
      return chatItems;
    }

    return chatItems.filter(
      (chat) =>
        chat.title.toLowerCase().includes(text) ||
        chat.lastMessage.toLowerCase().includes(text),
    );
  }, [chatItems, query]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setRefreshing(false);
  };

  const deleteChat = async (id: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setChatItems((prev) => prev.filter((chat) => chat.id !== id));
  };

  const archiveChat = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const renderChatItem = ({ item, index }: { item: ChatPreview; index: number }) => {
    const contact = contacts.find((entry) => entry.name === item.title || entry.id === item.contactIds[0]);

    return (
      <Animated.View entering={FadeInDown.delay(index * 40).duration(240)}>
        <SwipeableChatItem onArchive={archiveChat} onDelete={() => deleteChat(item.id)}>
          <Pressable
            style={({ pressed }) => [
              styles.chatRow,
              {
                backgroundColor: pressed ? theme.colors.card : theme.colors.surface,
                borderColor: pressed ? theme.colors.primary : 'rgba(124,58,237,0.16)',
              },
            ]}
            onPress={async () => {
              await Haptics.selectionAsync();
              navigation.navigate('Chat', { chatId: item.id });
            }}
          >
            <Avatar
              name={item.title}
              uri={contact?.avatar}
              online={contact?.online}
              size={52}
            />
            <View style={styles.content}>
              <View style={styles.nameRow}>
                <Text variant="titleMedium" numberOfLines={1} style={styles.name}>
                  {item.title}
                </Text>
                <Text variant="labelSmall" style={{ color: theme.colors.textSecondary }}>
                  {formatChatListTime(item.timestamp)}
                </Text>
              </View>
              <View style={styles.previewRow}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: item.typing ? theme.colors.primaryLight : theme.colors.onSurfaceVariant,
                    flex: 1,
                  }}
                >
                  {item.lastMessage}
                </Text>
                {item.unreadCount > 0 ? (
                  <Badge style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                    {item.unreadCount}
                  </Badge>
                ) : null}
              </View>
            </View>
          </Pressable>
        </SwipeableChatItem>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          CipherChat
        </Text>
        <IconButton
          icon="cog-outline"
          iconColor={theme.colors.primary}
          containerColor="rgba(124,58,237,0.16)"
          onPress={() => navigation.getParent()?.navigate('SettingsTab')}
        />
      </View>

      <Searchbar
        value={query}
        onChangeText={setQuery}
        placeholder="Search chats"
        style={[styles.search, { backgroundColor: theme.colors.surface }]}
        inputStyle={{ color: theme.colors.textPrimary }}
        iconColor={theme.colors.primary}
      />

      {loading ? (
        <ChatListSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No chats found"
          description="Try another keyword or start a new conversation."
          actionLabel="New chat"
          onActionPress={() => navigation.navigate('NewChat')}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
              progressBackgroundColor={theme.colors.surface}
            />
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          initialNumToRender={10}
          windowSize={5}
        />
      )}

      <FAB
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="message-plus-outline" color={color} size={size} />
        )}
        style={[styles.fab, { backgroundColor: theme.colors.primary, bottom: insets.bottom + 22 }]}
        onPress={() => navigation.navigate('NewChat')}
        label="New Chat"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '700',
  },
  search: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 120,
    paddingTop: 2,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 80,
    marginVertical: 4,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    shadowColor: '#7C3AED',
    shadowOpacity: 0.56,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
  },
  badge: {
    minWidth: 24,
  },
});
