import server from '../dist/server/server.js';

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method || 'GET')) {
    res.status(405).setHeader('Allow', 'GET, HEAD').send('Method not allowed');
    return;
  }
  const forwardedHost = req.headers['x-forwarded-host'];
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.headers.host || 'localhost';
  if (!/^(?:[a-z0-9](?:[a-z0-9.-]{0,251}[a-z0-9])?)(?::\d{1,5})?$/i.test(host)) {
    res.status(400).send('Bad request');
    return;
  }
  const forwardedUrl =
    req.headers['x-now-original-url'] ||
    req.headers['x-vercel-original-url'] ||
    req.headers['x-original-url'] ||
    req.url ||
    '/';
  const url = new URL(forwardedUrl, `https://${host}`);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      headers.append(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    }
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body: undefined,
  });

  const response = await server.fetch(request);

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  const body = await response.text();
  res.send(body);
}
