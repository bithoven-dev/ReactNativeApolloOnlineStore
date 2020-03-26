import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/client/testing';

import {ProductsList} from '../src/screens/ProductsList';
import {GET_ALL_PRODUCTS} from '../src/graphql/requests';
import {GraphQLError} from 'graphql';

async function wait(ms = 0) {
  await renderer.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

describe('ProductsList', () => {
  it('shows loading', () => {
    const component = renderer.create(
      <MockedProvider>
        <ProductsList />
      </MockedProvider>,
    );

    expect(() => component.root.findByType('ActivityIndicator')).not.toThrow();
  });

  it('shows error', async () => {
    const mockedError = {
      request: {
        query: GET_ALL_PRODUCTS,
      },
      // error: new Error('Oops we can not get the products'),
      result: {
        errors: [new GraphQLError('Oops we can not get the products')],
      },
    };
    const component = renderer.create(
      <MockedProvider mocks={[mockedError]} addTypename={false}>
        <ProductsList />
      </MockedProvider>,
    );

    await wait();

    expect(() => {
      component.root.findByProps({
        children: 'GraphQL error: Oops we can not get the products',
      });
    }).not.toThrow();
  });

  it('shows products list', async () => {
    const mockedData = {
      request: {
        query: GET_ALL_PRODUCTS,
      },
      result: {
        data: {
          products: [
            {
              id: '1',
              name: 'Nike II',
              price: 100,
              description: 'Here goes the desc',
              favorite: true,
              thumb: {
                id: '1',
                url: '/uploads/f572595fddfc4eb78eaa4d75e085d1d5.jpg',
              },
            },
            {
              id: '2',
              name: 'Nike Pro',
              price: 190,
              description: 'I am nike pro  🧡',
              favorite: false,
              thumb: {
                id: '2',
                url: '/uploads/aa6a78cf1e6e4a0292f103b53570f8bc.jpg',
              },
            },
          ],
        },
      },
    };
    const component = renderer.create(
      <MockedProvider mocks={[mockedData]} addTypename={false}>
        <ProductsList />
      </MockedProvider>,
    );

    await wait();

    console.log(component.toJSON());
    expect(() => {
      component.root.findByProps({
        children: 'Nike II',
      });
    }).not.toThrow();
    expect(() => {
      component.root.findByProps({
        children: 'Nike Prcs',
      });
    }).not.toThrow();
  });
});
