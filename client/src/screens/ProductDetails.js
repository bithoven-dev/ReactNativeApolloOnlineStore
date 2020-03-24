import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export function ProductDetails() {
  return (
    <View style={styles.container}>
      <Text>This is the ProductDetails screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
