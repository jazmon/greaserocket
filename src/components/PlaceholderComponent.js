// @flow
import React from 'react';
import styled from 'styled-components/native';
import { Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import chroma from 'chroma-js';

const Container = Animated.createAnimatedComponent(
  styled(LinearGradient)`
`
);

type Props = {
  children?: ?any,
  style?: ?StyleSheet,
};
type State = {
  color: number,
  direction: 1 | -1,
};

const MAX = 80;
const DELAY = 5;
const MIN = 40;

const Directions = {
  UP: 1,
  DOWN: -1,
};

function getDirection(
  currentDirection: -1 | 1 = 1,
  color: number = 0,
  min: number = 0,
  max: number = 100
) {
  let direction = currentDirection;
  if (color >= max) {
    direction = Directions.DOWN;
  } else if (color <= min) {
    direction = Directions.UP;
  }
  return direction;
}

class PlaceholderComponent extends React.PureComponent<*, Props, State> {
  state = {
    color: MIN,
    direction: getDirection(),
  };

  interval: number;

  componentDidMount() {
    this.interval = setInterval(this.updateColor, DELAY);
  }

  updateColor = () => {
    this.setState(prevState => {
      const direction = getDirection(
        prevState.direction,
        prevState.color,
        MIN,
        MAX
      );
      const newColor = prevState.color + direction;
      return { color: newColor, direction };
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const color1 = chroma.hsl(0, 0, this.state.color / 100).hex();
    const color2 = chroma.hsl(0, 0, (100 - this.state.color) / 100).hex();
    return (
      <Container
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        colors={[color1, color2]}
        {...this.props}
      >
        {this.props.children}
      </Container>
    );
  }
}

export default PlaceholderComponent;
