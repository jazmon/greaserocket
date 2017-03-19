import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Story from './Story';

const story = {
  id: 'foo',
  text: 'foo',
  author: { name: 'foo', profilePictureUrl: null },
};

it('renders correctly', () => {
  const tree = renderer.create(<Story story={story} />);
  expect(tree).toMatchSnapshot();
});
