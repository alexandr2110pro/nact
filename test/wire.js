/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
chai.should();
const { deserialize, serialize } = require('../lib/wire');

describe('#deserialize()', function () {
  it('should be able to ', async function () {
    let payload = { a: 1, b: '2', c: { xyz: 'hello' } };
    let input = serialize(payload);
    let result = await deserialize(input);
    result.should.deep.equal(payload);
  });
});
