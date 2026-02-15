import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { chatId: string };
  NewChat: undefined;
  GroupChatCreation: undefined;
};

export type MainTabParamList = {
  ChatsTab: undefined;
  CallsTab: undefined;
  SettingsTab: undefined;
};

export type ChatStackScreenProps<T extends keyof ChatStackParamList> = NativeStackScreenProps<
  ChatStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<ChatStackParamList>
>;
