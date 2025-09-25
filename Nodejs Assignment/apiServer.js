const http = require('http');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('./api/itemsController');


const apiServer = http.createServer((req, res) => {
const { method, url } = req;
if (!url.startsWith('/api/items')) return;


let body = '';
req.on('data', chunk => (body += chunk));


req.on('end', () => {
if (url === '/api/items' && method === 'GET') {
return respond(res, 200, { success: true, data: getAllItems() });
}


if (url === '/api/items' && method === 'POST') {
const item = JSON.parse(body);
const created = createItem(item);
return respond(res, 201, { success: true, data: created });
}


const idMatch = url.match(/\/api\/items\/(\w+)/);
if (idMatch) {
const id = idMatch[1];


if (method === 'GET') {
const item = getItemById(id);
if (!item) return respond(res, 404, { success: false, error: 'Item not found' });
return respond(res, 200, { success: true, data: item });
}


if (method === 'PUT') {
const newItem = JSON.parse(body);
const updated = updateItem(id, newItem);
if (!updated) return respond(res, 404, { success: false, error: 'Item not found' });
return respond(res, 200, { success: true, data: updated });
}


if (method === 'DELETE') {
const deleted = deleteItem(id);
if (!deleted) return respond(res, 404, { success: false, error: 'Item not found' });
return respond(res, 200, { success: true, message: 'Item deleted' });
}
}


respond(res, 400, { success: false, error: 'Bad Request' });
});
});


function respond(res, statusCode, data) {
res.writeHead(statusCode, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(data));
}


apiServer.listen(4000, () => {
console.log('API server running on http://localhost:4000');
});