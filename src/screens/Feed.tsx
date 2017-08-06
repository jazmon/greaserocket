// @flow
import React from 'react';
import {
  View,
  ListView,
  ScrollView,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Story as StoryType } from 'types';
import { ReduxState } from 'redux/modules';
import styled from 'styled-components/native';

import { fetchStories, refetchStories } from 'redux/modules/feed';

import Story from 'components/Story';
import PlaceholderStory from 'components/PlaceholderStory';
import Base from 'components/Base';
import { ThemeType } from 'constants/theme';

interface HasID {
  id: number | string;
}
const rowHasChanged = (r1: HasID, r2: HasID): boolean => r1.id !== r2.id;

const ds = new ListView.DataSource({ rowHasChanged });

type Props = {
  // navigation: Object,
  // router: Object,
  fetchStories: () => void;
  refetchStories: () => void;
  error: boolean;
  loading: boolean;
  refetching: boolean;
  stories: Array<StoryType>;
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.transparent};
`;
const Separator = styled.View`height: 8;`;
const Container = styled.View`
  flex: 1;
  margin-top: ${Platform.OS === 'ios' ? 24 : 0};
  flex-direction: column;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.white};
`;

class Feed extends React.Component<Props, void> {
  static navigationOptions = {
    tabBarLabel: 'Feed',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="ios-paper" size={30} color={tintColor} />,
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
    // this.props.fetchStories();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.stories) {
      this.dataSource = ds.cloneWithRows(nextProps.stories);
    }
    // if (nextProps.token && !this.props.token) {
    //   this.props.fetchStories();
    // }
    if (nextProps.error) {
      console.log(
        nextProps.error.message || 'error fetching data for feed',
        nextProps.error.stack,
      );
      // alert(nextProps.error.message || 'Error!');
    }
  }

  onRefresh = () => {
    this.props.refetchStories();
  };

  renderRow = (story: StoryType) => <Story story={story} key={story.id} />;

  renderSeparator = (sID: string, rID: string) =>
    <Separator key={`${sID}-${rID}`} />;

  renderLoading = () =>
    <LoadingContainer>
      <ActivityIndicator animating size="large" />
    </LoadingContainer>;

  render() {
    const { loading, refetching } = this.props;
    return (
      <Base>
        <Container>
          {!loading &&
            <ListView
              dataSource={this.dataSource}
              pageSize={6}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
              enableEmptySections
              renderSectionHeader={(sectionData, sectionId) =>
                <View key={`sh-${sectionId}`} />}
              refreshControl={
                <RefreshControl
                  refreshing={refetching}
                  onRefresh={this.onRefresh}
                />
              }
            />}
          {loading &&
            <ScrollView>
              {[1, 2, 3, 4, 5, 6].map(a =>
                <PlaceholderStory key={String(a)} />,
              )}
            </ScrollView>}
        </Container>
      </Base>
    );
  }
}

const mapState = ({ feed }: ReduxState) => ({
  ...feed,
  // token: user.token,
});

const mapActions = (dispatch: Dispatch<ReduxState>) => ({
  fetchStories: () => dispatch(fetchStories()),
  refetchStories: () => dispatch(refetchStories()),
});

export const FeedComponent = Feed;
export default connect(mapState, mapActions)(Feed);
