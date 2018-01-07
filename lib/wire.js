const msgpack = require('msgpack5')();
const zlib = require('zlib');

const toObject = (stream) =>
  new Promise((resolve, reject) => {
    let data;
    stream.on('error', reject);
    stream.on('data', (val) => { data = val; });
    stream.on('end', () => resolve(data));
  });

const serialize = (data) => msgpack.encode(data, true).pipe(zlib.createGzip());
const deserialize = (data) => toObject(data.pipe(zlib.createGunzip()).pipe(msgpack.decoder()));

const writeManifest = (system, { type, ...transport }) =>
  serialize({ n: system.name, t: { t: type, ...transport } });

const readManifest = (data) =>
  deserialize(data).then(({ t: { t: type, ...transport }, n }) => ({ system: { name: n }, transport: { type, ...transport } }));

module.exports.serialize = serialize;
module.exports.deserialize = deserialize;
module.exports.writeManifest = writeManifest;
module.exports.readManifest = readManifest;
