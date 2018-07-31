const { movies } = require('./movies.json');

const Node = require('./Node');
const Graph = require('./Graph');

let graph = new Graph();

for (let i = 0; i < movies.length; i++) {
    let movieNode = new Node(movies[i].title);
    let cast = movies[i].cast;
    graph.addNode(movieNode);

    for (let j = 0; j < cast.length; j++) {
        let actor = cast[j];
        let actorNode = graph.getNode(actor);
        if (actorNode === undefined) {
            actorNode = new Node(actor);
        }
        graph.addNode(actorNode);
        movieNode.addEdge(actorNode);
    }

}

bfs("Rachel McAdams", "Kevin Bacon");

function bfs(start, end) {
    let startNode = graph.setStart(start);
    let endNode = graph.setEnd(end);

    let queue = [];

    startNode.parent = null;
    startNode.searched = true;
    queue.push(startNode);

    while (queue.length > 0) {
        let current = queue.shift();

        if (current === endNode) {
            console.log("Found " + current.value)
            break;
        }
        let edges = current.edges;
        for (let i = 0; i < edges.length; i++) {
            let neighbor = edges[i];
            if (!neighbor.searched) {
                neighbor.searched = true;
                neighbor.parent = current;
                queue.push(neighbor);
            }
        }
    }

    let path = [];
    path.push(endNode);
    let next = endNode.parent;
    while (next != null) {
        path.push(next);
        next = next.parent;
    }

    for (let i = path.length - 1; i >= 0; i--) {
        console.log(path[i].value + "===>");
    }

}


