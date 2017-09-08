import 'react-native';
import * as React from 'react';
// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

import { LoginComponent as Login } from './Login';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Login login={jest.fn} />
    </ThemeProvider>
  );
  expect(tree).toMatchSnapshot();
});
