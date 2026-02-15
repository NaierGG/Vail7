export const formatTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

export const formatChatListTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return formatTime(isoDate);
  }

  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    return 'Yesterday';
  }

  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

export const formatDateLabel = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const today = now.toDateString();

  if (date.toDateString() === today) {
    return 'Today';
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
};
