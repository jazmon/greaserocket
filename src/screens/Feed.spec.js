import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { FeedComponent as Feed } from './Feed';


it('renders correctly', () => {
  const tree = renderer.create(
    <Feed fetchData={jest.fn} data={[]} />
  );
  expect(tree).toMatchSnapshot();
});
