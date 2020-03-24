import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import {ProductsList} from './screens/ProductsList';
import {ProductDetails} from './screens/ProductDetails';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
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
