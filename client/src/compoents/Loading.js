import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export function Loading({hasBackground}) {
  return (
    <ActivityIndicator
      style={[
        styles.loadingIndicator,
        {
          backgroundColor: hasBackground ? '#fafafa' : 'none',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
