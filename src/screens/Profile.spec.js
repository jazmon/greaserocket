import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { ProfileComponent as Profile } from './Profile';

it('renders correctly', () => {
  const tree = renderer.create(<Profile login={jest.fn} />);
  expect(tree).toMatchSnapshot();
});
