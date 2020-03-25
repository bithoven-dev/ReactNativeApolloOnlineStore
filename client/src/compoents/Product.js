import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {BASE_URL} from '../config';
import {FavoriteIcon} from './FavoriteIcon';

export function Product({product, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.thumb}
        source={{uri: BASE_URL + product.thumb.url}}
      />
      <View style={styles.infoContainer}>
        <View style={styles.namePriceContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}$</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <FavoriteIcon />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  namePriceContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});
