import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Error({error}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});
