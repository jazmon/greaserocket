// @flow
import React from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';

import Story from '../components/Story';

const data = [
  {
    id: 'story-0',
    text: 'Hello, World!',
    author: {
      id: 'author-0',
      profilePictureUrl: 'http://loremflickr.com/320/240/dog?asdf=0',
      name: 'Jack Johnson',
    },
  },
  {
    id: 'story-1',
    text: 'I like trains',
    author: {
      id: 'author-1',
      profilePictureUrl: 'http://loremflickr.com/320/240/dog?foo=1',
      name: 'John Jackson',
    },
  },
];

const rowHasChanged = (r1, r2) => r1.id !== r2.id;

const ds = new ListView.DataSource({ rowHasChanged });

type Props = {
  navigation: Object,
  router: Object,
};

type State = {
  text: string,
};

class Feed extends React.Component {

  static navigationOptions = {
    title: 'Feed',
  };

  props: Props;
  dataSource: Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'Feed',
    };

    this.dataSource = ds.cloneWithRows(data);
  }

  state: State;

  renderRow = (story: Object) => (
    <Story {...story} key={story.id} />
  );

  renderSeparator = (sID: string, rID: string) => (
    <View style={styles.separator} key={`${sID}-${rID}`} />
  );

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  separator: {
    height: 8,
  },
});

export default Feed;
