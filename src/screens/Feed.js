// @flow
import React from 'react';
import {
  View,
  ListView,
  RefreshControl,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import { fetchFeed } from '../redux/modules/feed';

import Story from '../components/Story';
import Base from '../components/Base';

const rowHasChanged = (r1, r2) => r1.id !== r2.id;

const ds = new ListView.DataSource({ rowHasChanged });
type Author = { id: string, name: string, profilePictureUrl: string };

type FeedItem = { author: Author, id: string, text: string };
type Props = {
  // navigation: Object,
  // router: Object,
  fetchData: Function,
  // dispatch: Function,
  // error: boolean,
  loading: boolean,
  data: Array<FeedItem>,
};

type State = { text: string };

class Feed extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Feed',
      icon: ({ tintColor }) => <Icon name="ios-paper" size={30} color={tintColor} />,
    },
  };

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
    if (nextProps.error) {
      alert(nextProps.error.message || 'Error!');
    }
  }

  onRefresh = () => {
    this.props.fetchData();
  };

  renderRow = (story: Object) => <Story {...story} key={story.id} />;

  renderSeparator = (sID: string, rID: string) => (
    <View style={styles.separator} key={`${sID}-${rID}`} />
  );

  renderLoading = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating size="large" />
    </View>
  );

  render() {
    return (
      <Base>
        <View style={styles.container}>
          <ListView
            dataSource={this.dataSource}
            pageSize={6}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            enableEmptySections
            renderSectionHeader={(sectionData, sectionId) => <View key={`sh-${sectionId}`} />}
            refreshControl={
              <RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />
            }
          />
          {this.props.loading && this.renderLoading()}
        </View>
      </Base>
    );
  }
}

const styles: Style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 24 : 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  separator: { height: 8 },
});

const mapState = ({ feed }) => ({
  error: feed.error,
  data: feed.data,
  loading: feed.isFetching,
});

const mapActions = dispatch => ({ fetchData: () => dispatch(fetchFeed()) });

export const FeedComponent = Feed;
export default connect(mapState, mapActions)(Feed);
