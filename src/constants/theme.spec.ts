import { getStatusBarTextColor } from './theme';

describe('getStatusBarTextColor', () => {
  it('should return true when color contrast is low', () => {
    const expected = 'dark-content';
    const actual = getStatusBarTextColor('#FFF');
    expect(actual).toBe(expected);
  });
  it('should return false when color contrast is high', () => {
    const expected = 'light-content';
    const actual = getStatusBarTextColor('#000');
    expect(actual).toBe(expected);
  });
});
