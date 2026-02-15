import React, { Component, ErrorInfo, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled app error', error, info);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text variant="headlineSmall" style={styles.title}>
            Something went wrong.
          </Text>
          <Text style={styles.caption}>Please try again.</Text>
          <Button mode="contained" buttonColor="#7C3AED" onPress={this.reset}>
            Reload
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
  },
  caption: {
    color: '#A3A3A3',
    marginBottom: 8,
  },
});
