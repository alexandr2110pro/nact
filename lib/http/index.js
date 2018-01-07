const wire = require('../wire');
const http = require('http');

const expose = (actorRef) => {

};

const listen = (system, port, hostname, protocol = 'http') => {
  const requestHandler = (request, response) => {
    if (request.method === 'POST' && request.url === '/') {
      console.log(request);
      response.end('Hello Node.js Server!');
    } else if (request.method === 'GET' && request.url === '/manifest') {
      const body = wire.writeManifest(system, { type: 'http', url: `${protocol}://${hostname}:${port}/` });
      response.writeHead(200, { 'Content-Type': 'application/msgpack', 'Content-Encoding': 'gzip' });
      body.pipe(response);
    } else {
      response.writeHead(400);
      response.end('BAD REQUEST');
    }
  };
  const server = http.createServer(requestHandler);
  server.listen(port, hostname);
};

module.exports.listen = listen;
module.exports.expose = expose;
