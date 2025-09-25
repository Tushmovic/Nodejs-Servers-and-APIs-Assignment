const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../items.json');


function readItems() {
if (!fs.existsSync(filePath)) return [];
const data = fs.readFileSync(filePath);
return JSON.parse(data || '[]');
}


function writeItems(items) {
fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
}


module.exports = {
getAllItems: () => {
return readItems();
},
getItemById: (id) => {
const items = readItems();
return items.find(i => i.id === id);
},
createItem: (item) => {
const items = readItems();
item.id = Date.now().toString();
items.push(item);
writeItems(items);
return item;
},
updateItem: (id, newItem) => {
const items = readItems();
const index = items.findIndex(i => i.id === id);
if (index === -1) return null;
newItem.id = id;
items[index] = newItem;
writeItems(items);
return newItem;
},
deleteItem: (id) => {
let items = readItems();
const index = items.findIndex(i => i.id === id);
if (index === -1) return false;
items.splice(index, 1);
writeItems(items);
return true;
}
};