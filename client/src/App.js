import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import {ProductsList} from './screens/ProductsList';
import {ProductDetails} from './screens/ProductDetails';
import {GRAPHQL_URL} from './config';
import {FAVORITE_PRODUCT_FRAGMENT} from './graphql/requests';

const Stack = createStackNavigator();

function convertDollarValueToMAD(dollar) {
  return dollar * 10;
}

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        fields: {
          favorite: {
            read(favorite = true) {
              return favorite;
            },
          },
          price(price) {
            return `${convertDollarValueToMAD(price)} MAD`;
          },
        },
      },
    },
  }),
  resolvers: {
    Mutation: {
      addOrRemoveProductFromFavorite(_root, args, {client, cache}) {
        const productId = cache.identify({
          __typename: 'Product',
          id: args.productId,
        });
        const {favorite} = client.readFragment({
          fragment: FAVORITE_PRODUCT_FRAGMENT,
          id: productId,
        });
        client.writeFragment({
          fragment: FAVORITE_PRODUCT_FRAGMENT,
          id: productId,
          data: {
            favorite: !favorite,
          },
        });
      },
    },
  },
});

export default function() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}>
          <Stack.Screen name={'ProductsList'} component={ProductsList} />
          <Stack.Screen name={'ProductDetails'} component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
