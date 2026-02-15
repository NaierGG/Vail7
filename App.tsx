import 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';

import { AppErrorBoundary } from './src/components/common/ErrorBoundary';
import { RootNavigator } from './src/navigation/RootNavigator';
import { getAppTheme } from './src/theme/theme';

export default function App() {
  const theme = useMemo(() => getAppTheme(true), []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <PaperProvider theme={theme}>
            <AppErrorBoundary>
              <StatusBar style="light" />
              <RootNavigator />
            </AppErrorBoundary>
          </PaperProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
