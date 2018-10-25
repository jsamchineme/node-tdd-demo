import sumUp from './index';
import chai from 'chai';

describe("Test case for sumUp", ()=> {
  it('return correct sum', () => {
    expect(sumUp([1,2,3])).to.equal(6);
  });
});