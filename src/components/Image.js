// @flow
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image as RNImage, ActivityIndicator } from 'react-native';

type Props = {};

type State = {
  loading: boolean,
};

// const Image = ({ ...props }: Props): ElementType => <RNImage {...props} />;

class Image extends Component {
  props: Props;

  state: State = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={loading ? styles.container : null}>
        <RNImage
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
          {...this.props}
        />
        {loading && <ActivityIndicator />}
      </View>
    );
  }
}
// Image.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Image;
