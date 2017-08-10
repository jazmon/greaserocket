import 'react-native';
import * as React from 'react';
// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

import PlaceholderStory from './PlaceholderStory';

it('renders correctly', () => {
  const tree = renderer.create(<PlaceholderStory />);
  expect(tree).toMatchSnapshot();
});
