// @flow
import React from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import { foobar, fetchData } from '../redux/modules/feed';

import Story from '../components/Story';

const rowHasChanged = (r1, r2) => r1.id !== r2.id;

const ds = new ListView.DataSource({ rowHasChanged });
type Author = {
  id: string,
  name: string,
  profilePictureUrl: string,
};

type FeedItem = {
  author: Author,
  id: string,
  text: string,
}
type Props = {
  // navigation: Object,
  // router: Object,
  fetchData: Function,
  foobar: Function,
  dispatch: Function,
  error: boolean,
  isFetching: boolean,
  data: Array<FeedItem>,
};

type State = {
  text: string,
};

class Feed extends React.Component {
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

    this.dataSource = ds.cloneWithRows(props.data);
  }

  state: State;

  componentDidMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data) {
      this.dataSource = ds.cloneWithRows(nextProps.data);
    }
  }

  renderRow = (story: Object) => (
    <Story {...story} key={story.id} />
  );

  renderSeparator = (sID: string, rID: string) => (
    <View style={styles.separator} key={`${sID}-${rID}`} />
  );

  renderLoading = () => (
    this.props.isFetching ? <ActivityIndicator animating size="large" /> : null
  );

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={(sectionData, sectionId) => <View key={`sh-${sectionId}`} />}
        />
        <TouchableHighlight >
          <Text>Click me!</Text>
        </TouchableHighlight>
        {this.renderLoading()}
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

const mapState = ({ feed }) => ({
  foo: feed.foo,
  error: feed.error,
  data: feed.data,
  isFetching: feed.isFetching,
});

const mapActions = (dispatch) => ({
  fetchData: () => dispatch(fetchData.start()),
  foobar: () => dispatch(foobar()),
});

export const FeedComponent = Feed;
export default connect(mapState, mapActions)(Feed);
