const http = require('http');
const fs = require('fs');
const path = require('path');


const webServer = http.createServer((req, res) => {
const filePath = path.join(__dirname, req.url);


if (req.url === '/index.html') {
fs.readFile(filePath, (err, content) => {
if (err) {
res.writeHead(500);
res.end('Internal Server Error');
return;
}
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(content);
});
} else if (req.url.endsWith('.html')) {
res.writeHead(404, { 'Content-Type': 'text/html' });
res.end('<h1>404 - Page Not Found</h1>');
} else {
res.writeHead(200);
res.end('Server is running');
}
});


webServer.listen(3000, () => {
console.log('Web server running on http://localhost:3000');
});