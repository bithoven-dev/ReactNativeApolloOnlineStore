import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {useMutation} from '@apollo/client';
import {CREATE_COMMENT, GET_COMMENTS_BY_PRODUCT} from '../graphql/requests';

export function AddComment({productId}) {
  const [comment, setComment] = React.useState('');
  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, {data}) {
      const {comments} = cache.readQuery({
        query: GET_COMMENTS_BY_PRODUCT,
        variables: {
          productId,
        },
      });
      cache.writeQuery({
        query: GET_COMMENTS_BY_PRODUCT,
        variables: {
          productId,
        },
        data: {
          comments: [data.createComment.comment, ...comments],
        },
      });
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Add Comment'}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={styles.sendButton}
        disabled={!comment}
        onPress={async () => {
          await createComment({
            variables: {
              comment,
              productId,
            },
          });
          setComment('');
        }}>
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sendButton: {
    backgroundColor: 'orange',
    width: 60,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
