import { 
    round, 
    findNeighbors, 
    key, 
    calculateCost, 
    reconstructFinalPathFromMap 
} from "../Helper/AlgorithmHelper";

import MinHeap from "../../objects/MinHeap";

export const visualizeGBFS = props => {
    var t0 = performance.now();

    const graph = props.grid, startNode = props.startNode, endNode = props.endNode;
    if (!startNode || !endNode) {
        return null;
    }

    const Q = new MinHeap(), visited = [], discovered = new Map(), prev = new Map();

    // for (var i = 0; i < graph.length; i++) {
    //     for (var j = 0; j < graph[0].length; j++) {
    //         const v = graph[i][j];
    //         if (v !== startNode) {
    //             Q.addWithPriority(v, calculateCost(startNode, v));
    //         }    
    //     }
    // }

    Q.addWithPriority(startNode, calculateCost(startNode, endNode));

    while (!Q.isEmpty()) {
        const c = Q.extractMin();
        visited.push(c);

        if (c === endNode) {
            var t1 = performance.now();
            const path = reconstructFinalPathFromMap(prev, startNode, endNode);

            return {
                visited: visited,
                path: path,
                steps: visited.length,
                time: round(t1 - t0),
            }
        }
        else {
            const neighbors = findNeighbors(graph, c);

            for (const n of neighbors) {
                if (!n.wall) {
                    if (!discovered[key(n)]) {
                        discovered[key(n)] = true;
                        prev[key(n)] = c;
                        Q.addWithPriority(n, calculateCost(n, endNode));
                    }
                }
            }
        }
    }

    var t2 = performance.now();

    return {
        visited: visited,
        path: [],
        steps: 0,
        time: round(t2 - t0),
    }
}