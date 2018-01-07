const { writeManifest, deserialize } = require('../wire');
const http = require('http');

const expose = (actorRef) => {

};

const serve = (system, port, hostname, protocol = 'http') => {
  const requestHandler = async (request, response) => {
    if (request.method === 'POST' && request.url === '/') {
      const body = await deserialize(request);
      console.log(body);
      response.end();
    } else if (request.method === 'GET' && request.url === '/') {
      const body = writeManifest(system, { type: 'http', url: `${protocol}://${hostname}:${port}/` });
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

module.exports.serve = serve;
module.exports.expose = expose;
serve({ name: 'test' }, 3000);
