import 'react-native';
import * as React from 'react';
// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';
import { AppComponent } from './App';

it('renders correctly', () => {
  const tree = renderer.create(<AppComponent />);
  expect(tree).toMatchSnapshot();
});
