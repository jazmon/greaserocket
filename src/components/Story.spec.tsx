import 'react-native';
import * as React from 'react';
// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

import Story from './Story';

const story = {
  id: 'foo',
  text: 'foo',
  author: { name: 'foo', profilePictureUrl: null },
};

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Story story={story} />
    </ThemeProvider>,
  );
  expect(tree).toMatchSnapshot();
});
