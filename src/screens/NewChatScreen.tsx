import React, { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Searchbar, Text, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { chats, contacts } from '../data/mock';
import { ChatStackScreenProps } from '../navigation/types';
import { ContactListItem } from '../components/common/ContactListItem';
import { ThemeType } from '../theme/theme';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function NewChatScreen({ navigation }: ChatStackScreenProps<'NewChat'>) {
  const theme = useTheme<ThemeType>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const listRef = useRef<FlatList<typeof contacts[number]>>(null);

  const sortedContacts = useMemo(
    () => [...contacts].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const filteredContacts = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) {
      return sortedContacts;
    }

    return sortedContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lower) ||
        contact.phone.toLowerCase().includes(lower),
    );
  }, [query, sortedContacts]);

  const jumpToLetter = (letter: string) => {
    const index = filteredContacts.findIndex((contact) =>
      contact.name.toUpperCase().startsWith(letter),
    );

    if (index >= 0) {
      listRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <IconButton icon="arrow-left" iconColor={theme.colors.textPrimary} onPress={() => navigation.goBack()} />
        <Text variant="headlineSmall" style={styles.title}>
          New Chat
        </Text>
      </View>

      <Searchbar
        placeholder="Search contacts"
        value={query}
        onChangeText={setQuery}
        style={[styles.search, { backgroundColor: theme.colors.surface }]}
        iconColor={theme.colors.primary}
        inputStyle={{ color: theme.colors.textPrimary }}
      />

      <Pressable
        style={[styles.groupButton, { backgroundColor: theme.colors.primary }]}
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.navigate('GroupChatCreation');
        }}
      >
        <Text variant="titleMedium" style={{ color: theme.colors.textPrimary, fontWeight: '700' }}>
          Create Group Chat
        </Text>
      </Pressable>

      <View style={styles.body}>
        <FlatList
          ref={listRef}
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactListItem
              contact={item}
              onPress={async () => {
                await Haptics.selectionAsync();
                const existingChat = chats.find((chat) => chat.contactIds.includes(item.id));
                navigation.navigate('Chat', { chatId: existingChat?.id ?? chats[0].id });
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
          getItemLayout={(_, index) => ({ length: 72, offset: 72 * index, index })}
          onScrollToIndexFailed={({ index }) => {
            setTimeout(() => listRef.current?.scrollToIndex({ index, animated: true }), 180);
          }}
          initialNumToRender={12}
          windowSize={5}
          showsVerticalScrollIndicator={false}
        />

        <View style={[styles.alphabetWrap, { backgroundColor: 'rgba(124,58,237,0.14)' }]}>
          {LETTERS.map((letter) => (
            <Pressable
              key={letter}
              style={({ pressed }) => [
                styles.letterPress,
                pressed ? { backgroundColor: 'rgba(124,58,237,0.32)' } : null,
              ]}
              onPress={() => jumpToLetter(letter)}
            >
              <Text style={[styles.letter, { color: theme.colors.textSecondary }]}>{letter}</Text>
            </Pressable>
          ))}
        </View>
      </View>
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
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: '700',
    marginLeft: 2,
  },
  search: {
    marginHorizontal: 16,
    marginTop: 4,
  },
  groupButton: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#7C3AED',
    shadowOpacity: 0.46,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    flexGrow: 1,
  },
  alphabetWrap: {
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginRight: 6,
    marginVertical: 6,
    borderRadius: 12,
    paddingVertical: 8,
  },
  letterPress: {
    width: 22,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  letter: {
    fontSize: 10,
    fontWeight: '600',
  },
});
