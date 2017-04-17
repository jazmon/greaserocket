// @flow
import React from 'react';
import {
  View,
  ListView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import type { Story as StoryType } from 'types';
import type { ReduxState } from 'redux/modules';

import { fetchStories, refetchStories } from 'redux/modules/feed';

import Story from 'components/Story';
import Base from 'components/Base';
import theme from 'constants/theme';
import PlaceholderComponent from 'components/PlaceholderComponent';

const rowHasChanged = (r1, r2) => r1.id !== r2.id;

const ds = new ListView.DataSource({ rowHasChanged });

type Props = {
  // navigation: Object,
  // router: Object,
  fetchStories: () => void,
  refetchStories: () => void,
  error: boolean,
  loading: boolean,
  refetching: boolean,
  stories: Array<StoryType>,
};

type State = {};

const PlaceholderStory = () => (
  <View
    style={{
      height: 120,
      flex: 1,
      flexDirection: 'row',
      marginBottom: 8,
      opacity: 0.5,
    }}
  >
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
      }}
    >
      <PlaceholderComponent style={{ width: 100, height: 100 }} />
    </View>
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <PlaceholderComponent
        style={{
          flex: 0,
          flexDirection: 'row',
          height: 14,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      />
      <PlaceholderComponent
        style={{
          flex: 0,
          flexDirection: 'row',
          height: 14,
          marginTop: 2,
          paddingBottom: 2,
        }}
      />
    </View>
  </View>
);

class Feed extends React.Component<*, Props, State> {
  static navigationOptions = {
    tabBarLabel: 'Feed',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-paper" size={30} color={tintColor} />
    ),
  };

  static defaultProps = {
    stories: [],
  };

  dataSource: Object;

  constructor(props: Props) {
    super(props);

    this.dataSource = ds.cloneWithRows(props.stories);
  }

  componentDidMount() {
    this.props.fetchStories();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.stories) {
      this.dataSource = ds.cloneWithRows(nextProps.stories);
    }
    if (nextProps.error) {
      alert(nextProps.error.message || 'Error!');
    }
  }

  onRefresh = () => {
    this.props.refetchStories();
  };

  renderRow = (story: StoryType) => <Story story={story} key={story.id} />;

  renderSeparator = (sID: string, rID: string) => (
    <View style={styles.separator} key={`${sID}-${rID}`} />
  );

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating size="large" />
    </View>
  );

  render() {
    const { loading, refetching } = this.props;
    return (
      <Base>
        <View style={styles.container}>
          {!loading &&
            <ListView
              dataSource={this.dataSource}
              pageSize={6}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
              enableEmptySections
              renderSectionHeader={(sectionData, sectionId) => (
                <View key={`sh-${sectionId}`} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refetching}
                  onRefresh={this.onRefresh}
                />
              }
            />}
          {loading &&
            <ScrollView>
              {[1, 2, 3, 4, 5, 6].map(a => (
                <PlaceholderStory key={String(a)} />
              ))}
            </ScrollView>}
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
    backgroundColor: theme.WHITE,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.TRANSPARENT,
  },
  separator: { height: 8 },
});

const mapState = ({ feed }: ReduxState) => ({
  ...feed,
});

const mapActions = (dispatch: Dispatch) => ({
  fetchStories: () => dispatch(fetchStories()),
  refetchStories: () => dispatch(refetchStories()),
});

export const FeedComponent = Feed;
export default connect(mapState, mapActions)(Feed);
