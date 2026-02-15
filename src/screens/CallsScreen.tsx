import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { contacts } from '../data/mock';
import { ContactListItem } from '../components/common/ContactListItem';
import { ThemeType } from '../theme/theme';

export function CallsScreen() {
  const theme = useTheme<ThemeType>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text variant="headlineSmall" style={styles.title}>
          Recent Calls
        </Text>
        <IconButton
          icon="phone-plus-outline"
          iconColor={theme.colors.primary}
          containerColor="rgba(124,58,237,0.16)"
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            subtitle={item.online ? 'Incoming call - 2 min ago' : 'Outgoing call - yesterday'}
            rightAccessory={
              <MaterialCommunityIcons
                name={item.online ? 'phone-incoming' : 'phone-outgoing'}
                color={item.online ? theme.colors.success : theme.colors.textSecondary}
                size={20}
              />
            }
          />
        )}
        contentContainerStyle={styles.listContent}
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
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
});
