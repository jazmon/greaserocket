// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from 'constants/theme';

type Props = {
  navigation: Object,
  route: Object,
  loading: boolean,
};

type State = {
  text: string,
};

class EventDetail extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'EventDetail',
    };
  }

  state: State;

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.WHITE,
  },
  text: {
    color: theme.BLACK,
    fontSize: 16,
  },
});

export const EventDetailComponent = EventDetail;
export default EventDetail;
