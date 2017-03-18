import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Image from './Image';

it('renders correctly', () => {
  const tree = renderer.create(<Image />);
  expect(tree).toMatchSnapshot();
});
