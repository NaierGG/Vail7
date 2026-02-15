import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const colors = {
  // Background
  background: '#000000',
  surface: '#1A1A1A',
  card: '#2D2D2D',

  // Primary
  primary: '#7C3AED',
  primaryLight: '#9333EA',
  primaryDark: '#5B21B6',

  // Secondary
  secondary: '#EC4899',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A3A3A3',
  textTertiary: '#737373',

  // Status
  online: '#10B981',
  offline: '#6B7280',

  // Message bubbles
  sentBubble: '#7C3AED',
  receivedBubble: '#2D2D2D',
  glow: 'rgba(124, 58, 237, 0.36)',

  // System
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

type AppColors = MD3Theme['colors'] & typeof colors;
type AppTheme = Omit<MD3Theme, 'colors'> & {
  colors: AppColors;
  navigation: NavigationTheme;
  spacing: typeof spacing;
};

const createTheme = (baseTheme: MD3Theme) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryDark,
    secondary: colors.secondary,
    secondaryContainer: '#4B1F38',
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.card,
    surfaceDisabled: '#222222',
    onPrimary: colors.textPrimary,
    onSecondary: colors.textPrimary,
    onBackground: colors.textPrimary,
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textSecondary,
    onSurfaceDisabled: colors.textTertiary,
    onPrimaryContainer: colors.textPrimary,
    onSecondaryContainer: colors.textPrimary,
    outline: colors.textTertiary,
    error: colors.error,
    onError: colors.textPrimary,
    elevation: {
      ...baseTheme.colors.elevation,
      level0: colors.background,
      level1: '#141414',
      level2: '#1A1A1A',
      level3: '#202020',
      level4: '#242424',
      level5: '#2A2A2A',
    },
    // Additional app-specific color aliases.
    card: colors.card,
    primaryLight: colors.primaryLight,
    primaryDark: colors.primaryDark,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    textTertiary: colors.textTertiary,
    online: colors.online,
    offline: colors.offline,
    sentBubble: colors.sentBubble,
    receivedBubble: colors.receivedBubble,
    glow: colors.glow,
    success: colors.success,
    warning: colors.warning,
  } as AppColors,
});

const light = createTheme(MD3LightTheme);
const dark = createTheme(MD3DarkTheme);

export const getAppTheme = (isDark: boolean): AppTheme => {
  const base = isDark ? dark : light;
  const navigation = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  return {
    ...base,
    navigation: {
      ...navigation,
      colors: {
        ...navigation.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.textPrimary,
        border: colors.textTertiary,
        notification: colors.secondary,
      },
    },
    spacing,
  };
};

export type ThemeType = ReturnType<typeof getAppTheme>;
