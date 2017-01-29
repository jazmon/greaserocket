import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Story from './Story';


it('renders correctly', () => {
  const tree = renderer.create(
    <Story />
  );
  expect(tree).toMatchSnapshot();
});
