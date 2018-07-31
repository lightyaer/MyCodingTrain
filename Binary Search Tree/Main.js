let Tree = require('./Tree');

let tree = new Tree();

for (var i = 0; i < 10; i++) {
    tree.addValue(Math.ceil(Math.random() * 100) + 1);

}
console.log(JSON.stringify(tree, undefined, 2));

tree.traverse();

let res = tree.search(10);
console.log(res);