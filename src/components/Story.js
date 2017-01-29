// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Image,
} from 'react-native';

import Image from './Image';

const defaultProps = {
  text: '',
};

type Props = {
  text: string,
  author: {
    profilePictureUrl: string,
    name: string,
  },
  style: any,
};

const Story = ({ text, style, author, ...props }: Props): React.Element<*> => (
  <View style={[styles.container, style]}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: author.profilePictureUrl }}
        resizemode="contain"
      />
    </View>
    <View style={styles.textArea}>
      <Text>{author.name}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  </View>
);

Story.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderColor: '#f00',
    // borderWidth: 1,
    height: 120,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  textArea: {
    flex: 1,
    padding: 16,
    // borderColor: '#00f',
    // borderWidth: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  image: {
    width: 100,
    // borderColor: '#0f0',
    // borderWidth: 1,
    height: 100,
  },
});

export default Story;
