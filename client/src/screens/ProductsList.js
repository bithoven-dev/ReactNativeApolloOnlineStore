import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_ALL_PRODUCTS} from '../graphql/requests';

export function ProductsList({navigation}) {
  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);

  if (loading || error) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.products}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
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
