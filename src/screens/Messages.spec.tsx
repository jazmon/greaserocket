import 'react-native';
import * as React from 'react';
// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

import { MessagesComponent as Messages } from './Messages';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Messages />
    </ThemeProvider>,
  );
  expect(tree).toMatchSnapshot();
});
