import { expect } from 'chai';
import { describe, it } from 'mocha';
import sumUp from './index';

describe('Test case for sumUp', () => {
  it('return correct sum', () => {
    expect(sumUp([1, 2, 3])).to.equal(6);
  });
});
