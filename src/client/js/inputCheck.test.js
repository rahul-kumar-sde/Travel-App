import { inputCheck } from './inputCheck.js';

describe('RegExp: input', function () {
  it('string', function () {
    const cityRGEX = /^[a-zA-Z\s]{0,255}$/;
    const cityTest = 'New Y0rk';
    expect(cityRGEX.test(urlTest)).toBe(false);
  });
});