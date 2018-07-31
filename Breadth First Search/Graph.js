class Graph {
    constructor() {
        this.nodes = [];
        this.graph = {};
        this.start = null;
        this.end = null;
    }
}

Graph.prototype.getNode = function (val) {
    let node = this.graph[val];
    return node;
}

Graph.prototype.addNode = function (node) {

    this.nodes.push(node);
    let title = node.value;
    this.graph[title] = node;

}

Graph.prototype.setEnd = function (val) {
    this.end = this.graph[val];
    return this.end;
}

Graph.prototype.setStart = function (val) {
    this.start = this.graph[val];
    return this.start;
}

module.exports = Graph;