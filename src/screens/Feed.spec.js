import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { Feed } from './Feed';


it('renders correctly', () => {
  const tree = renderer.create(
    <Feed fetchData={jest.fn} />
  );
  expect(tree).toMatchSnapshot();
});
