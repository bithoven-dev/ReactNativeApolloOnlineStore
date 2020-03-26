import React from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_COMMENTS_BY_PRODUCT, GET_PRODUCT} from '../graphql/requests';
import {Loading} from '../compoents/Loading';
import {Error} from '../compoents/Error';
import {Product} from '../compoents/Product';
import {Card} from '../compoents/Card';

export function ProductDetails({route}) {
  const {productId} = route.params;
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-first',
  });
  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
  } = useQuery(GET_COMMENTS_BY_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (productLoading) {
    return <Loading />;
  }

  if (productError) {
    return <Error error={productError} />;
  }

  function renderComment({item: comment}) {
    return (
      <Card id={comment.id} style={styles.commentCard}>
        <Text>{comment.comment}</Text>
      </Card>
    );
  }

  function renderNumberOfComments() {
    return (
      <Text style={styles.title}>
        {commentsData && commentsData.comments.length > 0
          ? `Comments [${commentsData.comments.length}]`
          : 'No comments found'}
      </Text>
    );
  }

  function renderHeader() {
    return (
      <>
        <Product product={productData.product} />
        {commentsLoading && <Loading />}
        {commentsError && <Error error={commentsError} />}
        {renderNumberOfComments()}
      </>
    );
  }

  return (
    <FlatList
      data={commentsData ? commentsData.comments : []}
      renderItem={renderComment}
      ListHeaderComponent={renderHeader()}
      contentContainerStyle={styles.commentsContainer}
    />
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 8,
  },
  commentCard: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  title: {
    marginVertical: 8,
  },
});
