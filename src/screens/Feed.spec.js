import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import { FeedComponent as Feed } from './Feed';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Feed fetchStories={jest.fn} stories={[]} loading={false} />
    </ThemeProvider>
  );
  expect(tree).toMatchSnapshot();
});
