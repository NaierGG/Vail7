export type ContentType = 'text' | 'image' | 'file';

export type Contact = {
  id: string;
  name: string;
  avatar?: string;
  status: string;
  online: boolean;
  phone: string;
};

export type ChatPreview = {
  id: string;
  contactIds: string[];
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  typing?: boolean;
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  contentType: ContentType;
  text?: string;
  mediaUri?: string;
  fileName?: string;
  sentAt: string;
  read: boolean;
};

export type GroupAvatarOption = {
  id: string;
  label: string;
  color: string;
};
