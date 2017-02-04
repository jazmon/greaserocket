import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { LoginComponent as Login } from './Login';


it('renders correctly', () => {
  const tree = renderer.create(
    <Login />
  );
  expect(tree).toMatchSnapshot();
});
