import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { FeedComponent as Feed } from './Feed';

it('renders correctly', () => {
  const tree = renderer.create(<Feed fetchStories={jest.fn} stories={[]} loading={false} />);
  expect(tree).toMatchSnapshot();
});
