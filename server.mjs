import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; script-src 'self'; img-src 'self' data:; connect-src 'self'"
};

createServer(async (req, res) => {
  if (req.url === '/_app/health') {
    res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: true, service: 'fairshift' }));
    return;
  }
  const requested = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const safe = normalize(requested).replace(/^[/\\]+/, '').replace(/^\.\.(\/|\\)/, '');
  const file = requested === '/manus-routes.json' ? join(root, 'public', 'manus-routes.json') : join(root, safe);
  try {
    const data = await readFile(file);
    res.writeHead(200, { ...securityHeaders, 'Content-Type': types[extname(file)] || 'text/plain', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    const fallback = await readFile(join(root, 'index.html'));
    res.writeHead(200, { ...securityHeaders, 'Content-Type': 'text/html' });
    res.end(fallback);
  }
}).listen(port, '0.0.0.0', () => console.log(`FairShift listening on ${port}`));
