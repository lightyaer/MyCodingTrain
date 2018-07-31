class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.searched = false;;
        this.edges = [];
    }
}

Node.prototype.addEdge = function (neighbor) {
    // Bidirectional connection
    this.edges.push(neighbor);
    neighbor.edges.push(this);
}


module.exports = Node;