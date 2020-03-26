import {HttpLink, ApolloLink, concat} from '@apollo/client';

import {GRAPHQL_URL} from '../config';

const httpLink = new HttpLink({uri: GRAPHQL_URL});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: 'bearer xxxx',
    },
  });
  return forward(operation);
});

export const link = concat(authLink, httpLink);
