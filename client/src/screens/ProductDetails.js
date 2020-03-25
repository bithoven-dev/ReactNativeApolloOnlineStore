import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_PRODUCT} from '../graphql/requests';
import {Loading} from '../compoents/Loading';
import {Error} from '../compoents/Error';
import {Product} from '../compoents/Product';

export function ProductDetails({route}) {
  const {productId} = route.params;
  const {loading, error, data} = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return <Product product={data.product} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
