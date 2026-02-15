import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ChatListScreen } from '../screens/ChatListScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { NewChatScreen } from '../screens/NewChatScreen';
import { GroupChatCreationScreen } from '../screens/GroupChatCreationScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CallsScreen } from '../screens/CallsScreen';
import { ChatStackParamList, MainTabParamList } from './types';
import { ThemeType } from '../theme/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();

function ChatStackNavigator() {
  const theme = useTheme<ThemeType>();

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <ChatStack.Screen name="ChatList" component={ChatListScreen} />
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen name="NewChat" component={NewChatScreen} />
      <ChatStack.Screen name="GroupChatCreation" component={GroupChatCreationScreen} />
    </ChatStack.Navigator>
  );
}

export function RootNavigator() {
  const theme = useTheme<ThemeType>();

  return (
    <NavigationContainer theme={theme.navigation}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
            height: 68,
            paddingBottom: Platform.OS === 'ios' ? 8 : 10,
            paddingTop: 8,
            borderTopWidth: StyleSheet.hairlineWidth,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => {
            const iconByRoute: Record<
              keyof MainTabParamList,
              React.ComponentProps<typeof MaterialCommunityIcons>['name']
            > = {
              ChatsTab: 'chat-outline',
              CallsTab: 'phone-outline',
              SettingsTab: 'cog-outline',
            };

            return (
              <MaterialCommunityIcons
                name={iconByRoute[route.name as keyof MainTabParamList]}
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="ChatsTab"
          component={ChatStackNavigator}
          options={{
            title: 'Chats',
          }}
        />
        <Tab.Screen
          name="CallsTab"
          component={CallsScreen}
          options={{
            title: 'Calls',
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
