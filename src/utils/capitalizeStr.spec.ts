import capitalizeStr from './capitalizeStr';

describe('capitalizeStr', () => {
  it('capitalizes first symbol', () => {
    expect(capitalizeStr('aaa')).toBe('Aaa');
  });
});
