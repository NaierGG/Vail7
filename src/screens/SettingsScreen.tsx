import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, IconButton, List, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../components/common/Avatar';
import { ThemeType } from '../theme/theme';

export function SettingsScreen() {
  const theme = useTheme<ThemeType>();
  const insets = useSafeAreaInsets();

  const sectionItems = [
    { key: 'privacy', icon: 'shield-lock-outline', title: 'Privacy & Security' },
    { key: 'notifications', icon: 'bell-outline', title: 'Notifications' },
    { key: 'data', icon: 'database-outline', title: 'Data Usage' },
    { key: 'help', icon: 'help-circle-outline', title: 'Help & About' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }}
    >
      <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}> 
        <Avatar
          name="Alex Carter"
          uri="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300"
          size={64}
          online
        />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text variant="titleLarge">Alex Carter</Text>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>Privacy-first communicator</Text>
        </View>
        <IconButton
          icon="pencil-outline"
          iconColor={theme.colors.primary}
          containerColor="rgba(124,58,237,0.16)"
          onPress={() => {}}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}> 
        {sectionItems.map((item, index) => (
          <View key={item.key}>
            <List.Item
              title={item.title}
              titleStyle={{ color: theme.colors.textPrimary }}
              right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.textSecondary} />}
              left={(props) => <List.Icon {...props} icon={item.icon} color={theme.colors.primary} />}
            />
            {index < sectionItems.length - 1 ? (
              <Divider style={{ backgroundColor: 'rgba(124,58,237,0.18)' }} />
            ) : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
