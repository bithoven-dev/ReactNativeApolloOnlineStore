import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      description
      thumb {
        id
        url
      }
    }
  }
`;
