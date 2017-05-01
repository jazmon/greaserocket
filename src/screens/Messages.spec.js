import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { MessagesComponent as Messages } from './Messages';


it('renders correctly', () => {
  const tree = renderer.create(
    <Messages />
  );
  expect(tree).toMatchSnapshot();
});
