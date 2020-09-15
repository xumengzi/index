const { match } = require('assert');
const fs = require('fs');
const http = require('http');
const zlib = require('zlib');

http.createServer((req, res) => {
  if (req.url !== '/') { 
    const raw = fs.createReadStream('./xu_icon_40.ico');
    res.writeHead(200, {
      'Content-Type': 'image/ico'
    });
    raw.pipe(res);
  }else{
    const raw = fs.createReadStream('./index.html');
    let acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding) {
      acceptEncoding = '';
    };
    if (acceptEncoding.match(/\bdeflate\b/)) {
      res.writeHead(200, {
        'Content-encoding': 'deflate'
      });
      raw.pipe(zlib.createDeflate()).pipe(res)
    } else if (acceptEncoding.match(/\bgzip\b/)) {
      res.writeHead(200, {
        'Content-encoding': 'gzip'
      });
      raw.pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, {});
      raw.pipe(res);
    };
  }
  
}).listen(3000, () => {
  console.log('server is running!')
});