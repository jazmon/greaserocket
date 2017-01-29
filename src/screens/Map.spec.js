import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


import Map from './Map';

jest.mock('react-native-maps');

it('renders correctly', () => {
  const tree = renderer.create(
    <Map />
  );
  expect(tree).toMatchSnapshot();
});
