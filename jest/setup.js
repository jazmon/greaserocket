// @noflow
/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */
jest.mock('isomorphic-fetch');
require('isomorphic-fetch');

jest.mock('react-native', () => {
  const RealComponent = require.requireActual('react-native');

  return {
    ...RealComponent,
    Platform: { OS: 'ios', select: jest.fn() },
    items: {},
    NativeModules: {
      ...RealComponent.NativeModules,
      CodePush: {
        isFailedUpdate: jest.fn(() => new Promise(resolve => resolve(false))),
        getConfiguration: jest.fn(),
        isFirstRun: jest.fn(),
        getUpdateMetadata: jest.fn(),
      },
    },
    AsyncStorage: {
      setItem: jest.fn(
        (item, value) =>
          new Promise((resolve, reject) => {
            this.items[item] = value;
            resolve(value);
          })
      ),
      multiSet: jest.fn(
        (item, value) =>
          new Promise((resolve, reject) => {
            this.items[item] = value;
            resolve(value);
          })
      ),
      getItem: jest.fn(
        (item, value) =>
          new Promise((resolve, reject) => {
            resolve(this.items[item]);
          })
      ),
      multiGet: jest.fn(
        item =>
          new Promise((resolve, reject) => {
            resolve(this.items[item]);
          })
      ),
      removeItem: jest.fn(
        item =>
          new Promise((resolve, reject) => {
            resolve(delete this.items[item]);
          })
      ),
      getAllKeys: jest.fn(
        items =>
          new Promise(resolve => {
            resolve(this.items.keys());
          })
      ),
      flushGetRequests: jest.fn(items => new Promise(resolve => resolve())),
    },
  };
});

// Native modules
// See https://github.com/facebook/jest/issues/2208
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest
    .fn()
    .mockImplementation((value: string) => Promise.resolve(value)),
}));

// See https://github.com/facebook/react-native/issues/11659
jest.mock('ScrollView', () => {
  const RealComponent = require.requireActual('ScrollView');
  class ScrollView extends RealComponent {
    scrollTo = () => {};
  }
  return ScrollView;
});

jest.mock('NetInfo', () => ({
  isConnected: {
    fetch: () =>
      new Promise((accept, resolve) => {
        accept(true);
      }),
  },
}));

jest.mock('PushNotificationIOS', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock('Dimensions', () => ({
  get: () => ({
    width: 1080,
    height: 1920,
  }),
}));
