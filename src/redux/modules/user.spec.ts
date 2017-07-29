import reducer, {
  login,
  LOGIN_START /* ,  LOGIN_SUCCESS, doLogin */,
} from './user';

describe('user', () => {
  // beforeAll(() => {
  //   // jest.mock('react-native-lock');
  //   // jest.mock('Auth0Lock');
  // });
  describe('login', () => {
    it(`should return '${LOGIN_START}' type action`, () => {
      expect(login()).toEqual({ type: LOGIN_START });
    });
  });
  // describe('doLogin', () => {
  //   it('should use token if available');
  //   it('should return a promise', () => {
  //     jest.autoMockOn();
  //     expect(doLogin()).toBeInstanceOf(Promise);
  //     jest.autoMockOff();
  //   });
  //   it('should use token and refresh session', () => {
  //     jest.mock('react-native-lock', () => ({
  //       authenticationAPI: () => ({
  //         refreshToken: jest.fn(),
  //         // refreshToken: (tkn) => new Promise({ success: true, payload: tkn }),
  //         show: jest.fn(),
  //       })
  //     }));
  //     // jest.mock('react-native-lock', () => ({
  //     //   authenticationAPI: jest.fn()
  //     // }));
  //     const Auth0Lock = require('react-native-lock');
  //     console.log('Auth0Lock', Auth0Lock);
  //     const spy = jest.spyOn(Auth0Lock, 'authenticationAPI');
  //     doLogin('foo');
  //     expect(spy).toHaveBeenCalled();
  //   });
  //   // it('should show login screen if no token');
  // });
  describe('reducer', () => {
    it('should return the initial state', () => {
      const expected = {
        profile: null,
        token: null,
        loginDate: null,
        loading: true,
        error: null,
      };
      const actual = reducer(undefined, {});
      expect(actual).toEqual(expected);
    });
    test('LOGIN_START', () => {
      const expected = {
        profile: null,
        token: null,
        loginDate: null,
        loading: true,
        error: null,
      };
      const actual = reducer(undefined, { type: LOGIN_START })[0];
      expect(actual).toEqual(expected);
    });
    // test('LOGIN_SUCCESS', () => {
    //   const state = {
    //     profile: null,
    //     token: null,
    //     loginDate: null,
    //     loading: true,
    //     error: null,
    //   };
    //   const action = {
    //     type: LOGIN_SUCCESS,
    //
    //   }
    //   const actual = reducer(state, action)
    // })
  });
  // afterAll(() => {
  //   jest.clearAllMocks();
  // });
});
