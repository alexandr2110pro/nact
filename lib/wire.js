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

const writeManifest = (system, transport) =>
  serialize({ sn: system.name, t: transport });

const readManifest = (data) =>
  deserialize(data).then(x => ({ system: { name: x.sn }, transport: x.t }));

module.exports.serialize = serialize;
module.exports.deserialize = deserialize;
module.exports.writeManifest = writeManifest;
module.exports.readManifest = readManifest;
