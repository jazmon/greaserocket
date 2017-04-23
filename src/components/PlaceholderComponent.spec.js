import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import PlaceholderComponent from './PlaceholderComponent';

it('renders correctly', () => {
  const tree = renderer.create(<PlaceholderComponent />);
  expect(tree).toMatchSnapshot();
});
