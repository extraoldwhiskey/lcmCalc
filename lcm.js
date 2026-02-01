const http = require('http');
const url = require('url');

function isNaturalBigIntString(s) {
  return typeof s === 'string' && /^[1-9]\d*$/.test(s);
}

function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname !== '/mukhamedjanovjr_gmail_com') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }

  const { x: xs, y: ys } = parsed.query;

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  if (!isNaturalBigIntString(xs) || !isNaturalBigIntString(ys)) {
    return res.end('NaN');
  }

  const x = BigInt(xs);
  const y = BigInt(ys);

  const lcm = (x * y) / gcd(x, y);
  res.end(lcm.toString());
}).listen(process.env.PORT || 3000);
