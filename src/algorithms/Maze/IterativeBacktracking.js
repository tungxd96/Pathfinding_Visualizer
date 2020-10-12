import {
    key,
    neighborsHasUnvisitedNode,
    randomizedNeighbor,
    round,
    removeNodeFrom,
    findMazeNeighbors,
} from "../Helper/AlgorithmHelper";
import Node from "../../objects/Node";

export const generateIterativeBackTracking = props => {
    var t0 = performance.now();

    const graph = props.grid, initialNode = props.startNode, startNode = props.startNode, endNode = props.endNode;
    if (!startNode || !endNode) {
        return null;
    }

    const stack = [initialNode], discovered = new Map(), walls = [startNode, endNode];

    discovered[key(initialNode)] = true;

    while (stack.length > 0) {
        const currentNode = stack.pop();

        const neighbors = findMazeNeighbors(graph, currentNode);
        if (neighborsHasUnvisitedNode(neighbors, discovered)) {
            // 1. Push the current node to the stack
            stack.push(currentNode);

            // 2. Choose one of the unvisited neighbours
            let chosenNode = randomizedNeighbor(neighbors);
            while (discovered[key(chosenNode)]) {
                chosenNode = randomizedNeighbor(neighbors);
            }

            // 3. Remove the wall between the current node and the chosen node
            const wall = removeWall(graph, currentNode, chosenNode);
            if (wall) {
                if (!(wall.start || wall.end)) {
                    walls.push(wall);
                    if (!walls.includes(chosenNode)) {
                        walls.push(chosenNode);
                    }
                }
            }

            // 4. Mark the chosen cell as visited and push it to the stack
            discovered[key(chosenNode)] = true;
            stack.push(chosenNode);
        }
    }

    let grid = [];

    for (var i = 1; i < graph.length - 1; i++) {
        for (var j = 1; j < graph[0].length - 1; j++) {
            grid.push(graph[i][j]);
        }
    }
    for (const node of walls) {
        grid = removeNodeFrom(grid, node);
    }

    var t1 = performance.now();

    return {
        walls: grid,
        time: round(t1 - t0),
    };
}

export const removeWall = (graph, currentNode = new Node(), chosenNode = new Node()) => {
    const x = currentNode.position.col - chosenNode.position.col;
    const y = currentNode.position.row - chosenNode.position.row;
    const left = x === 2, right = x === -2, top = y === 2, bottom = y === -2;
    let node = null;
    try {
        if (left) {
            node = graph[currentNode.position.row][currentNode.position.col - 1];
        }
        if (right) {
            node = graph[currentNode.position.row][currentNode.position.col + 1];
        }
        if (top) {
            node = graph[currentNode.position.row - 1][currentNode.position.col];
        }
        if (bottom) {
            node = graph[currentNode.position.row + 1][currentNode.position.col];
        }
    }
    catch {
        node = null;
    }
    return node;
}