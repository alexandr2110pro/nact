/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const msgpack = require('msgpack5')();
const zlib = require('zlib');
chai.should();
const { deserialize, serialize, writeManifest, readManifest } = require('../lib/wire');

describe('#deserialize()', function () {
  it('should be able to deserialize previously serialized data', async function () {
    let payload = { a: 1, b: '2', c: { xyz: 'hello' } };
    let input = serialize(payload);
    let result = await deserialize(input);
    result.should.deep.equal(payload);
  });
});

const toArr = (stream) => {
  return new Promise((resolve, reject) => {
    const buffer = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffer.push(data));
    stream.on('end', () => resolve([...Buffer.concat(buffer).values()]));
  });
};

describe('#serialize()', function () {
  it('should be able to deserialize previously serialized data', async function () {
    let payload = { 'a': 1, 'b': '2', 'c': { 'xyz': 'hello' } };
    let expectedResult = [...msgpack.encode(payload).values()];
    let result = await toArr(serialize(payload).pipe(zlib.createGunzip()));
    result.should.deep.equal(expectedResult);
  });
});

describe('#writeManifest()', function () {
  it('should be correctly create the manifest and serialize it', async function () {
    const expectedResult = { system: { name: 'test' }, transport: { type: 'random' } };
    let result = await readManifest(writeManifest({ name: 'test' }, { type: 'random' }));
    result.should.deep.equal(expectedResult);
  });
});
