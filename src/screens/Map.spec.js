import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';

import { MapScreenComponent } from './Map';

jest.mock('react-native-maps');

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <MapScreenComponent fetchLocations={() => {}} />
    </ThemeProvider>
  );
  expect(tree).toMatchSnapshot();
});
