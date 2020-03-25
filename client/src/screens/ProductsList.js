import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_ALL_PRODUCTS} from '../graphql/requests';
import {Product} from '../compoents/Product';

export function ProductsList({navigation}) {
  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);

  if (loading || error) return null;

  function renderProduct({item: product}) {
    return (
      <Product
        product={product}
        onPress={() => {
          navigation.navigate('ProductDetails');
        }}
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.productsListContainer}
      data={data.products}
      renderItem={renderProduct}
    />
  );
}

const styles = StyleSheet.create({
  productsListContainer: {
    backgroundColor: '#fafafa',
  },
});
