import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


import { MapScreenComponent } from './Map';

jest.mock('react-native-maps');

it('renders correctly', () => {
  const tree = renderer.create(
    <MapScreenComponent fetchLocations={() => {}} />
  );
  expect(tree).toMatchSnapshot();
});
