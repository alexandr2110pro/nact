const msgpack = require('msgpack5')();
const zlib = require('zlib');

const toObject = (stream) => {
  return new Promise((resolve, reject) => {
    const buffer = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffer.push(data));
    stream.on('end', () => resolve(buffer.length === 1 ? buffer[0] : buffer));
  });
};

const serialize = (data) => msgpack.encode(data, true).pipe(zlib.createGzip());
const deserialize = (data) => toObject(data.pipe(zlib.createGunzip()).pipe(msgpack.decoder()));

const writeManifest = (system, transport) =>
  serialize({ system: { name: system.name }, transport });

const readManifest = (data) =>
  deserialize(data);

module.exports.serialize = serialize;
module.exports.deserialize = deserialize;
module.exports.readManifest = readManifest;
module.exports.writeManifest = writeManifest;
