// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Image from 'react-native-image-progress';
// import Image from './Image';
import theme from 'constants/theme';

import type { Story as StoryType } from 'types';

type Props = {
  story: StoryType,
  style?: ?any,
};

const Story = ({ story, style }: Props): ElementType => (
  <View style={[styles.container, style]}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: story.author.profilePictureUrl }}
        resizemode="contain"
      />
    </View>
    <View style={styles.textArea}>
      <Text>{story.author.name}</Text>
      <Text style={styles.text}>{story.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.WHITE,
    height: 120,
  },
  text: {
    color: theme.BLACK,
    fontSize: 16,
  },
  textArea: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Story;
