const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 18888;
const content = fs.readFileSync(path.join(__dirname, 'vercel-chinese.user.js'), 'utf-8');

http.createServer((req, res) => {
    if (req.url === '/vercel-chinese.user.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript', 'Access-Control-Allow-Origin': '*' });
        res.end(content);
    } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Vercel Chinese script server</h1>');
    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
