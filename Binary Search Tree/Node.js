
class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

Node.prototype.search = function (val) {

    if (this.value === val) {
        return this;
    }

    if (this.value < val && this.left !== null) {
        return this.left.search();
    }

    if (this.value > val && this.right !== null) {
        return this.right.search();
    }

    return null;
}



Node.prototype.visit = function () {
    if (this.left !== null) {
        this.left.visit();
    }

    console.log(this.value);

    if (this.right !== null) {
        this.right.visit();
    }
}

Node.prototype.addNode = function (n) {

    if (n.value < this.value) {
        if (this.left == null) {
            this.left = n
        } else {
            this.left.addNode(n);
        }


    } else if (n.value > this.value) {

        if (this.right == null) {
            this.right = n;
        } else {
            this.right.addNode(n);
        }

    }

}

module.exports = Node;