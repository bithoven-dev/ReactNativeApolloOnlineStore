import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, ApolloProvider} from '@apollo/client';

import {ProductsList} from './screens/ProductsList';
import {ProductDetails} from './screens/ProductDetails';
import {GRAPHQL_URL} from './config';
import {cache} from './graphql/cache';
import {resolvers} from './graphql/resolvers';
import {HeaderFavoriteProductsCount} from './compoents/HeaderFavoriteProductsCount';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: cache,
  resolvers: resolvers,
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
          <Stack.Screen
            name={'ProductsList'}
            component={ProductsList}
            options={{
              headerRight: () => <HeaderFavoriteProductsCount />,
            }}
          />
          <Stack.Screen
            name={'ProductDetails'}
            component={ProductDetails}
            options={{
              headerRight: () => <HeaderFavoriteProductsCount />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
