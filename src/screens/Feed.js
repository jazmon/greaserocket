// @flow
import React from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import { FOOBAR, FETCH_DATA } from '../redux/modules/feed';

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
  // navigation: Object,
  // router: Object,
  fetchData: Function,
  foobar: Function,
  dispatch: Function,
};

type State = {
  text: string,
};

export class Feed extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Feed',
      icon: ({ tintColor }) => (
        <Icon
          name="ios-paper"
          size={30}
          color={tintColor}
        />
     ),
    },
  }

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

  componentDidMount() {
    // this.props.dispatch(FETCH_DATA.START());
    this.props.fetchData();
  }

  renderRow = (story: Object) => (
    <Story {...story} key={story.id} />
  );

  renderSeparator = (sID: string, rID: string) => (
    <View style={styles.separator} key={`${sID}-${rID}`} />
  );

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
        <TouchableHighlight >
          <Text>Click me!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles: Style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' && 24,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  separator: {
    height: 8,
  },
});

const mapState = (state: StateType) => ({
  foo: state.foo,
  error: state.error,
  data: state.data,
  isFetching: state.isFetching,
});

const mapActions = (dispatch) => ({
  fetchData: () => dispatch(FETCH_DATA()),
  foobar: () => dispatch(FOOBAR()),
});

export default connect(mapState, mapActions)(Feed);
