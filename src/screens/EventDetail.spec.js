import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

import { EventDetailComponent as EventDetail } from './EventDetail';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <EventDetail />
    </ThemeProvider>
  );
  expect(tree).toMatchSnapshot();
});
