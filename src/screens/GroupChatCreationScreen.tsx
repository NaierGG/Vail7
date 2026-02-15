import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Button, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { contacts, groupAvatarOptions } from '../data/mock';
import { ChatStackScreenProps } from '../navigation/types';
import { ContactListItem } from '../components/common/ContactListItem';
import { ThemeType } from '../theme/theme';

export function GroupChatCreationScreen({ navigation }: ChatStackScreenProps<'GroupChatCreation'>) {
  const theme = useTheme<ThemeType>();
  const insets = useSafeAreaInsets();
  const [groupName, setGroupName] = useState('');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState(groupAvatarOptions[0].id);

  const selectedContacts = useMemo(
    () => contacts.filter((contact) => selectedContactIds.includes(contact.id)),
    [selectedContactIds],
  );

  const canCreate = groupName.trim().length > 1 && selectedContactIds.length > 1;

  const toggleContact = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <IconButton icon="arrow-left" iconColor={theme.colors.textPrimary} onPress={() => navigation.goBack()} />
        <Text variant="headlineSmall" style={styles.title}>
          New Group
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
        contentContainerStyle={styles.chipsContent}
      >
        {selectedContacts.length === 0 ? (
          <Text style={{ color: theme.colors.onSurfaceVariant }}>Select contacts to add...</Text>
        ) : (
          selectedContacts.map((contact) => (
            <Chip
              key={contact.id}
              style={[styles.chip, { backgroundColor: 'rgba(124,58,237,0.24)' }]}
              textStyle={{ color: theme.colors.textPrimary }}
              iconColor={theme.colors.textPrimary}
              onClose={() => toggleContact(contact.id)}
            >
              {contact.name}
            </Chip>
          ))
        )}
      </ScrollView>

      <View style={styles.inputWrap}>
        <RNTextInput
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Group name"
          placeholderTextColor={theme.colors.onSurfaceVariant}
          style={[
            styles.groupNameInput,
            { backgroundColor: theme.colors.surface, color: theme.colors.onSurface },
          ]}
        />
      </View>

      <View style={styles.avatarSection}>
        <Text variant="titleMedium">Choose group avatar</Text>
        <View style={styles.avatarOptions}>
          {groupAvatarOptions.map((option) => {
            const selected = selectedAvatarId === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setSelectedAvatarId(option.id)}
                style={[
                  styles.avatarOption,
                  {
                    backgroundColor: option.color,
                    borderColor: selected ? theme.colors.primary : 'transparent',
                  },
                ]}
              >
                <Text style={styles.avatarOptionText}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            selected={selectedContactIds.includes(item.id)}
            onPress={() => toggleContact(item.id)}
            rightAccessory={
              selectedContactIds.includes(item.id) ? (
                <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>Added</Text>
              ) : null
            }
          />
        )}
      />

      <View style={[styles.footer, { bottom: insets.bottom + 12 }]}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          disabled={!canCreate}
          onPress={async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.goBack();
          }}
          contentStyle={styles.createContent}
        >
          Create Group
        </Button>
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
  chipsContainer: {
    maxHeight: 48,
    marginHorizontal: 16,
    marginTop: 6,
  },
  chipsContent: {
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  inputWrap: {
    marginHorizontal: 16,
    marginTop: 14,
  },
  groupNameInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  avatarSection: {
    marginHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  avatarOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  avatarOption: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  avatarOptionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 96,
  },
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  createContent: {
    height: 46,
  },
});
