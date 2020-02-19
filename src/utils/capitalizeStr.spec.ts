import capitalizeStr from './capitalizeStr';

it('Turns firs symbol to upper case', () => {
  expect(capitalizeStr('aaa')).toBe('Aaa');
});
