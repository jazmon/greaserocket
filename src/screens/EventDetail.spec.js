import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { EventDetailComponent as EventDetail } from './EventDetail';


it('renders correctly', () => {
  const tree = renderer.create(
    <EventDetail />
  );
  expect(tree).toMatchSnapshot();
});
