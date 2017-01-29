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
    <View>
      <Image
        style={styles.image}
        source={{ uri: author ? author.profilePictureUrl : null }}
        resizemode="contain"
      />
    </View>
    <View style={styles.textArea}>
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
    borderColor: '#f00',
    borderWidth: 1,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  textArea: {
    flex: 1,
    borderColor: '#00f',
    borderWidth: 1,
    flexDirection: 'column',
  },
  image: {
    width: 200,
    borderColor: '#0f0',
    borderWidth: 1,
    height: 200,
  },
});

export default Story;
