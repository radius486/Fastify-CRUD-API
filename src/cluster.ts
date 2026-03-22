import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';

const PORT = Number(process.env.PORT) || 4000;
const numWorkers = availableParallelism() - 1;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const workerPorts: number[] = [];

  for (let i = 1; i <= numWorkers; i++) {
    const workerPort = PORT + i;
    workerPorts.push(workerPort);

    cluster.fork({ PORT: workerPort });
  }

  let current = 0;

  const server = http.createServer((req, res) => {
    const targetPort = workerPorts[current];
    current = (current + 1) % workerPorts.length;

    console.log(`Proxying request to localhost:${targetPort}`);

    const proxyReq = http.request({
      host: 'localhost',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);

    proxyReq.on('error', (err) => {
      res.writeHead(502);
      res.end('Bad Gateway');
    });
  });

  server.listen(PORT, () => {
    console.log(`Load Balancer started on http://localhost:${PORT}`);
  });

} else {
  import('./server.js');
}
