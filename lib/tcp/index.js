const { deserialize, serialize } = require('../wire');
const net = require('net');

const expose = (actorRef) => {

};

const serve = (system, port, hostname) => {
  let server;
  const requestHandler = async (socket) => {
    const body = await deserialize(socket);
    console.log(body);
    socket.end();
  };
  server = net.createServer(requestHandler);
  server.listen(port, hostname);
};

module.exports.serve = serve;
module.exports.expose = expose;

serve({ name: 'test' }, 3000);

setTimeout(() => {
  const client = net.createConnection({ port: 3000 }, () => {
    // 'connect' listener
    console.log('connected to server!');
    serialize({ a: 1, b: '2' }).pipe(client);
  });
}, 3000);
