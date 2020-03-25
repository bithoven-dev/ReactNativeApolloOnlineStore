import React from 'react';
import {useQuery} from '@apollo/client';
import {View, Text, StyleSheet} from 'react-native';

import {GET_FAVORITE_PRODUCTS_COUNT} from '../graphql/requests';

export function HeaderFavoriteProductsCount() {
  const {data} = useQuery(GET_FAVORITE_PRODUCTS_COUNT);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.favoriteProductsCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
